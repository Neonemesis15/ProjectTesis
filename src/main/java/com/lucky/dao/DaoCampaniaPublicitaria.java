package main.java.com.lucky.dao;

import java.util.List;

import main.java.com.lucky.dto.CampaniaPublicitaria;

public interface DaoCampaniaPublicitaria {
	// Listar Campanias Publicitarias
	public List<Object[]> campaniaPublicitariaQry();
	
	public String campaniaPublicitariaIns(CampaniaPublicitaria campaniaPublicitaria);
	
	public String campaniaPublicitariaUpd(CampaniaPublicitaria campaniaPublicitaria);
	
	public String campaniaPublicitariaDel(List<Integer> ids);
	
	public List<Object[]> campaniaPublicitariaCbo();
	
	public Object[] campaniaPublicitariaGet(Integer id);
	
	// Get message
	public String getMessage();
}
