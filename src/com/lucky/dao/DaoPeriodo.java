package com.lucky.dao;

import java.util.List;

import com.lucky.dto.Periodo;

public interface DaoPeriodo {
	// Listar periodos
	public List<Object[]> periodoQry();
	
	public String periodoIns(Periodo periodo);
	public String periodoUpd(Periodo periodo);
	public String periodoDel(List<Integer> ids);
	public List<Object[]> periodoCbo();
	public Object[] periodoGet(Integer id);
	// Get message
	public String getMessage();
}
