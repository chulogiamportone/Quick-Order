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
	private String Descripción;
	private int Precio;
	private String Disponibilidad;
	private String categoría;
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
	public String getDescripción() {
		return Descripción;
	}
	public void setDescripción(String descripción) {
		Descripción = descripción;
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
	public String getCategoría() {
		return categoría;
	}
	public void setCategoría(String categoría) {
		this.categoría = categoría;
	}
	public String getIngredientes() {
		return Ingredientes;
	}
	public void setIngredientes(String ingredientes) {
		Ingredientes = ingredientes;
	}
	
	
}
