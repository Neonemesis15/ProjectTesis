package main.java.com.lucky.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import main.java.com.lucky.dao.DaoProducto;
import main.java.com.lucky.dto.Producto;
import main.java.com.lucky.sql.ConectaDb;

public class DaoProductoImpl implements DaoProducto {

	
	private final ConectaDb db;
	private final StringBuilder sql;
	private String message;
	
	public DaoProductoImpl(){
		this.db = new ConectaDb();
		this.sql = new StringBuilder();
	}
	
	@Override
	public List<Object[]> productoQry() {
List<Object[]> list = null;
		
		sql.append("SELECT p.id, ")
		.append("p.SKU, ")
		.append("p.nombre, ")
		.append("p.descripcion, ")
		.append("UPPER(CONCAT(b.nombre,' - ',c.nombre,' - ',d.nombre)) categoria ")
		.append("FROM mdl_producto p ")
		.append("INNER JOIN mdl_clasificacion a ON a.id = p.idClasificacion ")
		.append("INNER JOIN mdl_fabricante b ON b.id = a.idFabricante ")
		.append("INNER JOIN mdl_categoria c ON c.id = a.idCategoria ")
		.append("INNER JOIN mdl_marca d ON d.id = a.idMarca ")
		.append("WHERE a.estado = 1 AND b.estado = 1 AND c.estado = 1 AND d.estado = 1 AND p.estado = 1");
		
		try(Connection cn = db.getConnection();
				PreparedStatement ps = cn.prepareStatement(sql.toString());
				ResultSet rs = ps.executeQuery()){
			
			list = new LinkedList<>();
			
			while(rs.next()){
				
				Object[] reg = new Object[5];
				
				reg[0] = rs.getString(1);
				reg[1] = rs.getString(2);
				reg[2] = rs.getString(3);
				reg[3] = rs.getString(4);
				reg[4] = rs.getString(5);
				
				list.add(reg);
			}
			
		} catch(SQLException e){
			message = e.getMessage();
		}
		
		return list;
	}

	@Override
	public String productoIns(Producto producto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String productoUpd(Producto producto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String productoDel(List<Integer> ids) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Object[]> productoCbo() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object[] productoGet(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getMessage() {
		// TODO Auto-generated method stub
		return null;
	}

}
