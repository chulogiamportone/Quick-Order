package gc._4.pr2.grupo1.security;

import java.util.Collection;
import java.util.Collections;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import gc._4.pr2.grupo1.entity.Empleado;

public class CustomUserPrincipal implements UserDetails {
    
    private Empleado empleado;
    
    public CustomUserPrincipal(Empleado empleado) {
        this.empleado = empleado;
    }
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(
            new SimpleGrantedAuthority("ROLE_" + empleado.getCargo().name())
        );
    }
    
    @Override
    public String getPassword() {
        return empleado.getContraseña();
    }
    
    @Override
    public String getUsername() {
        return empleado.getUsuario();
    }
    
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    
    @Override
    public boolean isEnabled() {
        return true;
    }
    
    public Empleado getEmpleado() {
        return empleado;
    }
}