package gc._4.pr2.grupo1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import gc._4.pr2.grupo1.entity.Mediodepago;
import gc._4.pr2.grupo1.service.IMediodepagoService;



@RestController
public class MediodepagoController {
	@Autowired
	private IMediodepagoService service;
	
	@GetMapping("/mediodepago")
	public List<Mediodepago> mostrarTodosMediodepago(){
		
		return service.mostrarTodos();
	}
	
	@GetMapping("/mediodepago/{id}")
	Mediodepago mostrarMediodepagoId(@PathVariable("id") Long id){
		
		return service.mostrarPorId(id);
	}
	
	@PostMapping("/mediodepago")
	Mediodepago crearNuevoMediodepago(@RequestBody Mediodepago MediodepagoDesdeElServicio){
		
		Mediodepago mediodepagoDesdeElServicio = null;
		return service.guardar(mediodepagoDesdeElServicio);
	}
	
	@PutMapping("/mediodepago")
	Mediodepago actualizarNuevoMediodepago(@RequestBody Mediodepago MediodepagoDesdeElServicio){
		
		return service.guardar(MediodepagoDesdeElServicio);
	}
	
	@DeleteMapping("/mediodepago/{id}")
	void borrarMediodepago(@PathVariable("id") Long id){
		service.eliminarPorId(id);
	}
}
