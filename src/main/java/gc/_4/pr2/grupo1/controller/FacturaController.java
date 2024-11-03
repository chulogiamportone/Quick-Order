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
import gc._4.pr2.grupo1.entity.Factura;
import gc._4.pr2.grupo1.service.IFacturaService;
import gc._4.pr2.grupo1.dto.ResponseDTO;

@RestController
public class FacturaController {
	@Autowired
	private IFacturaService service;
	
	@GetMapping("/factura")
	public ResponseDTO<List<Factura>> mostrarTodosFactura(){
		return service.mostrarTodos().isEmpty()?new ResponseDTO<>(false,"Listado Vacio",service.mostrarTodos()):new ResponseDTO<>(true,"Listado",service.mostrarTodos());	
	}
	
	@GetMapping("/factura/{id}")
	public ResponseDTO<?> mostrarFacturaId(@PathVariable("id") Long id){
		return service.existe(id)?new ResponseDTO<>(true,"Encontrado",service.mostrarPorId(id)):new ResponseDTO<>(false,"No Encontrado");
	}
	
	@PostMapping("/factura")
	public ResponseDTO<?> crearNuevoFactura(@RequestBody Factura facturaDesdeElServicio){
		return service.existe(facturaDesdeElServicio.getId())?new ResponseDTO<>(false,"Este elemento ya existe"):new ResponseDTO<>(true,"Guardado",service.guardar(facturaDesdeElServicio));
	}
	
	@PutMapping("/factura")
	public ResponseDTO<?> actualizarFactura(@RequestBody Factura facturaDesdeElServicio){
		return service.existe(facturaDesdeElServicio.getId())?new ResponseDTO<>(true,"Modificado",service.guardar(facturaDesdeElServicio)):new ResponseDTO<>(false,"Este elemento no existe, utilice el POST");
	}
	
	@DeleteMapping("/factura/{id}")
	public ResponseDTO<?> borrarFactura(@PathVariable("id") Long id){
		if(service.existe(id)) {
			service.eliminarPorId(id);
		}
		return service.existe(id)?new ResponseDTO<>(true,"Eliminado"):new ResponseDTO<>(false,"Este elemento no existe, No se puede eliminar");
	}
	
}