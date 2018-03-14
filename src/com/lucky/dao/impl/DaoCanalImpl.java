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
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String canalIns(Canal canal) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String canalUpd(Canal canal) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String canalDel(List<Integer> ids) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Object[]> canalCbo() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object[] canalGet(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

}
