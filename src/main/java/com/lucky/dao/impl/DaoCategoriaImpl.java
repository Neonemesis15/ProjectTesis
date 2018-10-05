package main.java.com.lucky.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import main.java.com.lucky.dao.DaoCategoria;
import main.java.com.lucky.sql.ConectaDb;


public class DaoCategoriaImpl implements DaoCategoria {

	private final ConectaDb db;
	private final StringBuilder sql;
	private String message;
	
	public DaoCategoriaImpl(){
		this.db = new ConectaDb();
		this.sql = new StringBuilder();
	}
	
	
	@Override
	public List<Object[]> categoriaQry() {
		List<Object[]> list = null;
		
		sql.append("SELECT c.id, ")
		.append("c.nombre, ")
		.append("c.descripcion ")
		.append("FROM mdl_categoria c ");
		
		try(Connection cn = db.getConnection();
				PreparedStatement ps = cn.prepareStatement(sql.toString());
				ResultSet rs = ps.executeQuery()){
			
			list = new LinkedList<>();
			while(rs.next()){
				Object[] reg = new Object[4];
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
		// TODO Auto-generated method stub
		return message;
	}

}
