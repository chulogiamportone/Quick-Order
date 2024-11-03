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
import gc._4.pr2.grupo1.entity.Pedidos;
import gc._4.pr2.grupo1.service.IPedidosService;



@RestController
public class PedidosController {
	@Autowired
	private IPedidosService service;
	
	@GetMapping("/pedidos")
	public ResponseDTO<List<Pedidos>> mostrarTodosPedidos(){
		return service.mostrarTodos().isEmpty()?new ResponseDTO<>(false,"Listado Vacio",service.mostrarTodos()):new ResponseDTO<>(true,"Listado",service.mostrarTodos());	
	}
	
	@GetMapping("/pedidos/{id}")
	public ResponseDTO<?> mostrarPedidosId(@PathVariable("id") Long id){
		return service.existe(id)?new ResponseDTO<>(true,"Encontrado",service.mostrarPorId(id)):new ResponseDTO<>(false,"No Encontrado");
	}
	
	@PostMapping("/pedidos")
	public ResponseDTO<?> crearNuevoPedidos(@RequestBody Pedidos pedidosDesdeElServicio){
		return service.existe(pedidosDesdeElServicio.getId())?new ResponseDTO<>(false,"Este elemento ya existe"):new ResponseDTO<>(true,"Guardado",service.guardar(pedidosDesdeElServicio));
	}
	
	@PutMapping("/pedidos")
	public ResponseDTO<?> actualizarNuevoPedidos(@RequestBody Pedidos pedidosDesdeElServicio){
		return service.existe(pedidosDesdeElServicio.getId())?new ResponseDTO<>(true,"Modificado",service.guardar(pedidosDesdeElServicio)):new ResponseDTO<>(false,"Este elemento no existe, utilice el POST");
	}
	
	@DeleteMapping("/pedidos/{id}")
	public ResponseDTO<?> borrarPedidos(@PathVariable("id") Long id){
		if(service.existe(id)) {
			service.eliminarPorId(id);
		}
		return service.existe(id)?new ResponseDTO<>(true,"Eliminado"):new ResponseDTO<>(false,"Este elemento no existe, No se puede eliminar");
	}
}
