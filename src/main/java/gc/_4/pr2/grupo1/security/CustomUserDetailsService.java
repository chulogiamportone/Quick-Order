package gc._4.pr2.grupo1.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import gc._4.pr2.grupo1.entity.Empleado;
import gc._4.pr2.grupo1.repository.EmpleadoRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Empleado empleado = empleadoRepository.findByUsuario(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        
        
        
        return User.builder()
                .username(empleado.getUsuario())
                .password(empleado.getContraseña()) // 👈 debe ser el hash BCrypt de la BD
                .roles(empleado.getCargo().name()) // o lo que corresponda
                .build();
    }   

}

