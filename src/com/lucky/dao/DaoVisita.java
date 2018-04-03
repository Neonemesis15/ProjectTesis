package com.lucky.dao;

import java.util.List;

import com.lucky.dto.Visita;

public interface DaoVisita {

	// Listar Campanias Publicitarias
	public List<Object[]> visitaQry();
	
	public String visitaIns(Visita visita);
	
	public String visitaUpd(Visita visita);
	
	public String visitaDel(List<Integer> ids);
	
	public List<Object[]> visitaCbo();
	
	public Object[] visitaGet(Integer id);
	
	// Get message
	public String getMessage();
	
}
