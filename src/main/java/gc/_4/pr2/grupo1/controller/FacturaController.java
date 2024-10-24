package gc._4.pr2.grupo1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
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
	
	
	@GetMapping("/pruebaok")
	public ResponseDTO<?> pruebaOk(){
		ResponseDTO<?> dto = new ResponseDTO<>();
		dto.setCode(200);
		dto.setMessage("La prueba salio OK");
		
		//ResponseEntity response;
		//response = new ResponseEntity("Prueba OK", HttpStatus.OK);
		//return response;
		
		return dto;
		
	}
	
	@GetMapping("/pruebanotfound")
	public ResponseDTO<?> pruebaNotFound(){
		ResponseDTO<?> dto = new ResponseDTO<>();
		dto.setCode(404);
		dto.setMessage("Mensaje de prueba para Not Found");
		
		/*
		ResponseEntity response;
		response = new ResponseEntity("Mensaje de prueba para Not Found", HttpStatus.NOT_FOUND);
		*/
		
		return dto;
		
	}	
	/*
	@GetMapping("/factura")
	public List<Factura> mostrarTodosFactura(){
		return service.mostrarTodos();
	}*/
	
	@GetMapping("/factura")
	public ResponseDTO<List<Factura>> mostrarTodosFactura(){
		ResponseDTO<List<Factura>> dto = new ResponseDTO<>();
		
		List<Factura> listaTodos;
		listaTodos = service.mostrarTodos();
		if(listaTodos.isEmpty()) {
			dto.setCode(400);
			dto.setMessage("Listado Vacio");
			dto.setData(listaTodos);
			//ResponseEntity response;
			//response = new ResponseEntity(null, HttpStatus.NO_CONTENT );
			//return response;			
		}else {
			dto.setCode(200);
			dto.setMessage("Listado");
			dto.setData(listaTodos);
			//ResponseEntity response;
			//response = new ResponseEntity(listaTodos, HttpStatus.OK );
			//return response;			
		}
		//return listaTodos;
		return dto;
			
		//return service.mostrarTodos();
	}
	
	/*
	@GetMapping("/factura/{id}")
	Factura mostrarFacturaId(@PathVariable("id") Long id){
		return service.mostrarPorId(id);
	}*/
	
	@GetMapping("/factura/{id}")
	ResponseDTO<?> mostrarFacturaId(@PathVariable("id") Long id){
		
		ResponseDTO<Factura> dto = new ResponseDTO<>();
		if(service.existe(id)) {
			dto.setCode(200);
			dto.setMessage("Encontrado");
			dto.setData(service.mostrarPorId(id));
			//return new ResponseEntity<Factura>(service.mostrarPorId(id), HttpStatus.OK );
		}else {
			dto.setCode(404);
			dto.setMessage("No Encontrado");
			//dto.setData(null);
			//return new ResponseEntity<String>("No encontrado", HttpStatus.NOT_FOUND);	
		}
		
		return dto;
	}
	
	/*
	@PostMapping("/factura")
	Factura crearNuevoFactura(@RequestBody Factura facturaDesdeElServicio){
		
		return service.guardar(facturaDesdeElServicio);
	}*/
	
	
	@PostMapping("/factura")
	ResponseDTO<?> crearNuevoFactura(@RequestBody Factura facturaDesdeElServicio){
		ResponseDTO<Factura> dto = new ResponseDTO<>();
		if(service.existe(facturaDesdeElServicio.getId())) {
			dto.setCode(400);
			dto.setMessage("Este elemento ya existe");
			//dto.setData(null);
			
			//ResponseEntity response;
			//response = new ResponseEntity("Este elemento ya existe", HttpStatus.BAD_REQUEST );
			
			
			return dto;			
			
		}else {
			dto.setCode(201);
			dto.setMessage("Guardado");
			dto.setData(service.guardar(facturaDesdeElServicio));
			
			//ResponseEntity response;
			//response = new ResponseEntity(service.guardar(facturaDesdeElServicio), HttpStatus.CREATED );
			
			return dto;		
		}
		
	}
	
	/*
	@PutMapping("/factura")
	Factura actualizarNuevoFactura(@RequestBody Factura facturaDesdeElServicio){
		
		return service.guardar(facturaDesdeElServicio);
	}*/
	
	
	@PutMapping("/factura")
	ResponseDTO<?> actualizarTipoNuevoPokemon(@RequestBody Factura facturaDesdeElServicio){
		ResponseDTO<Factura> dto = new ResponseDTO<>();
		if(service.existe(facturaDesdeElServicio.getId())) {
			dto.setCode(200);
			dto.setMessage("Modificado");
			dto.setData(service.guardar(facturaDesdeElServicio));
			
			//ResponseEntity response;
			//response = new ResponseEntity(service.guardar(facturaDesdeElServicio), HttpStatus.OK );
			return dto;
		}else {
			dto.setCode(400);
			dto.setMessage("Este elemento no existe, utilice el POST");
			//dto.setData(null);
			
			//ResponseEntity response;
			//response = new ResponseEntity("Este elemento no existe, utilice el POST", HttpStatus.BAD_REQUEST );
			return dto;
		}
		
	}
	
	
	/*@DeleteMapping("/factura/{id}")
	void borrarFactura(@PathVariable("id") Long id){
		service.eliminarPorId(id);
	}
	*/
	
	
	@DeleteMapping("/factura/{id}")
	ResponseDTO<?> borrarFactura(@PathVariable("id") Long id){
		ResponseDTO<Factura> dto = new ResponseDTO<>();
		if(service.existe(id)) {
			dto.setCode(200);
			dto.setMessage("Modificado");
			//dto.setData(null);
			service.eliminarPorId(id);
			
			//ResponseEntity response;
			//response = new ResponseEntity("Elemento eliminado", HttpStatus.OK );
			return dto;
		}else {
			dto.setCode(400);
			dto.setMessage("Este elemento no existe, No se puede eliminar");
			//dto.setData(null);
			
			//ResponseEntity response;
			//response = new ResponseEntity("Este elemento no existe, No se puede eliminar", HttpStatus.BAD_REQUEST );
			return dto;
		}
		
	}
	
	
	
	
	
	
}
