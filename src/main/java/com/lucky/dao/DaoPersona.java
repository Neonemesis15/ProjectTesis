package main.java.com.lucky.dao;

import java.util.List;

public interface DaoPersona {
	
	// Listar el combo de personas
	public List<Object[]> personaCbo();
	
	// Listar personas
	public List<Object[]> personaQry();
	
	// Get Message
	public String getMessage();
}
