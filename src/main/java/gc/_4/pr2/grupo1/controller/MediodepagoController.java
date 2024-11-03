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
import gc._4.pr2.grupo1.entity.Mediodepago;
import gc._4.pr2.grupo1.service.IMediodepagoService;



@RestController
public class MediodepagoController {
	@Autowired
	private IMediodepagoService service;
	
	@GetMapping("/mediodepago")
	public ResponseDTO<List<Mediodepago>> mostrarTodosMediodepago(){
		return service.mostrarTodos().isEmpty()?new ResponseDTO<>(false,"Listado Vacio",service.mostrarTodos()):new ResponseDTO<>(true,"Listado",service.mostrarTodos());	
	}
	
	@GetMapping("/mediodepago/{id}")
	public ResponseDTO<?> mostrarMediodepagoId(@PathVariable("id") Long id){
		return service.existe(id)?new ResponseDTO<>(true,"Encontrado",service.mostrarPorId(id)):new ResponseDTO<>(false,"No Encontrado");
	}
	
	@PostMapping("/mediodepago")
	public ResponseDTO<?> crearNuevoMediodepago(@RequestBody Mediodepago MediodepagoDesdeElServicio){
		return service.existe(MediodepagoDesdeElServicio.getId())?new ResponseDTO<>(false,"Este elemento ya existe"):new ResponseDTO<>(true,"Guardado",service.guardar(MediodepagoDesdeElServicio));
	}
	
	@PutMapping("/mediodepago")
	public ResponseDTO<?> actualizarNuevoMediodepago(@RequestBody Mediodepago MediodepagoDesdeElServicio){
		return service.existe(MediodepagoDesdeElServicio.getId())?new ResponseDTO<>(true,"Modificado",service.guardar(MediodepagoDesdeElServicio)):new ResponseDTO<>(false,"Este elemento no existe, utilice el POST");
	}
	
	@DeleteMapping("/mediodepago/{id}")
	public ResponseDTO<?> borrarMediodepago(@PathVariable("id") Long id){
		if(service.existe(id)) {
			service.eliminarPorId(id);
		}
		return service.existe(id)?new ResponseDTO<>(true,"Eliminado"):new ResponseDTO<>(false,"Este elemento no existe, No se puede eliminar");
	}
}
