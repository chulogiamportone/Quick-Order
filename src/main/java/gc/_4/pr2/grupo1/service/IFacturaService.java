package gc._4.pr2.grupo1.service;

import java.util.List;

import gc._4.pr2.grupo1.entity.Factura;

public interface IFacturaService {
	
	public List<Factura>mostrarTodos();
	public Factura mostrarPorId(Long id);
	public Factura guardar(Factura factura);
	public void eliminarPorId(Long id);
	public boolean existe(Long id);
}
