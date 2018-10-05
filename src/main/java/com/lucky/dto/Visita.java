package main.java.com.lucky.dto;

public class Visita {
	public Integer id;
	public String descripcion;
	public CampaniaPublicitaria campaniaPublicitaria;
	public Periodo periodo;
	public Visita(){
		campaniaPublicitaria = new CampaniaPublicitaria();
		periodo = new Periodo();
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public CampaniaPublicitaria getCampaniaPublicitaria() {
		return campaniaPublicitaria;
	}
	public void setCampaniaPublicitaria(CampaniaPublicitaria campaniaPublicitaria) {
		this.campaniaPublicitaria = campaniaPublicitaria;
	}
	public Periodo getPeriodo() {
		return periodo;
	}
	public void setPeriodo(Periodo periodo) {
		this.periodo = periodo;
	}
}
