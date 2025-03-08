package gc._4.pr2.grupo1.entity;

import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Pedidos {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private Long numero;
	private String fechyHoraDePedido;
	private String fechyHoraDeEntrega;
	private String estado;
	private String tiempoEstimado;
	
	@OneToOne(mappedBy="pedidos")
	private Factura factura;
	
	@ManyToMany(mappedBy = "Lista_PedidosM")
	private Set<Mesa> Lista_Mesas = new HashSet<>();

	@ManyToMany(mappedBy = "Lista_PedidosP")
	private Set<Productos>  Lista_Productos = new HashSet<>();

    @ManyToOne
    @JoinColumn(name="empleado_id")
    private Empleado empleado;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getNumero() {
		return numero;
	}
	public void setNumero(Long numero) {
		this.numero = numero;
	}
	public Empleado getEmpleado() {
        return empleado;
    }
    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
    }
	public String getFechyHoraDePedido() {
		return fechyHoraDePedido;
	}
	public void setFechyHoraDePedido(String fechyHoraDePedido) {
		this.fechyHoraDePedido = fechyHoraDePedido;
	}
	public String getFechyHoraDeEntrega() {
		return fechyHoraDeEntrega;
	}
	public void setFechyHoraDeEntrega(String fechyHoraDeEntrega) {
		this.fechyHoraDeEntrega = fechyHoraDeEntrega;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public String getTiempoEstimado() {
		return tiempoEstimado;
	}
	public void setTiempoEstimado(String tiempoEstimado) {
		this.tiempoEstimado = tiempoEstimado;
	}
}