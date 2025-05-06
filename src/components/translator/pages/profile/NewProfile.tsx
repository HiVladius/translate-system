import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";

import { NavBar } from "../../navbar/NavBar";
import { AvatarModal } from "../../modal/AvatarModal";
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

  const profileSchema = z.object({
    nombre: z.string().min(1, { message: "Nombre es requerido" }),
    apellido: z.string().min(1, { message: "Apellido es requerido" }),
    telefono: z.string()
      .refine((val) => val === "" || /^\d{9,10}$/.test(val), {
        message: "El teléfono debe tener 9-10 dígitos",
      }),
    email: z.string().email({ message: "Email inválido" }),
    direccion: z.string().min(1, { message: "Dirección es requerida" }),
    lenguaje: z.string().optional(),
    lenguajeNativo: z.string().min(1, {
      message: "Lenguaje nativo es requerido",
    }),
  });
  type ProfileFormData = z.infer<typeof profileSchema>;

  const [errors, setErrors] = useState<
    Partial<Record<keyof ProfileFormData, string>>
  >({});
  const [formSubmited, setFormSubmited] = useState(false);

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

  const validateForm = () => {
    try {
      profileSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ProfileFormData, string>> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof ProfileFormData;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const validateField = (name: keyof ProfileFormData, value: string) => {
    try {
      profileSchema.shape[name].parse(value);
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({
          ...prev,
          [name]: error.errors[0].message,
        }));
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (formSubmited) {
      validateField(name as keyof ProfileFormData, value);
    }
  };

  const handleEdit = () => {
    setFormSubmited(true);
    if (validateForm()) {
      localStorage.setItem("profileData", JSON.stringify(formData));

      if (avatarUrl) {
        localStorage.setItem("profileAvatar", avatarUrl);
      }
      navigate("/translators/profile");
    } else {
      const firstErrorField = document.querySelector(".error-message");
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth" });
      }
    }
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
            className="avatar-image"
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
            <label>
              Nombre: <span className="required">*</span>
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={errors.nombre ? "input-error" : ""}
            />
            {errors.nombre && (
              <div className="error-message">{errors.nombre}</div>
            )}
          </div>
          <div className="form-group">
          <label>Apellido: <span className="required">*</span></label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className={errors.apellido ? "input-error" : ""}
          />
          {errors.apellido && <div className="error-message">{errors.apellido}</div>}
        </div>
        <div className="form-group">
          <label>Teléfono:</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className={errors.telefono ? "input-error" : ""}
          />
          {errors.telefono && <div className="error-message">{errors.telefono}</div>}
        </div>
        <div className="form-group">
          <label>Email: <span className="required">*</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
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
          <label>Lenguaje Nativo: <span className="required">*</span></label>
          <input
            type="text"
            name="lenguajeNativo"
            value={formData.lenguajeNativo}
            onChange={handleChange}
            className={errors.lenguajeNativo ? "input-error" : ""}
          />
          {errors.lenguajeNativo && <div className="error-message">{errors.lenguajeNativo}</div>}
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
