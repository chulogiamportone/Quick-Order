package gc._4.pr2.grupo1.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import gc._4.pr2.grupo1.entity.Empleado;

public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
    Optional<Empleado> findByUsuario(String usuario);   
}
