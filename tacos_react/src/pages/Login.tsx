import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import '../index.css';

// ─── Componente: solo HTML y lógica de estado ──────────────────────────────
const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(username, password);
      navigate('/admin');
    } catch {
      setError('Usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--color-bg)' }}>
      <div style={{ background: '#2d2d2d', padding: '3rem', borderRadius: '15px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '3rem' }}>🌮</span>
          <h2 style={{ color: 'var(--color-text)', marginTop: '1rem' }}>Admin Login</h2>
        </div>

        <form onSubmit={handleLogin}>
          {error && <div style={{ color: '#e74c3c', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <input
              type="text"
              id="username"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #444', background: '#1a1a1a', color: '#fff' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <input
              type="password"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #444', background: '#1a1a1a', color: '#fff' }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            disabled={loading}
          >
            {loading ? 'Iniciando...' : 'Entrar al Panel'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a href="/" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>&larr; Volver al inicio</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
