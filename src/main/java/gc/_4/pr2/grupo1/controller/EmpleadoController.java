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

import gc._4.pr2.grupo1.entity.Empleado;
import gc._4.pr2.grupo1.service.IEmpleadoService;

@RestController
public class EmpleadoController {
	
	@Autowired
	private IEmpleadoService service;
	
	@GetMapping("/empleado")
	public List<Empleado> mostrarTodosEmpleados(){
		System.out.print("pase");

		return service.mostrarTodos();
	}
	
	@GetMapping("/empleado/{id}")
	public Empleado mostrarEmpleadoId(@PathVariable("id") Long id){
		return service.mostrarPorId(id);
	}
	
	@PostMapping("/empleado")
	Empleado crearNuevoEmpleado(@RequestBody Empleado empleadoServicio){

		return service.guardar(empleadoServicio);
	}
	
	@PutMapping("/empleado")
	Empleado actualizarEmpleado(@RequestBody Empleado empleadoServicio){
	
		return service.guardar(empleadoServicio);
	}
	
	@DeleteMapping("/empleado/{id}")
	void borrarEmpleado(@PathVariable("id") Long id){
		service.eliminarPorId(id);
	}

}
