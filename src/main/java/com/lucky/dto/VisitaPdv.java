package main.java.com.lucky.dto;

public class VisitaPdv {
	private Integer id;
	private Visita visita;
	private Pdv pdv;
	public VisitaPdv(){
		visita = new Visita();
		pdv = new Pdv();
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Visita getVisita() {
		return visita;
	}
	public void setVisita(Visita visita) {
		this.visita = visita;
	}
	public Pdv getPdv() {
		return pdv;
	}
	public void setPdv(Pdv pdv) {
		this.pdv = pdv;
	}
	
}
