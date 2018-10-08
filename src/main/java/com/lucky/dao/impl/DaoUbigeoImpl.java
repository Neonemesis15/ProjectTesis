package main.java.com.lucky.dao.impl;

import java.util.List;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;

import main.java.com.lucky.dao.DaoUbigeo;
import main.java.com.lucky.dto.Ubigeo;
import main.java.com.lucky.sql.ConectaDb;

/**
 * Class: DaoUbigeoImpl.java <br/>
 * Copyright: &copy; 2018 PSA SAC<br/>
 * @author    
 * <br/> Developed by:
 * <ul>
 * <li> Pablo Salas Alvarez (PSA)</li>
 * </ul>
 * <br/> Changes:
 * <ul>
 * <li> 2018-10-08 (PSA) Creaci&oacute;n de Clase.</li>
 * </ul>
 * @version 1.0
 */
public class DaoUbigeoImpl implements DaoUbigeo {

    private final ConectaDb db;
    private final StringBuilder sql;
    private String message;
    private List<Object[]> list;
    
    public DaoUbigeoImpl(){
        this.db = new ConectaDb();
        this.sql = new StringBuilder();
    }
    
	@Override
	public List<Object[]> ubigeoQry() {
        List<Object[]> list = null;
        sql.append("SELECT ")
                .append("U.id,")
                //.append("P.nombre pais, ")
                .append("D.nombre departamento, ")
                .append("PR.nombre provincia, ")
                .append("DI.nombre distrito ")
                .append("FROM mdl_ubigeo U ")
                .append("INNER JOIN mdl_pais P ON U.idPais = P.id ")
                .append("INNER JOIN mdl_departamento D ON U.idDepartamento = D.id AND P.id = D.idPais ")
                .append("INNER JOIN mdl_provincia PR ON U.idProvincia = PR.id AND PR.idDepartamento = D.id ")
                .append("INNER JOIN mdl_distrito DI ON U.idDistrito = DI.id AND DI.idProvincia = PR.id ")
                .append("ORDER BY 2, 3, 4 ");

        try (Connection cn = db.getConnection();
                PreparedStatement ps = cn.prepareStatement(sql.toString());
                ResultSet rs = ps.executeQuery()) {

            list = new LinkedList<>();
            while (rs.next()) {
                Object[] reg = new Object[5];

                reg[0] = rs.getInt(1);
                reg[1] = rs.getString(2);
                reg[2] = rs.getString(3);
                reg[3] = rs.getString(4);
                //reg[4] = rs.getString(5);

                list.add(reg);
            }

        } catch (SQLException e) {
            message = e.getMessage();
        }

        return list;
	}

    /**
     * Metodo que devuelve los Ubigeos 
     * @param idCampania Id de la Campaña Publicitaria
     * @param idPeriodo Id del Periodo
     * @param idTipPdv Id del Tipo de Punto de Venta
     * @exception No exception value.
     * @return List<Object[]>.
     */ 
	@Override
	public List<Object[]> ubigeoCbo(Integer idCampania, Integer idPeriodo, 
			Integer idTipPdv) {
		
		sql.append("SELECT DISTINCT u.id, CONCAT(d.nombre,' - ',q.nombre,' - ',r.nombre) ubigeo ")
		.append("FROM mdl_puntodeventaporvisita a ")
		.append("INNER JOIN mdl_visita v ON a.idVisita = v.id ")
		.append("INNER JOIN mdl_puntodeventa p ON p.id = a.idPuntoDeVenta ")
		.append("INNER JOIN mdl_ubigeo u ON u.id = p.idUbigeo ")
		.append("INNER JOIN mdl_departamento d ON d.id = u.idDepartamento ")
		.append("INNER JOIN mdl_provincia q ON q.id = u.idProvincia ")
		.append("INNER JOIN mdl_distrito r ON r.id = u.idDistrito ")
		.append("WHERE v.idCampaniaPublicitaria = ? ")
		.append("AND v.idPeriodo = ? ")
		.append("AND p.idTipoPuntoDeVenta = ? ")
		.append("AND a.estado = 1 ")
		.append("AND v.estado = 1 ")
		.append("AND p.estado = 1 ")
		.append("AND u.estado = 1 ")
		.append("AND d.estado = 1 ")
		.append("AND q.estado = 1 ")
		.append("AND r.estado = 1 ")
		.append("ORDER BY u.id ");
		
		try(Connection cn = db.getConnection();
				PreparedStatement ps = cn.prepareStatement(sql.toString())){
		
			ps.setInt(1, idCampania);
			ps.setInt(2, idPeriodo);
			ps.setInt(3, idTipPdv);
		
			ResultSet rs = ps.executeQuery();
			
			// Verificar si el ResultSet devuelve registros
			int rowcount = 0;
			if (rs.last()) {
				  rowcount = rs.getRow();
				  rs.beforeFirst(); // not rs.first() because the rs.next() below will move on, missing the first element
			}
			if(rowcount != 0){
	            list = new LinkedList<>();
				while(rs.next()){
					Object[] reg = new Object[3];
					
					reg[0] = rs.getInt(1);
					reg[1] = rs.getString(2);
					
					list.add(reg);
				}
			}else{
				message = "!No se encontraron Ubigeos disponibles. "
						+ "Por favor Verificar!";
			}
		}catch(SQLException e){
			message = e.getMessage();
		}
		return list;
	}
	
