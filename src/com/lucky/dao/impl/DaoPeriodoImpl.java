package com.lucky.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import com.lucky.dao.DaoPeriodo;
import com.lucky.dto.Periodo;
import com.lucky.sql.ConectaDb;

public class DaoPeriodoImpl implements DaoPeriodo {

    private final ConectaDb db;
    private final StringBuilder sql;
    private String message;
    
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
        List<Object[]> list = null;
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

}
