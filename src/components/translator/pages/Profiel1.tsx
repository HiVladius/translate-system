import { useState } from "react";
import { NavBar } from "../navbar/NavBar";


import "./styles/Profile1.css";
import filmblack from "../../../assets/film-black.png";

interface FormData {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  direccion: string;
  lenguaje: string;
  lenguajeNativo: string;
}

export const Profiel1 = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    direccion: "",
    lenguaje: "",
    lenguajeNativo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    console.log(formData);
  };

  const handleCancel = () => {
    setFormData({
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      direccion: "",
      lenguaje: "",
      lenguajeNativo: "",
    });
  };

  return (
    <>
      <NavBar />
      <div className="profile-container">
        <div
          className="avatar-container"
          onClick={() => alert("Agregar/Editar Avatar")}
        >
          <img src={filmblack} alt="avatarDefault" />
        </div>
        
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
            <input
              type="text"
              name="lenguajes"
              value={formData.lenguaje}
              onChange={handleChange}
            />
          </div>
          <div className="button-group">
            <button type="button" onClick={handleEdit} className="edit-button">
              Edit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
