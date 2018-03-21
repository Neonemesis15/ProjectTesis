package com.lucky.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import com.lucky.dao.DaoCampaniaPublicitaria;
import com.lucky.dto.CampaniaPublicitaria;
import com.lucky.sql.ConectaDb;

public class DaoCampaniaPublicitariaImpl implements DaoCampaniaPublicitaria {

	
	private final ConectaDb db;
	private final StringBuilder sql;
	private String message;
	
	public DaoCampaniaPublicitariaImpl(){
		this.db = new ConectaDb();
		this.sql = new StringBuilder();
	}
	
	@Override
	public List<Object[]> campaniaPublicitariaQry() {
		
		List<Object[]> list = null;
		
		sql.append("SELECT ")
		.append("cp.id, ")
		.append("CONCAT(SUBSTRING(cp.nombre,1,30),'...') nombre, ")
		.append("CONCAT(SUBSTRING(cp.descripcion,1,30),'...') descripcion, ")
		.append("cp.fechaInicio, ")
		.append("cp.fechaFin, ")
		.append("f.nombre fabricante, ")
		.append("c.nombre canal ")
		.append("FROM 	mdl_campaniapublicitaria cp ")
		.append("INNER JOIN 	mdl_fabricante f ON cp.idFabricante = f.id ")
		.append("INNER JOIN  mdl_canal c ON  c.id = cp.idCanal");
		
		try(Connection cn = db.getConnection();
				PreparedStatement ps = cn.prepareStatement(sql.toString());
				ResultSet rs = ps.executeQuery()){
			
			list = new LinkedList<>();
			
			while(rs.next()){
				
				Object[] reg = new Object[7];
				
				reg[0] = rs.getString(1);
				reg[1] = rs.getString(2);
				reg[2] = rs.getString(3);
				reg[3] = rs.getString(4);
				reg[4] = rs.getString(5);
				reg[5] = rs.getString(6);
				reg[6] = rs.getString(7);
				
				list.add(reg);
			}
			
		} catch(SQLException e){
			message = e.getMessage();
		}
		
		return list;
	}

	@Override
	public String campaniaPublicitariaIns(CampaniaPublicitaria campaniaPublicitaria) {
		
		sql.append("INSERT INTO mdl_campaniapublicitaria( ")
		.append("nombre, ")
		.append("descripcion, ")
		.append("fechaInicio, ")
		.append("fechaFin, ")
		.append("idFabricante, ")
		.append("idCanal ")
		.append(") VALUES (?, ?, ?, ?, ?, ?)");
		
		try(Connection cn = db.getConnection();
				PreparedStatement ps = cn.prepareStatement(sql.toString())){
			
			ps.setString(1, campaniaPublicitaria.getNombre());
			ps.setString(2, campaniaPublicitaria.getDescripcion());
			ps.setDate(3, campaniaPublicitaria.getFechaInicio());
			ps.setDate(4, campaniaPublicitaria.getFechaFin());
			ps.setInt(5, campaniaPublicitaria.fabricante.getId());
			ps.setInt(6, campaniaPublicitaria.canal.getId());
			
			int ctos = ps.executeUpdate();
			if(ctos == 0){
				throw new SQLException("0 filas afectadas");
			}
			
		}catch(SQLException e){
			message = e.getMessage();
		}
		
		return message;
	}

	@Override
	public String campaniaPublicitariaUpd(CampaniaPublicitaria campaniaPublicitaria) {
		
		sql.append("UPDATE mdl_campaniapublicitaria SET ")
		.append("nombre = ?, ")
		.append("descripcion = ?, ")
		.append("fechaInicio = ?, ")
		.append("fechaFin = ?, ")
		.append("idFabricante = ?, ")
		.append("idCanal = ? ")
		.append("WHERE id = ? ");
		
		try(Connection cn = db.getConnection();
				PreparedStatement ps = cn.prepareStatement(sql.toString())){
		
			ps.setString(1, campaniaPublicitaria.getNombre());
			ps.setString(2, campaniaPublicitaria.getDescripcion());
			ps.setDate(3, campaniaPublicitaria.getFechaInicio() );
			ps.setDate(4, campaniaPublicitaria.getFechaFin());
			ps.setInt(5, campaniaPublicitaria.fabricante.getId());
			ps.setInt(6, campaniaPublicitaria.canal.getId());
			ps.setInt(7, campaniaPublicitaria.getId());
			
			int ctos = ps.executeUpdate();
			if( ctos == 0 ){
				throw new SQLException("0 filas afectadas");
			}
			
		}catch(SQLException e){
			message = e.getMessage();
		}
		return message;
	}

	@Override
	public String campaniaPublicitariaDel(List<Integer> ids) {
		sql.append("DELETE FROM mdl_campaniapublicitaria WHERE id = ?");
		try(Connection cn = db.getConnection();
				PreparedStatement ps = cn.prepareStatement(sql.toString())){
			
			cn.setAutoCommit(false);
			boolean ok = true;
			
			for(Integer x : ids){
				ps.setInt(1, x);
				int ctos = ps.executeUpdate();
				if(ctos == 0){
					ok = false;
					message = "ID recibido no existe";
					break;
				}
			}
			
			if(ok){
				cn.commit();
			}else{
				cn.rollback();
			}
			cn.setAutoCommit(true);
			
		}catch(SQLException e){
			message = e.getMessage();
		}
		return message;
	}

	@Override
	public List<Object[]> campaniaPublicitariaCbo() {
		
		List<Object[]> list = null;
		
		sql.append("SELECT ")
		.append("id, ")
		.append("nombre ")
		.append("FROM mdl_campaniapublicitaria ")
		.append("ORDER BY nombre ");
		
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
	public String getMessage() {
		
		return message;
	}

	@Override
	public Object[] campaniaPublicitariaGet(Integer id) {
		
		Object[] reg = null;
		
		sql.append("SELECT ")
		.append("cp.id idCampaniaPublicitaria, ")
		.append("cp.nombre, ")
		.append("cp.descripcion, ")
		.append("DATE_FORMAT(cp.fechaInicio,'%d/%m/%Y') fechaInicio,")
		.append("DATE_FORMAT(cp.fechaFin,'%d/%m/%Y') fechaFin,")
		.append("f.id idfabricante, ")
		.append("c.id idcanal ")
		.append("FROM 	mdl_campaniapublicitaria cp ")
		.append("INNER JOIN 	mdl_fabricante f ON cp.idFabricante = f.id ")
		.append("INNER JOIN  mdl_canal c ON  c.id = cp.idCanal ")
		.append("WHERE cp.id = ?");
		
		try(Connection cn = db.getConnection();
				PreparedStatement ps = cn.prepareStatement(sql.toString())){
			
			ps.setInt(1, id);
			
			try(ResultSet rs = ps.executeQuery()){
				
				if(rs.next()){
					
					reg = new Object[7];
					
					reg[0] = rs.getString(1);
					reg[1] = rs.getString(2);
					reg[2] = rs.getString(3);
					reg[3] = rs.getString(4);
					reg[4] = rs.getString(5);
					reg[5] = rs.getString(6);
					reg[6] = rs.getString(7);
 				}
				
			}catch(SQLException e){
				message = e.getMessage();
			}
			
			
		}catch(SQLException e){
			message = e.getMessage();
		}
		
		return reg;
	}

}
