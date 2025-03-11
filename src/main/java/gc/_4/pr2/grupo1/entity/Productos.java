package gc._4.pr2.grupo1.entity;



import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.*;

@Entity
public class Productos {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String nombre;
	private String Descripcion;
	private int Precio;
	private String Disponibilidad;
	private String categoria;
	private String Ingredientes;

	@ManyToMany
	@JoinTable(name = "Productos_Pedidos",	
			joinColumns = {@JoinColumn(name = "productos_id")},
			inverseJoinColumns = {@JoinColumn(name = "pedidos_id")})
	private Set<Pedidos> Lista_PedidosP = new HashSet<>();

	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public int getPrecio() {
		return Precio;
	}
	public void setPrecio(int precio) {
		Precio = precio;
	}
	public String getDisponibilidad() {
		return Disponibilidad;
	}
	public void setDisponibilidad(String disponibilidad) {
		Disponibilidad = disponibilidad;
	}
	public String getDescripcion() {
		return Descripcion;
	}
	public void setDescripcion(String descripcion) {
		Descripcion = descripcion;
	}
	public String getCategoria() {
		return categoria;
	}
	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}
	public String getIngredientes() {
		return Ingredientes;
	}
	public void setIngredientes(String ingredientes) {
		Ingredientes = ingredientes;
	}	
}