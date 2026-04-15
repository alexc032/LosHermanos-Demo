import api from './api';

export interface Pedido {
  id: number;
  nombre_cliente: string;
  correo: string;
  descripcion: string;
  estado: string;
  fecha: string;
}

export interface NuevoPedido {
  nombre_cliente: string;
  correo: string;
  descripcion: string;
}

const BASE = '/clientes/api/v1/pedidos/';

export const getPedidos = async (): Promise<Pedido[]> => {
  const res = await api.get<Pedido[]>(BASE);
  return res.data;
};

export const createPedido = async (payload: NuevoPedido): Promise<void> => {
  await api.post(BASE, payload);
};

export const toggleEstadoPedido = async (id: number, estadoActual: string): Promise<string> => {
  const nuevoEstado = estadoActual === 'Pendiente' ? 'Contactado' : 'Pendiente';
  await api.patch(`${BASE}${id}/`, { estado: nuevoEstado });
  return nuevoEstado;
};

export const deletePedido = async (id: number): Promise<void> => {
  await api.delete(`${BASE}${id}/`);
};
