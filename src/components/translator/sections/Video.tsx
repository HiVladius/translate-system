import { useEffect, useRef, useState } from "react";
import "./styles/Video.css";
import { FaPause, FaPlay, FaStop } from "react-icons/fa";
import { VideoPlayerProps } from "../../interface/interfaces";

export const Video: React.FC<VideoPlayerProps> = ({ src, width, height }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrubberRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setisDragging] = useState(false);

  //Funcion para saltar en el video (adelante o atras)

  const skypTime = (seconds: number) => {
    if (videoRef.current) {
      const newTime = Math.max(
        0,
        Math.min(duration, videoRef.current.currentTime + seconds),
      );
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Solo responder a las teclas si el elemento tiene foco o el evento está en el documento
    if (
      e.target === document.body || e.target === containerRef.current ||
      containerRef.current?.contains(e.target as Node)
    ) {
      if (e.key === "ArrowRight") {
        e.preventDefault(); // Prevenir el desplazamiento de la página
        skypTime(1); // Avanzar 1 segundo
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        skypTime(-1); // Retroceder 1 segundo
      } else if (e.key === " ") {
        // Espacio para reproducir/pausar
        e.preventDefault();
        handlePlayPause();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [duration]);

  //funciones de control
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused || videoRef.current.ended) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          setError(null);
        }).catch((e) => {
          console.log("Error al reproducir el video", e);
          setError("Error al reproducir el video");
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handlePauseEvent = () => {
    if (videoRef.current && videoRef.current.currentTime !== 0) {
      setIsPlaying(false);
    }
  };

  const handlePlayEvent = () => {
    setIsPlaying(true);
    setError(null);
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error("Error en elemento video:", e);
    setError(
      "Error al cargar el archivo de video. Verifica la ruta o el formato.",
    );
    setIsPlaying(false);
  };

  //Funcion para formatear el tiempo en formato mm:ss

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const miliseconds = Math.floor((timeInSeconds % 1) * 1000);
    return `${String(minutes).padStart(2, "0")}:${
      String(seconds).padStart(2, "0")
    }:${String(miliseconds).padStart(2, "0")}`;
  };

  //Actualizar tiempo y duracion
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadeMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  //Funciones para manejar el arrastre del scruber
  const handleScrubberMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setisDragging(true);

    //Pausar el video mientras se arrastra el scruber
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
    }
  };

  //Manejo de clicks en la barra de progreso
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressBarRef.current) return;

    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * duration;

    // Actualizar la posición del video
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && progressBarRef.current && videoRef.current) {
        const react = progressBarRef.current.getBoundingClientRect();
        let position = (e.clientX - react.left) / react.width;

        position = Math.max(0, Math.min(1, position));
        const newTime = position * duration;

        setCurrentTime(newTime);
      }
    };

    const handleMouseUp = () => { // Corregido: hadleMouseUp -> handleMouseUp
      if (isDragging && videoRef.current) {
        videoRef.current.currentTime = currentTime;

        if (isPlaying) {
          videoRef.current.play();
        }
        setisDragging(false);
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp); // Corregido: hadleMouseUp -> handleMouseUp
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp); // Corregido: hadleMouseUp -> handleMouseUp
    };
  }, [isDragging, currentTime, duration, isPlaying]);

  return (
    <div
      ref={containerRef}
      className="video-container"
      tabIndex={0}
    >
      <video
        ref={videoRef}
        src={src}
        width={width}
        height={height}
        onEnded={handleEnded}
        onPause={handlePauseEvent}
        onPlay={handlePlayEvent}
        onError={handleError}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadeMetadata}
      />
      {/*Barra de progreso*/}
      <div className="video-progress">
        <div
          className="progress-bar-container"
          ref={progressBarRef}
          onClick={handleProgressBarClick}
        >
          <div
            className="progress-bar"
            style={{
              width: `${(currentTime / duration) * 100}%`,
            }}
          />
          <div
            className="scrubber"
            ref={scrubberRef}
            onMouseDown={handleScrubberMouseDown}
            style={{
              left: `calc(${(currentTime / duration) * 100}% - 8px)`,
            }} // Corregido: eliminado el espacio entre 100 y %
          >
          </div>
        </div>

        {/* Movido fuera del contenedor de la barra de progreso */}
        <div className="time-display">
          <span>{formatTime(currentTime)}</span>

          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="video-controls">
        <button onClick={handlePlayPause} disabled={!!error}>
          {isPlaying ? <FaPause /> : <FaPlay />}{" "}
          {/* Cambia el texto del botón */}
        </button>
        <button onClick={handleStop} disabled={!!error}>
          <FaStop />
        </button>
        {/* Aquí podrías agregar más controles (volumen, progreso, pantalla completa) */}
      </div>
    </div>
  );
};
