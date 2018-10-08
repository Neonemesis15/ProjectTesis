package main.java.com.lucky.dao;

import java.util.List;

import main.java.com.lucky.dto.Ubigeo;

public interface DaoUbigeo {
	// Listar Ubigeos
	public List<Object[]> ubigeoQry();

	
    /**
     * Metodo que devuelve los Ubigeos por Páginas
     * @param numpag Número de Página
     * @param filsXpag Filas por Página
     * @param where Filtro por Ubigeo
     * @exception No exception value.
     * @return List<Object[]>.
     */ 
	// Listar Ubigeos by NumPaginas, FilsXPagina, Where
	public List<Object[]> ubigeoQry(Integer numpag, Integer filsXpag, 
			String where);
	// 
	public Integer[] ubigeoCtasPags(Integer filsXpag, String where);
	
	public String ubigeoIns(Ubigeo ubigeo);
	
	public String ubigeoUpd(Ubigeo ubigeo);
	
	public String ubigeoDel(List<Integer> ids);

	public List<Object[]> ubigeoCbo();

    /**
     * Metodo que devuelve los Ubigeos 
     * @param idCampania Id de la Campaña Publicitaria
     * @param idPeriodo Id del Periodo
     * @param idTipPdv Id del Tipo de Punto de Venta
     * @exception No exception value.
     * @return List<Object[]>.
     */ 
	public List<Object[]> ubigeoCbo(Integer idCampania, Integer idPeriodo, 
			Integer idTipPdv);
	
	public Object[] ubigeoGet(Integer id);
	
	// Get message
	public String getMessage();
}
