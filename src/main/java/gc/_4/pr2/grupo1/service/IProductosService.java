package gc._4.pr2.grupo1.service;

import java.util.List;
import gc._4.pr2.grupo1.entity.Productos;

public interface IProductosService {
	
	public List<Productos>mostrarTodos();
	public Productos mostrarPorId(Long id);
	public Productos guardar(Productos productos);
	public void eliminarPorId(Long id);

}
