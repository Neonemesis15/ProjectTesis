package com.lucky.dao;

import java.util.List;

public interface DaoClasificacion {

	// Listar clasificaciones
	public List<Object[]> clasificacionQry();
	
	// Get message
	public String getMessage();
}
