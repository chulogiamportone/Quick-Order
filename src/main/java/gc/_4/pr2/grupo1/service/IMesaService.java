package gc._4.pr2.grupo1.service;

import java.util.List;

import gc._4.pr2.grupo1.entity.Mesa;

public interface IMesaService {
	public List<Mesa>mostrarTodos();
	public Mesa mostrarPorId(Long id);
	public Mesa guardar(Mesa mesa);
	public void eliminarPorId(Long id);
	boolean existe(Long id); 

}
