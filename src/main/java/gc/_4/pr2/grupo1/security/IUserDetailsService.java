package gc._4.pr2.grupo1.security;

import org.springframework.security.core.userdetails.UserDetails;


public interface IUserDetailsService {
    public UserDetails loadUserByUsername(String username);
}
