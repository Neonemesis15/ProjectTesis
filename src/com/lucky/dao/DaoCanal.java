package com.lucky.dao;

import java.util.List;

public interface DaoCanal {
	// Listar canales
	public List<Object[]> canalQry();
	
	// Get message
	public String getMessage();
}
