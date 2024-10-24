package gc._4.pr2.grupo1.service.jpa;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gc._4.pr2.grupo1.entity.Mesa;
import gc._4.pr2.grupo1.service.IMesaService;
import gc._4.pr2.grupo1.repository.MesaRepository;

@Service
public class MesaServiceImp implements IMesaService{
	@Autowired
	private MesaRepository repo;
	
	@Override
	public List<Mesa> mostrarTodos() {
		return repo.findAll();
	}

	@Override
	public Mesa mostrarPorId(Long id) {
		return repo.findById(id).orElse(null);
	}
	
	@Override
	public Mesa guardar(Mesa mesa) {
		return repo.save(mesa);
	}

	@Override
	public void eliminarPorId(Long id) {
		repo.deleteById(id);
	}

}

	
	


	
	