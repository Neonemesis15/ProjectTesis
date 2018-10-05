package main.java.com.lucky.dto;

public class VisitaUsuarioDet {
	
	private Integer id;
	private Usuario usuarioAsignado;
	private VisitaUsuario visitaUsuario;
	
	public VisitaUsuarioDet(){
		usuarioAsignado = new Usuario();
		visitaUsuario = new VisitaUsuario();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Usuario getUsuarioAsignado() {
		return usuarioAsignado;
	}

	public void setUsuarioAsignado(Usuario usuarioAsignado) {
		this.usuarioAsignado = usuarioAsignado;
	}

	public VisitaUsuario getVisitaUsuario() {
		return visitaUsuario;
	}

	public void setVisitaUsuario(VisitaUsuario visitaUsuario) {
		this.visitaUsuario = visitaUsuario;
	}
	
}
