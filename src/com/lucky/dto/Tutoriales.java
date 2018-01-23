package com.lucky.dto;

public class Tutoriales {

    private Integer idtutorial;
    private String titulo;
    private String tipo;
    private Double precio;

    public Tutoriales() {
    }

    public Integer getIdtutorial() {
        return idtutorial;
    }

    public void setIdtutorial(Integer idtutorial) {
        this.idtutorial = idtutorial;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }
}

