package main.java.com.lucky.dao;

import java.util.List;

import main.java.com.lucky.dto.TipoPdv;

public interface DaoTipoPdv {

	// Listar tipoPdves
	public List<Object[]> tipoPdvQry();
	
	public String tipoPdvIns(TipoPdv tipoPdv);
	
	public String tipoPdvUpd(TipoPdv tipoPdv);
	
	public String tipoPdvDel(List<Integer> ids);
	
	public List<Object[]> tipoPdvCbo();
	
	public Object[] tipoPdvGet(Integer id);
	
	// Get message
	public String getMessage();
	
}
