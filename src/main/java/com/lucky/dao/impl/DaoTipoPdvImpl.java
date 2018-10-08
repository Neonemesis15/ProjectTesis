package main.java.com.lucky.dao.impl;

import java.util.List;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import java.util.List;

import main.java.com.lucky.dao.DaoTipoPdv;
import main.java.com.lucky.dto.Canal;
import main.java.com.lucky.dto.TipoPdv;
import main.java.com.lucky.sql.ConectaDb;

/**
 * Class: DaoTipoPdvImpl.java <br/>
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
public class DaoTipoPdvImpl implements DaoTipoPdv {

    private final ConectaDb db;
    private final StringBuilder sql;
    private String message;
    private List<Object[]> list;
	
    public DaoTipoPdvImpl(){
        this.db = new ConectaDb();
        this.sql = new StringBuilder();
    }
    
	@Override
	public List<Object[]> tipoPdvQry() {
        List<Object[]> list = null;
        sql.append("SELECT ")
                .append("id,")
                .append("nombre,")
                .append("descripcion ")
                .append("FROM mdl_tipopuntodeventa ")
                .append("ORDER BY nombre");

        try (Connection cn = db.getConnection();
                PreparedStatement ps = cn.prepareStatement(sql.toString());
                ResultSet rs = ps.executeQuery()) {

            list = new LinkedList<>();
            while (rs.next()) {
                Object[] reg = new Object[3];

                reg[0] = rs.getInt(1);
                reg[1] = rs.getString(2);
                reg[2] = rs.getString(3);

                list.add(reg);
            }

        } catch (SQLException e) {
            message = e.getMessage();
        }

        return list;
	}

	@Override
	public String tipoPdvIns(TipoPdv tipoPdv) {
        sql.append("INSERT INTO mdl_tipopuntodeventa(")
        .append("nombre,")
        .append("descripcion ")
        .append(") VALUES(?, ?)");

		try (Connection cn = db.getConnection();
		        PreparedStatement ps
		        = cn.prepareStatement(sql.toString())) {
		
		    ps.setString(1, tipoPdv.getNombre());
		    ps.setString(2, tipoPdv.getDescripcion());
		
		    int ctos = ps.executeUpdate();
		    if (ctos == 0) {
		        throw new SQLException("0 filas afectadas");
		    }
		
		} catch (SQLException e) {
		    message = e.getMessage();
		}
		
		return message;
	}

	@Override
	public String tipoPdvUpd(TipoPdv tipoPdv) {
        sql.append("UPDATE mdl_tipopuntodeventa SET ")
        .append("nombre = ?,")
        .append("descripcion = ? ")
        .append("WHERE id = ?");

		try (Connection cn = db.getConnection();
		        PreparedStatement ps
		        = cn.prepareStatement(sql.toString())) {
		
		    ps.setString(1, tipoPdv.getNombre());
		    ps.setString(2, tipoPdv.getDescripcion());
		    ps.setInt(3, tipoPdv.getId());
		
		    int ctos = ps.executeUpdate();
		    if (ctos == 0) {
		        throw new SQLException("0 filas afectadas");
		    }
		
		} catch (SQLException e) {
		    message = e.getMessage();
		}
		
		return message;
	}

	@Override
	public String tipoPdvDel(List<Integer> ids) {
        sql.append("DELETE FROM mdl_tipopuntodeventa WHERE id = ?");

        try (Connection cn = db.getConnection();
                PreparedStatement ps
                = cn.prepareStatement(sql.toString())) {

            cn.setAutoCommit(false); // desactiva autoCommit
            boolean ok = true;

            for (Integer x : ids) {
                ps.setInt(1, x);

                int ctos = ps.executeUpdate();
                if (ctos == 0) {
                    ok = false;
                    message = "ID recibido no existe";
                    break;
                }
            }

            if (ok) {
                cn.commit();
            } else {
                cn.rollback();
            }

            cn.setAutoCommit(true); // activa autoCommit

        } catch (SQLException e) {
            message = e.getMessage();
        }

        return message;
	}

    /**
     * Metodo que devuelve los Tipos de Puntos de Venta
     * @param No param
     * @exception No exception value.
     * @return List<Object[]>.
     */ 
	@Override
	public List<Object[]> tipoPdvCbo() {
        
        sql.append("SELECT ")
                .append("id,")
                .append("nombre ")
                .append("FROM mdl_tipopuntodeventa ")
                .append("ORDER BY nombre");

        try (Connection cn = db.getConnection();
                PreparedStatement ps = cn.prepareStatement(sql.toString());
                ResultSet rs = ps.executeQuery()) {

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
				message = "!No se han creado Tipos de Punto de Venta. "
						+ "Por favor Verificar!";
			}

        } catch (SQLException e) {
            message = e.getMessage();
        }

        return list;
	}
	
	/**
     * Metodo que devuelve los Tipos de Puntos de Venta
     * por Campania y Periodo
     * @param idCampania Id de la Campania Publicitaria
     * @param idPeriodo Id del Periodo
     * @exception No exception value.
     * @return List<Object[]>.
     */
	@Override
	public List<Object[]> tipoPdvCbo(Integer idCampania, Integer idPeriodo) {
        
        sql.append("SELECT ")
                .append("DISTINCT TPDV.id, ")
                .append("TPDV.nombre ")
                .append("FROM mdl_tipopuntodeventa TPDV ")
                .append("INNER JOIN mdl_puntodeventa PDV ON PDV.idTipoPuntoDeVenta = TPDV.id ")
                .append("INNER JOIN mdl_puntodeventaporvisita A ON A.idPuntoDeVenta = PDV.id ")
                .append("INNER JOIN mdl_visita V ON A.idVisita = V.id ")
                .append("WHERE V.idCampaniaPublicitaria = ? ")
                .append("AND V.idPeriodo = ? ")
                .append("AND TPDV.estado = 1 ")
                .append("AND PDV.estado = 1 ")
                .append("AND A.estado = 1 ")
                .append("AND V.estado = 1 ");
        
        try (Connection cn = db.getConnection();
                PreparedStatement ps = cn.prepareStatement(sql.toString())) {

        	ps.setInt(1, idCampania);
			ps.setInt(2, idPeriodo);
        	
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
				message = "!No se han creado Tipos de Punto de Venta. "
						+ "Por favor Verificar!";
			}

        } catch (SQLException e) {
            message = e.getMessage();
        }

        return list;

	}
	
	@Override
	public Object[] tipoPdvGet(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getMessage() {
		return message;
	}



}
