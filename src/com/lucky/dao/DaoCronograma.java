package com.lucky.dao;

import java.util.List;

import com.lucky.dto.Cronograma;


public interface DaoCronograma {

	// Listar Cronograma
	public List<Object[]> cronogramaQry();
	public List<Object[]> cronogramaQry(Integer idCampania, Integer idPeriodo);
	
	public String cronogramaIns(Cronograma cronograma);
	
	public String cronogramaUpd(Cronograma cronograma);
	
	public String cronogramaDel(List<Integer> ids);
	
	public List<Object[]> cronogramaCbo();
	
	public Object[] cronogramaGet(Integer id);
	
	// Get message
	public String getMessage();
}
