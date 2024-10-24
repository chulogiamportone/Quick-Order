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

import gc._4.pr2.grupo1.entity.Mesa;
import gc._4.pr2.grupo1.service.IMesaService;


@RestController
public class MesaController {
	
	@Autowired
	private IMesaService service;
	
	@GetMapping("/Mesa")
	public List<Mesa> mostrarTodasMesa(){
		
		return service.mostrarTodos();
	}
	
	@GetMapping("/Mesa/{id}")
	Mesa mostrarMesaPorId(@PathVariable("id") Long id){
		
		return service.mostrarPorId(id);
	}
	
	@PostMapping("/Mesa")
	Mesa crearNuevaMesa(@RequestBody Mesa mesaDesdeElServicio){
		
		return service.guardar(mesaDesdeElServicio);
	}
	
	@PutMapping("/Mesa")
	Mesa actualizarNuevaMesa(@RequestBody Mesa mesaDesdeElServicio){
		
		return service.guardar(mesaDesdeElServicio);
	}
	
	@DeleteMapping("/Mesa/{id}")
	void borrarMesa(@PathVariable("id") Long id){
		service.eliminarPorId(id);
	}
	

}