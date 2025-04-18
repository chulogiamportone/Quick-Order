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

import gc._4.pr2.grupo1.dto.ResponseDTO;
import gc._4.pr2.grupo1.entity.Mesa;
import gc._4.pr2.grupo1.service.IMesaService;


@RestController
public class MesaController {
	
	@Autowired
	private IMesaService service;
	
	@GetMapping("/Mesa")
	public ResponseDTO<List<Mesa>> mostrarTodasMesa(){
		return service.mostrarTodos().isEmpty()?new ResponseDTO<>(false,"Listado Vacio",service.mostrarTodos()):new ResponseDTO<>(true,"Listado",service.mostrarTodos());	
	}
	
	@GetMapping("/Mesa/{id}")
	public ResponseDTO<?> mostrarMesaPorId(@PathVariable("id") Long id){
		return service.existe(id)?new ResponseDTO<>(true,"Encontrado",service.mostrarPorId(id)):new ResponseDTO<>(false,"No Encontrado");
	}
	
	@PostMapping("/Mesa")
	public ResponseDTO<?> crearNuevaMesa(@RequestBody Mesa mesaDesdeElServicio){
		return service.existe(mesaDesdeElServicio.getId())?new ResponseDTO<>(false,"Este elemento ya existe"):new ResponseDTO<>(true,"Guardado",service.guardar(mesaDesdeElServicio));
	}
	
	@PutMapping("/Mesa")
	public ResponseDTO<?> actualizarNuevaMesa(@RequestBody Mesa mesaDesdeElServicio){
		return service.existe(mesaDesdeElServicio.getId())?new ResponseDTO<>(true,"Modificado",service.guardar(mesaDesdeElServicio)):new ResponseDTO<>(false,"Este elemento no existe, utilice el POST");
	}
	
	@DeleteMapping("/Mesa/{id}")
	public ResponseDTO<?> borrarMesa(@PathVariable("id") Long id){
		if(service.existe(id)) {
			service.eliminarPorId(id);
		}
		return service.existe(id)?new ResponseDTO<>(true,"Eliminado"):new ResponseDTO<>(false,"Este elemento no existe, No se puede eliminar");
	}
	

}