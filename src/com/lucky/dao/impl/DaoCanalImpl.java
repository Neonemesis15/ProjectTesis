package com.lucky.dao.impl;

import java.util.List;

import com.lucky.dao.DaoCanal;
import com.lucky.dto.Canal;
import com.lucky.sql.ConectaDb;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;


public class DaoCanalImpl implements DaoCanal {

    private final ConectaDb db;
    private final StringBuilder sql;
    private String message;
	
    public DaoCanalImpl(){
        this.db = new ConectaDb();
        this.sql = new StringBuilder();
    }
    
	@Override
	public List<Object[]> canalQry() {
        List<Object[]> list = null;
        sql.append("SELECT ")
                .append("id,")
                .append("nombre,")
                .append("descripcion ")
                .append("FROM mdl_canal ")
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
	public String getMessage() {
		return message;
	}

	@Override
	public String canalIns(Canal canal) {
        sql.append("INSERT INTO mdl_canal(")
        .append("nombre,")
        .append("descripcion ")
        .append(") VALUES(?, ?)");

		try (Connection cn = db.getConnection();
		        PreparedStatement ps
		        = cn.prepareStatement(sql.toString())) {
		
		    ps.setString(1, canal.getNombre());
		    ps.setString(2, canal.getDescripcion());
		
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
	public String canalUpd(Canal canal) {
        sql.append("UPDATE mdl_canal SET ")
        .append("nombre = ?,")
        .append("descripcion = ? ")
        .append("WHERE id = ?");

		try (Connection cn = db.getConnection();
		        PreparedStatement ps
		        = cn.prepareStatement(sql.toString())) {
		
		    ps.setString(1, canal.getNombre());
		    ps.setString(2, canal.getDescripcion());
		    ps.setInt(3, canal.getId());
		
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
	public String canalDel(List<Integer> ids) {
        sql.append("DELETE FROM mdl_canal WHERE id = ?");

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
	public List<Object[]> canalCbo() {
        List<Object[]> list = null;
        sql.append("SELECT ")
                .append("id,")
                .append("nombre ")
                .append("FROM mdl_canal ")
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
	public Object[] canalGet(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

}
