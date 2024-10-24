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

import gc._4.pr2.grupo1.entity.Productos;
import gc._4.pr2.grupo1.service.IProductosService;



@RestController
public class ProductosController {

	@Autowired
	private IProductosService service;
	
	@GetMapping("/productos")
	public List<Productos> mostrarTodosProductos(){
		return service.mostrarTodos();
	}
	
	
	@GetMapping("/productos/{id}")
	Productos mostrarProductoId(@PathVariable("id") Long id){
		return service.mostrarPorId(id);
	}
	
	
	@PostMapping("/productos")
	Productos crearNuevoProducto(@RequestBody Productos productosDesdeElServicio){
		return service.guardar(productosDesdeElServicio);
	}
	
	@PutMapping("/productos")
	Productos actualizarNuevoProducto(@RequestBody Productos productosDesdeElServicio){
		return service.guardar(productosDesdeElServicio);
	}

	@DeleteMapping("/productos/{id}")
	void borrarProducto(@PathVariable("id") Long id){
		service.eliminarPorId(id);
	}
	
	
}
