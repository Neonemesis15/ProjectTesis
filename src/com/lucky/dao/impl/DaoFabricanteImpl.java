package com.lucky.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import com.lucky.dao.DaoFabricante;
import com.lucky.dto.Fabricante;
import com.lucky.sql.ConectaDb;


public class DaoFabricanteImpl implements DaoFabricante {

	private final ConectaDb db;
	private final StringBuilder sql;
	private String message;
	
	public DaoFabricanteImpl(){
		this.db = new ConectaDb();
		this.sql = new StringBuilder();
	}
	
	@Override
	public List<Object[]> fabricanteQry() {
		List<Object[]> list = null;
		sql.append("SELECT f.id, ")
		.append("replace(f.nombre,'&','&amp;') nombre,  ")
		.append("f.descripcion ")
		.append("FROM mdl_fabricante f ");
		
		try(Connection cn = db.getConnection();
				PreparedStatement ps = cn.prepareStatement(sql.toString());
				ResultSet rs = ps.executeQuery()){
			list = new LinkedList<>();
			while(rs.next()){
				Object[] reg = new Object[3];
				
				reg[0] = rs.getInt(1);
				reg[1] = rs.getString(2);
				reg[2] = rs.getString(3);
				
				list.add(reg);
			}
		}catch(SQLException e){
			message = e.getMessage();
		}
		return list;
	}

	@Override
	public String getMessage() {
		return message;
	}

	@Override
	public String fabricanteIns(Fabricante fabricante) {
        sql.append("INSERT INTO mdl_fabricante(")
        .append("nombre,")
        .append("descripcion ")
        .append(") VALUES(?, ?)");

		try (Connection cn = db.getConnection();
		        PreparedStatement ps
		        = cn.prepareStatement(sql.toString())) {
		
		    ps.setString(1, fabricante.getNombre());
		    ps.setString(2, fabricante.getDescripcion());
		
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
	public String fabricanteUpd(Fabricante fabricante) {
        sql.append("UPDATE mdl_fabricante SET ")
        .append("nombre = ?,")
        .append("descripcion = ? ")
        .append("WHERE id = ?");

		try (Connection cn = db.getConnection();
		        PreparedStatement ps
		        = cn.prepareStatement(sql.toString())) {
		
		    ps.setString(1, fabricante.getNombre());
		    ps.setString(2, fabricante.getDescripcion());
		    ps.setInt(3, fabricante.getId());
		
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
	public String fabricantelDel(List<Integer> ids) {
        sql.append("DELETE FROM mdl_fabricante WHERE id = ?");

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
	public List<Object[]> fabricanteCbo() {
        List<Object[]> list = null;
        sql.append("SELECT ")
                .append("id,")
                .append("nombre ")
                .append("FROM mdl_fabricante ")
                .append("ORDER BY nombre");

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
	public Object[] fabricanteGet(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

}
