import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../assets/icons/home.svg';
import { ReactComponent as MenuIcon } from '../assets/icons/menu.svg';
import './Navbar.css';

export default function Navbar({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/home">
          <HomeIcon className="icon" />
        </Link>
      </div>

      <div className="navbar-center">
        <h2 className="company-name">CAMED</h2>
        <p>
          Controle de Aplicação de Medicamentos
        </p>
      </div>

      <div className="navbar-right" ref={menuRef}>
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <MenuIcon className="icon" />
        </button>

        {menuOpen && (
          <div className="dropdown-menu show">
            <Link to="/clientes">Cliente</Link>
            <Link to="/medicamentos">Medicamento</Link>           
            <Link to="/aplicacoes">Aplicação</Link>
            <button onClick={handleLogout}>Sair</button>
          </div>
        )}
      </div>
    </nav>
  );
}