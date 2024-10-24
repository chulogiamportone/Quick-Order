package gc._4.pr2.grupo1.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Mediodepago {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String nombre;
	private String Descripción;
	private int Comisiones;
	private String Disponibilidad;
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
	public int getComisiones() {
		return Comisiones;
	}
	public void setComisiones(int comisiones) {
		Comisiones = comisiones;
	}
	public String getDisponibilidad() {
		return Disponibilidad;
	}
	public void setDisponibilidad(String disponibilidad) {
		Disponibilidad = disponibilidad;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
}