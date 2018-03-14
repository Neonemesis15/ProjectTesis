package com.lucky.dao;

import java.util.List;

import com.lucky.dto.CampaniaPublicitaria;
import com.lucky.dto.Canal;



public interface DaoCanal {
	// Listar canales
	public List<Object[]> canalQry();
	
	public String canalIns(Canal canal);
	public String canalUpd(Canal canal);
	public String canalDel(List<Integer> ids);
	public List<Object[]> canalCbo();
	public Object[] canalGet(Integer id);
	// Get message
	public String getMessage();
}
