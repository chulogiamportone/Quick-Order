package gc._4.pr2.grupo1.service.jpa;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import gc._4.pr2.grupo1.entity.Productos;
import gc._4.pr2.grupo1.repository.ProductosRepository;
import gc._4.pr2.grupo1.service.IProductosService;

@Service
public class ProductosServiceImp implements IProductosService{
	
	@Autowired
	private ProductosRepository repo;
	
	@Override
	public List<Productos>mostrarTodos() {
		return repo.findAll();
	}
	
	@Override
	public Productos mostrarPorId(Long id) {
		return repo.findById(null).orElse(null);
	}
	
	@Override
	public Productos guardar(Productos productos) {

		return repo.save(productos);
	}

	@Override
	public void eliminarPorId(Long id) {
		repo.deleteById(id);
	}
	
	@Override
	public boolean existe(Long id) {
		if(id == null) {
			return false;
		}else {
			return repo.existsById(id);
		}
	}

}
