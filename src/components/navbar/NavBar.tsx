import { useEffect, useRef, useState } from "react";
import "./NavBar.css";

export const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = () => {
    if (showMenu) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="google-navbar">
      <div className="nav-items">
        <button
          className="apps-button"
          onClick={handleMenuToggle}
          aria-label="Aplicaciones de Google"
        >
          <svg className="apps-icon" viewBox="0 0 24 24">
            <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z" />
          </svg>
        </button>

        <div className="avatar">V</div>

        {showMenu && (
          <div className="apps-menu" ref={menuRef}>
            <div className="menu-grid">
              <a href="/perfil" className="menu-item">
                <span className="icon">🧑‍💻</span>
                <span>Perfil</span>
              </a>
              <a href="/queue" className="menu-item">
                <span className="icon">🗺️</span>
                <span>Job Queue</span>
              </a>
              <a href="/jobs" className="menu-item">
                <span className="icon">📅</span>
                <span>Save Jobs</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
