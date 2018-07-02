package com.lucky.dto;

public class Producto {
	public Integer id;
	public String nombre;
	public String descripcion;
	public String sku;
	public Clasificacion clasificacion;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public String getSku() {
		return sku;
	}
	public void setSku(String sku) {
		this.sku = sku;
	}
	public Clasificacion getClasificacion() {
		return clasificacion;
	}
	public void setClasificacion(Clasificacion clasificacion) {
		this.clasificacion = clasificacion;
	}
}
