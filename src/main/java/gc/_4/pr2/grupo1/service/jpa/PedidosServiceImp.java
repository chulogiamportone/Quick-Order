package gc._4.pr2.grupo1.service.jpa;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

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

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Pedidos> mostrarTodos() {
        List<Pedidos> lista = repo.findAll();
        System.out.println("=== MOSTRAR TODOS PEDIDOS ===");
        for (Pedidos p : lista) {
            System.out.println("Pedido id=" + p.getId()
                    + " numero=" + p.getNumero()
                    + " productos.size=" +
                    (p.getLista_Productos() != null ? p.getLista_Productos().size() : "null"));
        }
        return lista;
    }

    @Override
    public Pedidos mostrarPorId(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public Pedidos guardar(Pedidos pedidos) {
        System.out.println("=== GUARDAR PEDIDO ===");
        System.out.println("Productos recibidos (antes de guardar): "
                + (pedidos.getLista_Productos() != null ? pedidos.getLista_Productos().size() : "null"));

        // Resolver empleado
        if (pedidos.getEmpleado() != null && pedidos.getEmpleado().getId() != null) {
            Empleado empleado = empleadoRepository.findById(pedidos.getEmpleado().getId()).orElse(null);
            pedidos.setEmpleado(empleado);
        }

        // Guardar primero el pedido
        Pedidos guardado = repo.save(pedidos);
        System.out.println("Pedido guardado con id=" + guardado.getId());

        // Crear relaciones en la tabla intermedia con SQL nativo
        if (pedidos.getLista_Productos() != null && !pedidos.getLista_Productos().isEmpty()) {
            System.out.println("Insertando relaciones en Productos_Pedidos...");

            for (Productos p : pedidos.getLista_Productos()) {
                if (p.getId() != null) {
                    boolean existe = productosRepository.existsById(p.getId());
                    System.out.println("Producto id=" + p.getId() + " existe en BD: " + existe);
                    if (existe) {
                        entityManager.createNativeQuery(
                                "INSERT INTO Productos_Pedidos (productos_id, pedidos_id) VALUES (?, ?)")
                                .setParameter(1, p.getId())
                                .setParameter(2, guardado.getId())
                                .executeUpdate();

                        System.out.println("INSERT Productos_Pedidos -> (" + p.getId() + ", " + guardado.getId() + ")");
                    }
                }
            }
        } else {
            System.out.println("No se recibieron productos en el pedido.");
        }

        // Opcional: recargar el pedido desde BD para que traiga los productos
        // guardado = repo.findById(guardado.getId()).orElse(guardado);

        return guardado;
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

    @Override
    public Long obtenerProximoNumero() {
        Long ultimoNumero = repo.findMaxNumero();
        return (ultimoNumero == null) ? 1L : ultimoNumero + 1;
    }
}