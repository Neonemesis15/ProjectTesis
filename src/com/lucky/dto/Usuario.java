package com.lucky.dto;

/*
 * v1.0
 * Descripcion: Muestra los usuarios del sistema, referenciando a una persona
 * */
public class Usuario {
	private Integer id;
	private Integer codPerfil;
	private Integer codPersona;
	private String nombreUsuario;
	private String password;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getCodPerfil() {
		return codPerfil;
	}
	public void setCodPerfil(Integer codPerfil) {
		this.codPerfil = codPerfil;
	}
	public Integer getCodPersona() {
		return codPersona;
	}
	public void setCodPersona(Integer codPersona) {
		this.codPersona = codPersona;
	}
	public String getNombreUsuario() {
		return nombreUsuario;
	}
	public void setNombreUsuario(String nombreUsuario) {
		this.nombreUsuario = nombreUsuario;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
