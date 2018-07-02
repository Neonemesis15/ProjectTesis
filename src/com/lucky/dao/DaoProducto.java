package com.lucky.dao;

import java.util.List;

import com.lucky.dto.Producto;

public interface DaoProducto {

	public List<Object[]> productoQry();
	public String productoIns(Producto producto);
	public String productoUpd(Producto producto);
	public String productoDel(List<Integer> ids);
	public List<Object[]> productoCbo();
	public Object[] productoGet(Integer id);
	//Get Message
	public String getMessage();
	
}
