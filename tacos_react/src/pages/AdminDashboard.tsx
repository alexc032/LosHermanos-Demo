import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPedidos, toggleEstadoPedido, deletePedido, Pedido } from '../services/pedidoService';
import { logout } from '../services/authService';

// ─── Componente: solo HTML y lógica de estado ──────────────────────────────
const AdminDashboard: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPedidos();
  }, []);

  // READ
  const fetchPedidos = async (): Promise<void> => {
    try {
      const data = await getPedidos();
      setPedidos(data);
    } catch (err: any) {
      // Si el token es inválido/expirado, Django devuelve 401 → ir al login
      if (err.response?.status === 401 || err.response?.status === 403) {
        logout();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  // UPDATE
  const handleToggleEstado = async (id: number, estadoActual: string): Promise<void> => {
    try {
      const nuevoEstado = await toggleEstadoPedido(id, estadoActual);
      setPedidos(pedidos.map(p => p.id === id ? { ...p, estado: nuevoEstado } : p));
    } catch {
      alert('Error al actualizar el estado');
    }
  };

  // DELETE
  const handleDelete = async (id: number): Promise<void> => {
    if (!window.confirm('¿Seguro que deseas eliminar esta cotización?')) return;
    try {
      await deletePedido(id);
      setPedidos(pedidos.filter(p => p.id !== id));
    } catch {
      alert('Error al eliminar la cotización');
    }
  };

  // LOGOUT
  const handleLogout = (): void => {
    logout();
    navigate('/login');
  };

  // ─── Render ──────────────────────────────────────────────────────────────
  if (loading) return <div style={{ color: 'white', padding: '50px', textAlign: 'center' }}>Cargando cotizaciones...</div>;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', padding: '2rem', color: 'var(--color-text)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid #444', paddingBottom: '1rem' }}>
          <h2> Panel de Cotizaciones</h2>
          <button onClick={handleLogout} className="btn" style={{ background: '#e74c3c', color: 'white' }}>Cerrar Sesión</button>
        </div>

        <div style={{ background: '#1e1e1e', borderRadius: '10px', overflowX: 'auto', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
          {pedidos.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#888' }}>No hay cotizaciones nuevas por el momento.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#2a2a2a', textAlign: 'left' }}>
                  <th style={{ padding: '1rem', borderBottom: '1px solid #444' }}>Fecha</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid #444' }}>Cliente</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid #444' }}>Detalles / Mensaje</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid #444' }}>Estado</th>
                  <th style={{ padding: '1rem', borderBottom: '1px solid #444' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map(pedido => (
                  <tr key={pedido.id} style={{ borderBottom: '1px solid #333' }}>
                    <td style={{ padding: '1rem', color: '#aaa', fontSize: '0.9rem' }}>
                      {new Date(pedido.fecha).toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <strong>{pedido.nombre_cliente}</strong><br/>
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}>{pedido.correo}</span>
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.9rem', maxWidth: '400px' }}>{pedido.descripcion}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '4px 8px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold',
                        background: pedido.estado === 'Contactado' ? 'rgba(46,204,113,0.2)' : 'rgba(243,156,18,0.2)',
                        color: pedido.estado === 'Contactado' ? '#2ecc71' : '#f39c12'
                      }}>
                        {pedido.estado || 'Pendiente'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button
                        onClick={() => handleToggleEstado(pedido.id, pedido.estado)}
                        style={{ marginRight: '10px', padding: '6px 10px', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                      >
                        {pedido.estado === 'Contactado' ? 'Marcar Pendiente' : 'Marcar Contactado'}
                      </button>
                      <button
                        onClick={() => handleDelete(pedido.id)}
                        style={{ padding: '6px 10px', background: 'transparent', color: '#e74c3c', border: '1px solid #e74c3c', borderRadius: '5px', cursor: 'pointer' }}
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
