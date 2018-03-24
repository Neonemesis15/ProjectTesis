package com.lucky.dao;

import java.util.List;

import com.lucky.dto.Pdv;

public interface DaoPdv {
	
	public List<Object[]> pdvQry();
	
	public String pdvIns(Pdv pdv);
	
	public String pdvUpd(Pdv pdv);
	
	public String pdvDel(List<Integer> ids);
	
	public List<Object[]> pdvCbo();
	
	public Object[] pdvGet(Integer id);
	
	// Get message
	public String getMessage();
}
