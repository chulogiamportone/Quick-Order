package gc._4.pr2.grupo1.service.jpa;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import gc._4.pr2.grupo1.entity.Empleado;
import gc._4.pr2.grupo1.repository.EmpleadoRepository;
import gc._4.pr2.grupo1.service.IEmpleadoService;

@Service
public class EmpleadoServiceImp implements IEmpleadoService {
    
    @Autowired
    private EmpleadoRepository repo;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<Empleado> mostrarTodos() {
        return repo.findAll();
    }

    @Override
    public Empleado mostrarPorId(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Empleado guardar(Empleado empleado) {
        // Encriptar contraseña antes de guardar
        if (empleado.getContraseña() != null && !empleado.getContraseña().startsWith("$2a$")) {
            empleado.setContraseña(passwordEncoder.encode(empleado.getContraseña()));
        }
        return repo.save(empleado);
    }

    @Override
    public void eliminarPorId(Long id) {
        repo.deleteById(id);
    }
    
    @Override
    public boolean existe(Long id) {
        if(id == null) {
            return false;
        } else {
            return repo.existsById(id);
        }
    }
}
