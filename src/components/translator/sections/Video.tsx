import { useRef } from "react";
import "./styles/Video.css";
import type { VideoProps } from "../../../interface/interfaces";

export const Video: React.FC<VideoProps> = (
  { src, width = "100%", height = "100%" },
) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  //Funcion para saltar en el video (adelante o atras

  const videoStyle: React.CSSProperties = {
    maxWidth: "100%",
    maxHeight: "100%",
    width: width,
    height: height,
    objectFit: "contain",
  };

  return (
    <div
      ref={containerRef}
      className="video-container"
      tabIndex={0}
    >
      <video
        ref={videoRef}
        style={videoStyle}
        controls
        src={src}
        width={width}
        height={height}
      />
    </div>
  );
};
