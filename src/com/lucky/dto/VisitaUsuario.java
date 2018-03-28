package com.lucky.dto;

public class VisitaUsuario {
	private Integer id;
	private Visita visita;
	private Usuario usuarioResponsable;
	
	public VisitaUsuario(){
		visita = new Visita();
		usuarioResponsable = new Usuario();
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
	public Usuario getUsuarioResponsable() {
		return usuarioResponsable;
	}
	public void setUsuarioResponsable(Usuario usuarioResponsable) {
		this.usuarioResponsable = usuarioResponsable;
	}
}
