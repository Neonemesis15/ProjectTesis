package main.java.com.lucky.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import main.java.com.lucky.dao.DaoVisita;
import main.java.com.lucky.dto.Visita;
import main.java.com.lucky.sql.ConectaDb;

public class DaoVisitaImpl implements DaoVisita {

	private final ConectaDb db;
	private final StringBuilder sql;
	private String message;
	
	public DaoVisitaImpl(){
		this.db = new ConectaDb();
		this.sql = new StringBuilder();
	}
	
	@Override
	public List<Object[]> visitaQry() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String visitaIns(Visita visita) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String visitaUpd(Visita visita) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String visitaDel(List<Integer> ids) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Object[]> visitaCbo() {
		
		List<Object[]> list = null;
		
		sql.append("SELECT ")
		.append("id, ")
		.append("descripcion ")
		.append("FROM mdl_visita ")
		.append("ORDER BY descripcion ");
		
		try(Connection cn = db.getConnection();
				PreparedStatement ps = cn.prepareStatement(sql.toString());
				ResultSet rs = ps.executeQuery()){
			
			list = new LinkedList<>();
			
			while(rs.next()){
				
				Object[] reg = new Object[6];
				
				reg[0] = rs.getInt(1);
				reg[1] = rs.getString(2);
				
				list.add(reg);
			}
			
		}catch(SQLException e){
			message = e.getMessage();
		}
		
		return list;
	}

	@Override
	public Object[] visitaGet(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getMessage() {
		return message;
	}

}
