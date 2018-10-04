package com.lucky.dao;

import java.util.List;

import com.lucky.dto.Ubigeo;

public interface DaoUbigeo {
	// Listar Ubigeos
	public List<Object[]> ubigeoQry();
	// Listar Ubigeos by Campania, Periodo y Tipo de Pdv
	public List<Object[]> ubigeoQry(Integer idCampania, Integer idPeriodo, Integer idTipPdv);
	
	// Listar Ubigeos by NumPaginas, FilsXPagina, Where
	public List<Object[]> ubigeoQry(Integer numpag, Integer filsXpag, String where);
	// 
	public Integer[] ubigeoCtasPags(Integer filsXpag, String where);
	
	public String ubigeoIns(Ubigeo ubigeo);
	
	public String ubigeoUpd(Ubigeo ubigeo);
	
	public String ubigeoDel(List<Integer> ids);

	public List<Object[]> ubigeoCbo();
	
	public Object[] ubigeoGet(Integer id);
	
	// Get message
	public String getMessage();
}
