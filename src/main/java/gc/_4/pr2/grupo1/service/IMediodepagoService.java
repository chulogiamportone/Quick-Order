package gc._4.pr2.grupo1.service;

import java.util.List;

import gc._4.pr2.grupo1.entity.Mediodepago;

public interface IMediodepagoService {
	
	public List<Mediodepago>mostrarTodos();
	public Mediodepago mostrarPorId(Long id);
	public Mediodepago guardar(Mediodepago mediodepago);
	public void eliminarPorId(Long id);
	boolean existe(Long id);
}
