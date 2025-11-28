package gc._4.pr2.grupo1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import gc._4.pr2.grupo1.dto.ResponseDTO;
import gc._4.pr2.grupo1.entity.Empleado;
import gc._4.pr2.grupo1.service.IEmpleadoService;

@RestController
@CrossOrigin(origins = "*")
public class EmpleadoController {
	
	@Autowired
	private IEmpleadoService service;
	
	@GetMapping("/empleado")
	public ResponseDTO<List<Empleado>> mostrarTodosEmpleados(){
		return service.mostrarTodos().isEmpty()?new ResponseDTO<>(false,"Listado Vacio",service.mostrarTodos()):new ResponseDTO<>(true,"Listado",service.mostrarTodos());	
	}
	
	@GetMapping("/empleado/{id}")
	public ResponseDTO<?> mostrarEmpleadoId(@PathVariable("id") Long id){
		return service.existe(id)?new ResponseDTO<>(true,"Encontrado",service.mostrarPorId(id)):new ResponseDTO<>(false,"No Encontrado");
	}
	
	@PostMapping("/empleado")
	public ResponseDTO<?> crearNuevoEmpleado(@RequestBody Empleado empleadoServicio){
		return service.existe(empleadoServicio.getId())?new ResponseDTO<>(false,"Este elemento ya existe"):new ResponseDTO<>(true,"Guardado",service.guardar(empleadoServicio));
	}
	
	@PutMapping("/empleado")
	public ResponseDTO<?> actualizarEmpleado(@RequestBody Empleado empleadoServicio){
		return service.existe(empleadoServicio.getId())?new ResponseDTO<>(true,"Modificado",service.guardar(empleadoServicio)):new ResponseDTO<>(false,"Este elemento no existe, utilice el POST");
	}
	
	@DeleteMapping("/empleado/{id}")
	public ResponseDTO<?> borrarEmpleado(@PathVariable("id") Long id){
		if(service.existe(id)) {
			service.eliminarPorId(id);
		}
		return service.existe(id)?new ResponseDTO<>(true,"Eliminado"):new ResponseDTO<>(false,"Este elemento no existe, No se puede eliminar");
	}

}
