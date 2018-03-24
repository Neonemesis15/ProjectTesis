package com.lucky.dto;

public class Pdv {
	public Integer id;
	public String razonSocial;
	public String direccion;
	public String telefono;
	public TipoPdv tipoPdv;
	public Ubigeo ubigeo;
	
	public Pdv(){
		tipoPdv = new TipoPdv();
		ubigeo = new Ubigeo();
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getRazonSocial() {
		return razonSocial;
	}
	public void setRazonSocial(String razonSocial) {
		this.razonSocial = razonSocial;
	}
	public String getDireccion() {
		return direccion;
	}
	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
	public String getTelefono() {
		return telefono;
	}
	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}
	public TipoPdv getTipoPdv() {
		return tipoPdv;
	}
	public void setTipoPdv(TipoPdv tipoPdv) {
		this.tipoPdv = tipoPdv;
	}
	public Ubigeo getUbigeo() {
		return ubigeo;
	}
	public void setUbigeo(Ubigeo ubigeo) {
		this.ubigeo = ubigeo;
	}
}
