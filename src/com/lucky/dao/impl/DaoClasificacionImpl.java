package com.lucky.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import com.lucky.dao.DaoClasificacion;
import com.lucky.sql.ConectaDb;

public class DaoClasificacionImpl implements DaoClasificacion {

	private final ConectaDb db;
	private final StringBuilder sql;
	private String message;
	
	public DaoClasificacionImpl(){
		this.db = new ConectaDb();
		this.sql = new StringBuilder();
	}
	
	@Override
	public List<Object[]> clasificacionQry() {
		// TODO Auto-generated method stub
		List<Object[]> list = null;
		sql.append("SELECT c.id, ")
		.append("f.nombre Fabrica, ")
		.append("cat.nombre Categoria, ")
		.append("m.nombre Marca ")
		.append("FROM mdl_clasificacion c, ")
		.append("mdl_fabricante f, ")
		.append("mdl_categoria cat, ")
		.append("mdl_marca m ")
		.append("WHERE c.idFabricante = f.id ")
		.append("AND c.idCategoria = cat.id ")
		.append("AND c.idMarca = m.id ")
		.append("ORDER BY f.nombre, cat.nombre, m.nombre ");
		try(Connection cn = db.getConnection();
				PreparedStatement ps = cn.prepareStatement(sql.toString());
				ResultSet rs = ps.executeQuery()){
			list = new LinkedList<>();
			while(rs.next()){
				Object[] reg = new Object[4];
				
				reg[0] = rs.getInt(1);
				reg[1] = rs.getString(2);
				reg[2] = rs.getString(3);
				reg[3] = rs.getString(4);
				
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

}
