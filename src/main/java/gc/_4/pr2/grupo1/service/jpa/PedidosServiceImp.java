package gc._4.pr2.grupo1.service.jpa;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gc._4.pr2.grupo1.entity.Pedidos;
import gc._4.pr2.grupo1.repository.PedidosRepository;
import gc._4.pr2.grupo1.service.IPedidosService;


@Service
public class PedidosServiceImp implements IPedidosService {

	@Autowired
	private PedidosRepository repo;

	@Override
	public List<Pedidos>mostrarTodos() {
		
		return repo.findAll();
	}

	@Override
	public Pedidos mostrarPorId(Long id) {
	
		return repo.findById(id).orElse(null);
	}

	@Override
	public Pedidos guardar(Pedidos pedidos) {
		
		return repo.save(pedidos);
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
