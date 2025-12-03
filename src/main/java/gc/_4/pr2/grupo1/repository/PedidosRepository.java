package gc._4.pr2.grupo1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import gc._4.pr2.grupo1.entity.Pedidos;

public interface PedidosRepository extends JpaRepository<Pedidos, Long> {
    @Query("SELECT MAX(p.numero) FROM Pedidos p")
    Long findMaxNumero();
}
