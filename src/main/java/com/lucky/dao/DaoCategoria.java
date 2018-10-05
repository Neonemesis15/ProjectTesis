package main.java.com.lucky.dao;

import java.util.List;

public interface DaoCategoria {
	// Listar Categorias
	public List<Object[]> categoriaQry();
	
	// Get message
	public String getMessage();
}
