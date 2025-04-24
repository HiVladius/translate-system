import { useEffect, useState } from "react";
import { NavBar } from "../../navbar/NavBar";
import { AvatarModal } from "../../modal/AvatarModal";
import { useNavigate } from "react-router";

import "./styles/Profile1.css";
import filmblack from "../../../../assets/film-black.png";
import { FormData } from "../../../../interface/profile.interfaces";

export const NewProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    direccion: "",
    lenguaje: "",
    lenguajeNativo: "",
  });

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Cargar datos guardados al iniciar el componente
  useEffect(() => {
    // Verificar si existen datos guardados en localStorage
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

    // Verificar si existe un avatar guardado
    const savedAvatar = localStorage.getItem("profileAvatar");
    if (savedAvatar) {
      setAvatarUrl(savedAvatar);
    }
  }, []);

  // Limpiar objectURL cuando se desmonte el componente
  useEffect(() => {
    return () => {
      if (avatarUrl && !avatarUrl.startsWith("blob:")) {
        URL.revokeObjectURL(avatarUrl);
      }
    };
  }, [avatarUrl]);

  const handleAvatarSave = (file: File) => {
    // Revocar la URL anterior si existe
    if (avatarUrl && !avatarUrl.startsWith("blob:")) {
      URL.revokeObjectURL(avatarUrl);
    }
    const objectUrl = URL.createObjectURL(file);
    setAvatarUrl(objectUrl);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    localStorage.setItem("profileData", JSON.stringify(formData));

    if (avatarUrl) {
      localStorage.setItem("profileAvatar", avatarUrl);
    }
    navigate("/translators/profile");
  };

  const handleCancel = () => {
    // Recuperar datos originales desde localStorage o limpiar si no existen
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    } else {
      setFormData({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        direccion: "",
        lenguaje: "",
        lenguajeNativo: "",
      });
    }

    // Recuperar avatar original
    const savedAvatar = localStorage.getItem("profileAvatar");
    setAvatarUrl(savedAvatar);

    navigate("/translators/profile");
  };

  const lenguajes = [
    { value: "español", label: "Español" },
    { value: "ingles", label: "Ingles" },
    { value: "frances", label: "Frances" },
    { value: "portugues", label: "Portugues" },
    { value: "italiano", label: "Italiano" },
    { value: "aleman", label: "Aleman" },
    { value: "chino", label: "Chino" },
    { value: "japones", label: "Japones" },
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e);

    const selectedLanguage = e.target.value;
    if (!selectedLanguage) {
      return;
    }

    // Check if the selected language is already in the list
    const currentLanguages = formData.lenguaje.split(", ").filter((lang) =>
      lang !== ""
    );
    if (currentLanguages.includes(selectedLanguage)) {
      alert(`${selectedLanguage} ya está en tu lista de lenguajes`);
      e.target.value = ""; // Reset select element
      return; // Exit function early
    }

    // Only update if the language is not already in the list
    setFormData((prevData) => ({
      ...prevData,
      lenguaje: prevData.lenguaje
        ? `${prevData.lenguaje}, ${selectedLanguage}`
        : selectedLanguage,
    }));
    e.target.value = "";
  };

  return (
    <>
      <NavBar />
      <div className="profile-container">
        <button
          className="avatar-container"
          onClick={() => setIsAvatarModalOpen(true)}
        >
          <img
            src={avatarUrl || filmblack}
            alt="avatarDefault"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
            }}
          />
        </button>

        <AvatarModal
          isOpen={isAvatarModalOpen}
          onClose={() => setIsAvatarModalOpen(false)}
          onSave={handleAvatarSave}
          currentAvatarUrl={avatarUrl || undefined}
        />

        <form>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Apellido:</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Teléfono:</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Dirección:</label>
            <textarea
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Lenguaje Nativo:</label>
            <input
              type="text"
              name="lenguajeNativo"
              value={formData.lenguajeNativo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Lenguajes:</label>
            <select
              name="lenguajes"
              onChange={handleLanguageChange}
            >
              <option value="">Seleccionar lenguaje</option>
              {lenguajes.map((language) => (
                <option key={language.value} value={language.value}>
                  {language.label}
                </option>
              ))}
            </select>

            <textarea
              name="lenguaje"
              value={formData.lenguaje}
              onChange={handleChange}
              placeholder="Lenguajes seleccionados aparecerán aquí"
              rows={3}
            />
          </div>

          <div className="button-group">
            <button type="button" onClick={handleEdit} className="edit-button">
              Guardar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
