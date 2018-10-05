package main.java.com.lucky.dao;

import java.util.List;

import main.java.com.lucky.dto.Fabricante;

public interface DaoFabricante {
	
	// Listar Fabricantes
	public List<Object[]> fabricanteQry();
	public String fabricanteIns(Fabricante fabricante);
	public String fabricanteUpd(Fabricante fabricante);
	public String fabricantelDel(List<Integer> ids);
	public List<Object[]> fabricanteCbo();
	public Object[] fabricanteGet(Integer id);
	// Get message
	public String getMessage();
}
