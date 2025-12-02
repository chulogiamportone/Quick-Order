package gc._4.pr2.grupo1.service.jpa;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gc._4.pr2.grupo1.entity.*;
import gc._4.pr2.grupo1.repository.*;
import gc._4.pr2.grupo1.service.IPedidosService;

@Service
public class PedidosServiceImp implements IPedidosService {

    @Autowired
    private PedidosRepository repo;

    @Autowired
    private ProductosRepository productosRepository;

   

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Override
    public List<Pedidos> mostrarTodos() {
        return repo.findAll();
    }

    @Override
    public Pedidos mostrarPorId(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Pedidos guardar(Pedidos pedidos) {
        // 🔹 Resolver lista de productos (ManyToMany)
        if (pedidos.getLista_Productos() != null) {
            Set<Productos> productos = pedidos.getLista_Productos().stream()
                .map(p -> productosRepository.findById(p.getId()).orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());
            pedidos.setLista_Productos(productos);
        }

       

        // 🔹 Resolver empleado (ManyToOne)
        if (pedidos.getEmpleado() != null && pedidos.getEmpleado().getId() != null) {
            Empleado empleado = empleadoRepository.findById(pedidos.getEmpleado().getId()).orElse(null);
            pedidos.setEmpleado(empleado);
        }

        // 🔹 Guardar el pedido completo
        return repo.save(pedidos);
    }

    @Override
    public void eliminarPorId(Long id) {
        repo.deleteById(id);
    }

    @Override
    public boolean existe(Long id) {
        if (id == null) {
            return false;
        } else {
            return repo.existsById(id);
        }
    }
}
