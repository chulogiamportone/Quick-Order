package gc._4.pr2.grupo1.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import gc._4.pr2.grupo1.dto.PedidoRequestDTO;
import gc._4.pr2.grupo1.dto.ResponseDTO;
import gc._4.pr2.grupo1.entity.Empleado;
import gc._4.pr2.grupo1.entity.Pedidos;
import gc._4.pr2.grupo1.entity.Productos;
import gc._4.pr2.grupo1.service.IPedidosService;

@RestController
@CrossOrigin(origins = "http://localhost:5500")
public class PedidosController {
	@Autowired
	private IPedidosService service;

	@Autowired
	private gc._4.pr2.grupo1.service.IEmpleadoService empleadoService;

	@Autowired
	private gc._4.pr2.grupo1.service.IProductosService productosService;

	@GetMapping("/pedidos/proximo-numero")
	public ResponseDTO<Long> obtenerProximoNumero() {
		Long proximoNumero = service.obtenerProximoNumero(); // implementar en el service
		return new ResponseDTO<>(true, "Próximo número", proximoNumero);
	}

	@GetMapping("/pedidos")
	public ResponseDTO<List<Pedidos>> mostrarTodosPedidos() {
		return service.mostrarTodos().isEmpty() ? new ResponseDTO<>(false, "Listado Vacio", service.mostrarTodos())
				: new ResponseDTO<>(true, "Listado", service.mostrarTodos());
	}

	@GetMapping("/pedidos/{id}")
	public ResponseDTO<?> mostrarPedidosId(@PathVariable("id") Long id) {
		return service.existe(id) ? new ResponseDTO<>(true, "Encontrado", service.mostrarPorId(id))
				: new ResponseDTO<>(false, "No Encontrado");
	}

	@PostMapping("/pedidos")
	public ResponseDTO<?> crearNuevoPedidos(@RequestBody PedidoRequestDTO pedidoDTO) {
		Pedidos pedido = new Pedidos();

		// 🧾 Asignar número de pedido como los existentes
		pedido.setNumero(service.obtenerProximoNumero());

		// ⏱️ Hora actual y hora estimada (+30 min)
		LocalDateTime ahora = LocalDateTime.now();
		LocalDateTime entregaEstimada = ahora.plusMinutes(30);
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

		pedido.setFechyHoraDePedido(ahora.format(formatter));
		pedido.setFechyHoraDeEntrega(entregaEstimada.format(formatter));

		// Estado y tiempo estimado como en los datos iniciales
		pedido.setEstado("Pendiente");
		pedido.setTiempoEstimado("30 minutos");

		// 👉 Si querés permitir que el frontend mande otro estado/tiempo, podrías
		// sobreescribirlos aquí usando pedidoDTO si vienen no nulos.

		// Empleado
		if (pedidoDTO.getEmpleado() != null) {
			Empleado emp = new Empleado();
			emp.setId(pedidoDTO.getEmpleado().getId());
			pedido.setEmpleado(emp);
		}

		// Productos
		if (pedidoDTO.getLista_Productos() != null) {
			System.out.println("DTO trae " + pedidoDTO.getLista_Productos().size() + " productos");
			Set<Productos> productos = new HashSet<>();
			for (PedidoRequestDTO.IdDTO prodDTO : pedidoDTO.getLista_Productos()) {
				System.out.println(" - DTO producto id=" + prodDTO.getId());

				// ✅ Cargar el producto desde la BD en lugar de crear uno nuevo
				Productos prod = productosService.mostrarPorId(prodDTO.getId()); // ← Necesitás inyectar
																					// IProductosService
				if (prod != null) {
					productos.add(prod);
				}
			}
			pedido.setLista_Productos(productos);
		}
		System.out.println("En el controller, pedido.getLista_Productos().size() = " +
				(pedido.getLista_Productos() != null ? pedido.getLista_Productos().size() : "null"));

		Pedidos guardado = service.guardar(pedido);

		return new ResponseDTO<>(true, "Guardado", guardado);
	}

	@PutMapping(value = "/pedidos/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseDTO<?> actualizarEstadoPedido(@PathVariable Long id, @RequestBody Map<String, Object> body) {
		// leer estado del JSON recibido
		Object estadoObj = body.get("estado");
		if (estadoObj == null) {
			return new ResponseDTO<>(false, "Falta campo 'estado' en el body.");
		}
		String nuevoEstado = estadoObj.toString();

		if (!service.existe(id)) {
			return new ResponseDTO<>(false, "El pedido con ID " + id + " no existe.");
		}

		try {
			service.actualizarEstado(id, nuevoEstado);
			return new ResponseDTO<>(true, "Estado actualizado.");
		} catch (Exception ex) {
			return new ResponseDTO<>(false, "Error al actualizar: " + ex.getMessage());
		}
	}

	@DeleteMapping("/pedidos/{id}")
	public ResponseDTO<?> borrarPedidos(@PathVariable("id") Long id) {
		if (service.existe(id)) {
			service.eliminarPorId(id);
		}
		return service.existe(id) ? new ResponseDTO<>(true, "Eliminado")
				: new ResponseDTO<>(false, "Este elemento no existe, No se puede eliminar");
	}
}
