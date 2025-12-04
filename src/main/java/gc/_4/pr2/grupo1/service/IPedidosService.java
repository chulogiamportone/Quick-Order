package gc._4.pr2.grupo1.service;

import java.util.List;


import gc._4.pr2.grupo1.entity.Pedidos;

public interface IPedidosService {
	
	public List<Pedidos>mostrarTodos();
	public Pedidos mostrarPorId(Long id);
	public Pedidos guardar(Pedidos pedidos);
	public void eliminarPorId(Long id);
	boolean existe(Long id);
	Long obtenerProximoNumero();
    void actualizarEstado(Long pedidoId, String nuevoEstado);
	
}
