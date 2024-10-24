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

import gc._4.pr2.grupo1.entity.Pedidos;
import gc._4.pr2.grupo1.service.IPedidosService;



@RestController
public class PedidosController {
	@Autowired
	private IPedidosService service;
	
	@GetMapping("/pedidos")
	public List<Pedidos> mostrarTodosPedidos(){
		
		return service.mostrarTodos();
	}
	
	@GetMapping("/pedidos/{id}")
	Pedidos mostrarPedidosId(@PathVariable("id") Long id){
		
		return service.mostrarPorId(id);
	}
	
	@PostMapping("/pedidos")
	Pedidos crearNuevoPedidos(@RequestBody Pedidos pedidosDesdeElServicio){
		
		return service.guardar(pedidosDesdeElServicio);
	}
	
	@PutMapping("/pedidos")
	Pedidos actualizarNuevoPedidos(@RequestBody Pedidos pedidosDesdeElServicio){
		
		return service.guardar(pedidosDesdeElServicio);
	}
	
	@DeleteMapping("/pedidos/{id}")
	void borrarPedidos(@PathVariable("id") Long id){
		service.eliminarPorId(id);
	}
}
