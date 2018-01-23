package com.lucky.dao;

import java.util.List;

public interface DaoFabricante {
	
	// Listar Fabricantes
	public List<Object[]> fabricanteQry();
	
	// Get message
	public String getMessage();
}
