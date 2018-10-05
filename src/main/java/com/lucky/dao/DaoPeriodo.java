package main.java.com.lucky.dao;

import java.util.List;

import main.java.com.lucky.dto.Periodo;

public interface DaoPeriodo {
	// Listar periodos
	public List<Object[]> periodoQry();
	
	public String periodoIns(Periodo periodo);
	public String periodoUpd(Periodo periodo);
	public String periodoDel(List<Integer> ids);
	public List<Object[]> periodoCbo();
	public List<Object[]> periodoCbo(Integer idCampania);
	public Object[] periodoGet(Integer id);
	// Get message
	public String getMessage();
}
