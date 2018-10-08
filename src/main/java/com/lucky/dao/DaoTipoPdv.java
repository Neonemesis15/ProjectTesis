package main.java.com.lucky.dao;

import java.util.List;


import main.java.com.lucky.dto.TipoPdv;

public interface DaoTipoPdv {

	// Listar tipoPdves
	public List<Object[]> tipoPdvQry();
	
	public String tipoPdvIns(TipoPdv tipoPdv);
	
	public String tipoPdvUpd(TipoPdv tipoPdv);
	
	public String tipoPdvDel(List<Integer> ids);
    /**
     * Metodo que devuelve los Tipos de Puntos de Venta
     * @param No param
     * @exception No exception value.
     * @return List<Object[]>.
     */ 
	public List<Object[]> tipoPdvCbo();
	/**
     * Metodo que devuelve los Tipos de Puntos de Venta
     * por Campania y Periodo
     * @param idCampania Id de la Campania Publicitaria
     * @param idPeriodo Id del Periodo
     * @exception No exception value.
     * @return List<Object[]>.
     */
	public List<Object[]> tipoPdvCbo(Integer idCampania, Integer idPeriodo);
	
	public Object[] tipoPdvGet(Integer id);
	
	// Get message
	public String getMessage();
	
}
