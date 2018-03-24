package com.lucky.dao;

import java.util.List;

import com.lucky.dto.Ubigeo;

public interface DaoUbigeo {
	// Listar ubigeos
	public List<Object[]> ubigeoQry();
	
	public String ubigeoIns(Ubigeo ubigeo);
	
	public String ubigeoUpd(Ubigeo ubigeo);
	
	public String ubigeoDel(List<Integer> ids);

	public List<Object[]> ubigeoCbo();
	
	public Object[] ubigeoGet(Integer id);
	
	// Get message
	public String getMessage();
}
