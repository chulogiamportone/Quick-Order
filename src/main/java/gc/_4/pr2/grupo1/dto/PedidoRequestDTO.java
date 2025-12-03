package gc._4.pr2.grupo1.dto;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

public class PedidoRequestDTO {
    private String FechyHoraDePedido;
    private String FechyHoraDeEntrega;
    private String Estado;
    private String TiempoEstimado;
    
    private IdDTO empleado;
    
    @JsonProperty("Lista_Productos")  // ← FORZAR EL NOMBRE EXACTO
    private List<IdDTO> Lista_Productos;
    
    @JsonProperty("Lista_Mesas")  // ← FORZAR EL NOMBRE EXACTO
    private List<IdDTO> Lista_Mesas;

    // Getters y Setters
    public String getFechyHoraDePedido() { return FechyHoraDePedido; }
    public void setFechyHoraDePedido(String fechyHoraDePedido) { FechyHoraDePedido = fechyHoraDePedido; }
    
    public String getFechyHoraDeEntrega() { return FechyHoraDeEntrega; }
    public void setFechyHoraDeEntrega(String fechyHoraDeEntrega) { FechyHoraDeEntrega = fechyHoraDeEntrega; }
    
    public String getEstado() { return Estado; }
    public void setEstado(String estado) { Estado = estado; }
    
    public String getTiempoEstimado() { return TiempoEstimado; }
    public void setTiempoEstimado(String tiempoEstimado) { TiempoEstimado = tiempoEstimado; }
    
    public IdDTO getEmpleado() { return empleado; }
    public void setEmpleado(IdDTO empleado) { this.empleado = empleado; }
    
    public List<IdDTO> getLista_Productos() { return Lista_Productos; }
    public void setLista_Productos(List<IdDTO> lista_Productos) { Lista_Productos = lista_Productos; }
    
    public List<IdDTO> getLista_Mesas() { return Lista_Mesas; }
    public void setLista_Mesas(List<IdDTO> lista_Mesas) { Lista_Mesas = lista_Mesas; }

    public static class IdDTO {
        private Long id;
        private Integer cantidad;  // ← AGREGAR
        
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        
        public Integer getCantidad() { return cantidad; }  // ← AGREGAR
        public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }  // ← AGREGAR
    }
}