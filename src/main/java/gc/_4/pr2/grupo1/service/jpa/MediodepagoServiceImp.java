package gc._4.pr2.grupo1.service.jpa;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gc._4.pr2.grupo1.entity.Mediodepago;
import gc._4.pr2.grupo1.repository.MediodepagoRepository;
import gc._4.pr2.grupo1.service.IMediodepagoService;


@Service
public class MediodepagoServiceImp implements IMediodepagoService {

	@Autowired
	private MediodepagoRepository repo;

	@Override
	public List<Mediodepago>mostrarTodos() {
		
		return repo.findAll();
	}

	@Override
	public Mediodepago mostrarPorId(Long id) {
	
		return repo.findById(id).orElse(null);
	}

	@Override
	public Mediodepago guardar(Mediodepago mediodepago) {
		
		return repo.save(mediodepago);
	}

	@Override
	public void eliminarPorId(Long id) {
		repo.deleteById(id);
		
	}

}
	