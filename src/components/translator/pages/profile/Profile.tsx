import { useEffect, useState } from 'react';
import { NavBar } from '../../navbar/NavBar';
import { FormData } from '../../../../interface/profile.interfaces';
import filmblack from "../../../../assets/film-black.png";
import { useNavigate } from 'react-router';

import "./styles/Profile1.css";
import { FinishProjects } from '../history/FinishProjects';

export const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<FormData | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    // Cargar datos del perfil desde localStorage
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
      setProfileData(JSON.parse(savedData));
    }

    // Cargar avatar desde localStorage
    const savedAvatar = localStorage.getItem('profileAvatar');
    if (savedAvatar) {
      setAvatarUrl(savedAvatar);
    }
  }, []);

  const handleEditProfile = () => {
    navigate('/translators/board');
  };

  if (!profileData) {
    return (
      <>
        <NavBar />
        <div className="profile-container">
          <h2>No hay datos de perfil disponibles</h2>
          <button 
            className="edit-button" 
            onClick={handleEditProfile}
            style={{ marginTop: '20px' }}
          >
            Crear Perfil
          </button>
        </div>
      </>
    );

  }

  const projectTest = [
    {
      name: "Proyecto  de prueba para la prueba de la tabla",
      dateAdded: "2023-10-01",
      project: "HBO",
      dateStarted: "2023-10-01",
      dateEnded: "2023-10-05",
      status: "Finalizado",
    },
    {
      name: "Disorder",
      dateAdded: "2023-10-02",
      project: "Netflix",
      dateStarted: "2023-10-02",
      dateEnded: "2023-10-06",
      status: "Reasignado",
    },
    {
      name: "Prieta de la selva",
      dateAdded: "2024-10-03",
      project: "Disney",
      dateStarted: "2023-10-03",
      dateEnded: "2023-10-07",
      status: "Pausado",
    },
  ]


  return (
    <>
      <NavBar />
      <div className="profile-container">
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Resumen del Perfil</h2>
        
        <div className="avatar-container" style={{ marginBottom: '30px' }}>
          <img 
            src={avatarUrl || filmblack} 
            alt="Avatar del usuario"
            style={{ 
              maxWidth: '100%', 
              maxHeight: '100%', 
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              borderRadius: '50%' 
            }}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <div className="info-group">
            <h3 style={{ borderBottom: '1px solid #444', paddingBottom: '5px', marginBottom: '20px' }}>
              Información Personal
            </h3>
            <div className="info-item">
              <span className="info-label">Nombre:</span>
              <span className="info-value">{profileData.nombre} {profileData.apellido}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Teléfono:</span>
              <span className="info-value">{profileData.telefono}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{profileData.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Dirección:</span>
              <span className="info-value">{profileData.direccion}</span>
            </div>
          </div>

          <div className="info-group" style={{ marginTop: '20px' }}>
            <h3 style={{ borderBottom: '1px solid #444', paddingBottom: '5px', marginBottom: '20px' }}>
              Información Lingüística
            </h3>
            <div className="info-item">
              <span className="info-label">Lenguaje Nativo:</span>
              <span className="info-value">{profileData.lenguajeNativo}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Lenguajes:</span>
              <span className="info-value">{profileData.lenguaje}</span>
            </div>
          </div>
        </div>

        <FinishProjects projects={projectTest} title="Historial" />

        <div className="button-group">
          <button type="button" onClick={handleEditProfile} className="edit-button">
            Editar Perfil
          </button>
        </div>
      </div>
    </>
  );
}

