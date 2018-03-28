package com.lucky.dto;

public class Cronograma {
	private Integer id;
	private VisitaUsuarioDet visitaUsuarioDet;
	private VisitaPdv visitaPdv;
	public Cronograma(){
		visitaUsuarioDet = new VisitaUsuarioDet();
		visitaPdv = new VisitaPdv();
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public VisitaUsuarioDet getVisitaUsuarioDet() {
		return visitaUsuarioDet;
	}
	public void setVisitaUsuarioDet(VisitaUsuarioDet visitaUsuarioDet) {
		this.visitaUsuarioDet = visitaUsuarioDet;
	}
	public VisitaPdv getVisitaPdv() {
		return visitaPdv;
	}
	public void setVisitaPdv(VisitaPdv visitaPdv) {
		this.visitaPdv = visitaPdv;
	}
}
