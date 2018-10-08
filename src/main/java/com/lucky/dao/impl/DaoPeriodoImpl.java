package main.java.com.lucky.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.ServletException;

import main.java.com.lucky.dao.DaoPeriodo;
import main.java.com.lucky.dto.Periodo;
import main.java.com.lucky.sql.ConectaDb;

/**
 * Class: DaoPeriodoImpl.java <br/>
 * Copyright: &copy; 2018 PSA SAC<br/>
 * @author    
 * <br/> Developed by:
 * <ul>
 * <li> Pablo Salas Alvarez (PSA)</li>
 * </ul>
 * <br/> Changes:
 * <ul>
 * <li> 2018-10-05 (PSA) Creaci&oacute;n de Clase.</li>
 * </ul>
 * @version 1.0
 */
public class DaoPeriodoImpl implements DaoPeriodo {

    private final ConectaDb db;
    private final StringBuilder sql;
    private String message;
    private List<Object[]> list;
    
    public DaoPeriodoImpl(){
    	this.db = new ConectaDb();
        this.sql = new StringBuilder();
    }
    
    
	@Override
	public List<Object[]> periodoQry() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String periodoIns(Periodo periodo) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String periodoUpd(Periodo periodo) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String periodoDel(List<Integer> ids) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Object[]> periodoCbo() {
        
        sql.append("SELECT ")
                .append("id,")
                .append("nombre ")
                .append("FROM mdl_periodo ")
                .append("ORDER BY anio, mes, semana");

        try (Connection cn = db.getConnection();
                PreparedStatement ps = cn.prepareStatement(sql.toString());
                ResultSet rs = ps.executeQuery()) {

            list = new LinkedList<>();
            while (rs.next()) {
                Object[] reg = new Object[2];

                reg[0] = rs.getInt(1);
                reg[1] = rs.getString(2);

                list.add(reg);
            }

        } catch (SQLException e) {
            message = e.getMessage();
        }

        return list;

	}

	@Override
	public Object[] periodoGet(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getMessage() {
		return message;
	}

    /**
     * Metodo que devuelve los Periodos Activos
     * por Campaña Publicitaria y Salida a Campo 
     * @param idCampania Id de Campaña Publicitaria
     * @exception No exception value.
     * @return List<Object[]>.
     */ 
	@Override
	public List<Object[]> periodoCbo(Integer idCampania) {
        	
        sql.append("SELECT ")
                .append("P.id, ")
                .append("P.nombre ")
                .append("FROM mdl_visita V ")
                .append("INNER JOIN mdl_periodo P ON P.id = V.idPeriodo ")
                .append("WHERE V.idCampaniaPublicitaria = ? ")
                .append("AND V.estado = 1 ")
                .append("AND P.estado = 1 ");

        try (Connection cn = db.getConnection();
                PreparedStatement ps = cn.prepareStatement(sql.toString())) {

		    ps.setInt(1, idCampania);
		    ResultSet rs = ps.executeQuery();
		    
			// Verificar si el ResultSet devuelve registros
			int rowcount = 0;
			if (rs.last()) {
				  rowcount = rs.getRow();
				  rs.beforeFirst(); // not rs.first() because the rs.next() below will move on, missing the first element
			}
			if(rowcount != 0){
	            list = new LinkedList<>();
	            while (rs.next()) {
	                Object[] reg = new Object[2];
	
	                reg[0] = rs.getInt(1);
	                reg[1] = rs.getString(2);
	
	                list.add(reg);
	            }
			}else{
				message = "!No Hay Periodos Activos. \r\n"
						+ "Por favor verificar!";
			}

        } catch (SQLException e) {
            message = e.getMessage();
        }

        return list;

	}

}