	@Override
	public String ubigeoIns(Ubigeo ubigeo) {
        sql.append("INSERT INTO mdl_ubigeo(")
        .append("codigo,")
        .append("idPais, ")
        .append("idDepartamento, ")
        .append("idProvincia, ")
        .append("idDistrito ")
        .append(") VALUES(?, ?, ?, ?, ?)");

		try (Connection cn = db.getConnection();
		        PreparedStatement ps
		        = cn.prepareStatement(sql.toString())) {
		
		    ps.setString(1, ubigeo.getCodigo());
		    ps.setInt(2, ubigeo.pais.getId());
		    ps.setInt(3, ubigeo.departamento.getId());
		    ps.setInt(4, ubigeo.provincia.getId());
		    ps.setInt(2, ubigeo.distrito.getId());
		    
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
	public String ubigeoUpd(Ubigeo ubigeo) {
        sql.append("UPDATE mdl_ubigeo SET ")
        .append("codigo = ?, ")
        .append("idPais = ?, ")
        .append("idDepartamento = ?, ")
        .append("idProvincia = ?, ")
        .append("idDistrito = ? ")
        .append("WHERE id = ?");

		try (Connection cn = db.getConnection();
		        PreparedStatement ps
		        = cn.prepareStatement(sql.toString())) {
		
		    ps.setString(1, ubigeo.getCodigo());
		    ps.setInt(2, ubigeo.pais.getId());
		    ps.setInt(3, ubigeo.departamento.getId());
		    ps.setInt(4, ubigeo.provincia.getId());
		    ps.setInt(5, ubigeo.distrito.getId());
		
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
	public String ubigeoDel(List<Integer> ids) {
        sql.append("DELETE FROM mdl_ubigeo WHERE id = ?");

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

	@Override
	public List<Object[]> ubigeoCbo() {
        List<Object[]> list = null;
        sql.append("SELECT ")
                .append("U.id,")
                .append("UPPER(CONCAT(SUBSTR(D.nombre,1,3),' - ',SUBSTR(PR.nombre,1,3),' - ',SUBSTR(DI.nombre,1,8))) ubigeo ")
                .append("FROM mdl_ubigeo U ")
                .append("INNER JOIN mdl_pais P ON U.idPais = P.id ")
                .append("INNER JOIN mdl_departamento D ON U.idDepartamento = D.id AND P.id = D.idPais ")
                .append("INNER JOIN mdl_provincia PR ON U.idProvincia = PR.id AND PR.idDepartamento = D.id ")
                .append("INNER JOIN mdl_distrito DI ON U.idDistrito = DI.id AND DI.idProvincia = PR.id ")
                .append("ORDER BY D.nombre, PR.nombre, DI.nombre");

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
	public Object[] ubigeoGet(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getMessage() {
		return message;
	}

	@Override
	public List<Object[]> ubigeoQry(Integer numpag, Integer filsXpag, String where) {
		 List<Object[]> list = null;
	        sql.append("SELECT ")
	                .append("U.id,")
	                //.append("P.nombre pais, ")
	                .append("D.nombre departamento, ")
	                .append("PR.nombre provincia, ")
	                .append("DI.nombre distrito ")
	                .append("FROM mdl_ubigeo U ")
	                .append("INNER JOIN mdl_pais P ON U.idPais = P.id ")
	                .append("INNER JOIN mdl_departamento D ON U.idDepartamento = D.id AND P.id = D.idPais ")
	                .append("INNER JOIN mdl_provincia PR ON U.idProvincia = PR.id AND PR.idDepartamento = D.id ")
	                .append("INNER JOIN mdl_distrito DI ON U.idDistrito = DI.id AND DI.idProvincia = PR.id ")
	                .append(where)
	                .append("ORDER BY 2, 3, 4 ")
	                .append("LIMIT ?, ?");

	        try (Connection cn = db.getConnection();
	                PreparedStatement ps = cn.prepareStatement(sql.toString())) {

	        	ps.setInt(1, (numpag*filsXpag));
	        	ps.setInt(2, filsXpag);
	        	
	        	try(ResultSet rs = ps.executeQuery()){
	        		list = new LinkedList<>();
		            while (rs.next()) {
		                Object[] reg = new Object[5];

		                reg[0] = rs.getInt(1);
		                reg[1] = rs.getString(2);
		                reg[2] = rs.getString(3);
		                reg[3] = rs.getString(4);
		                //reg[4] = rs.getString(5);

		                list.add(reg);
		            }
	        	} catch (SQLException | NullPointerException e) {
	                message = e.getMessage();
	            }

	        } catch (SQLException e) {
	            message = e.getMessage();
	        }

	        return list;
	}

	@Override
	public Integer[] ubigeoCtasPags(Integer filsXpag, String where) {
		Integer[] result = null;
		sql.append("SELECT ")
		        .append("COUNT(*) ")
		        .append("FROM mdl_ubigeo U ")
		        .append("INNER JOIN mdl_pais P ON U.idPais = P.id ")
		        .append("INNER JOIN mdl_departamento D ON U.idDepartamento = D.id AND P.id = D.idPais ")
		        .append("INNER JOIN mdl_provincia PR ON U.idProvincia = PR.id AND PR.idDepartamento = D.id ")
		        .append("INNER JOIN mdl_distrito DI ON U.idDistrito = DI.id AND DI.idProvincia = PR.id ")
		        .append(where);
        try (Connection cn = db.getConnection();
                PreparedStatement ps
                = cn.prepareStatement(sql.toString());
                ResultSet rs = ps.executeQuery()) {

            if (rs.next()) {
                // total filas de consulta
                Integer totalfils = rs.getInt(1);

                // cantidad de paginas con filsXpag
                Integer ctasPags = (totalfils % filsXpag) == 0
                        ? (totalfils / filsXpag)
                        : (totalfils / filsXpag + 1);

                result = new Integer[2];
                result[0] = ctasPags;
                result[1] = totalfils;
            }

        } catch (SQLException e) {
            message = e.getMessage();
        }
        return result;
	}



}
