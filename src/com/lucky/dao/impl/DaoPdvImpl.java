package com.lucky.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import com.lucky.dao.DaoPdv;
import com.lucky.dto.Pdv;
import com.lucky.sql.ConectaDb;

public class DaoPdvImpl implements DaoPdv {

	private final ConectaDb db;
	private final StringBuilder sql;
	private String message;
	
	public DaoPdvImpl(){
		this.db = new ConectaDb();
		this.sql = new StringBuilder();
	}
	
	@Override
	public List<Object[]> pdvQry() {
		
		List<Object[]> list = null;
		
		sql.append("SELECT ")
		.append("PDV.id, ")
		.append("PDV.razonSocial, ")
		.append("CONCAT(SUBSTR(PDV.direccion,1,40),'...') direccion, ")
		.append("PDV.telefono, ")
		.append("TPDV.nombre tipoPDV, ")
		.append("UPPER(CONCAT(SUBSTR(D.nombre,1,3),' - ',SUBSTR(PR.nombre,1,3),' - ',SUBSTR(DI.nombre,1,3))) ubigeo ")
		.append("FROM mdl_puntodeventa PDV ")
		.append("INNER JOIN mdl_tipopuntodeventa TPDV ON PDV.idTipoPuntoDeVenta = TPDV.id ")
		.append("INNER JOIN mdl_ubigeo U ON U.id = PDV.idUbigeo ")
		.append("INNER JOIN mdl_pais P ON U.idPais = P.id ")
		.append("INNER JOIN mdl_departamento D ON U.idDepartamento = D.id AND P.id = D.idPais ")
		.append("INNER JOIN mdl_provincia PR ON U.idProvincia = PR.id AND PR.idDepartamento = D.id ")
		.append("INNER JOIN mdl_distrito DI ON U.idDistrito = DI.id AND DI.idProvincia = PR.id ")
		.append("ORDER BY PDV.razonSocial ");
		
		try(Connection cn = db.getConnection();
				PreparedStatement ps = cn.prepareStatement(sql.toString());
				ResultSet rs = ps.executeQuery()){
			
			list = new LinkedList<>();
			
			while(rs.next()){
				
				Object[] reg = new Object[6];
				
				reg[0] = rs.getString(1);
				reg[1] = rs.getString(2);
				reg[2] = rs.getString(3);
				reg[3] = rs.getString(4);
				reg[4] = rs.getString(5);
				reg[5] = rs.getString(6);
				
				list.add(reg);
			}
			
		} catch(SQLException e){
			message = e.getMessage();
		}
		
		return list;
	}

	@Override
	public String pdvIns(Pdv pdv) {
		sql.append("INSERT INTO mdl_puntodeventa( ")
		.append("razonSocial, ")
		.append("direccion, ")
		.append("telefono, ")
		.append("idTipoPuntoDeVenta, ")
		.append("idUbigeo ")
		.append(") VALUES (?, ?, ?, ?, ?)");

		try(Connection cn = db.getConnection();
				PreparedStatement ps = cn.prepareStatement(sql.toString())){
			
			ps.setString(1, pdv.getRazonSocial());
			ps.setString(2, pdv.getDireccion());
			ps.setString(3, pdv.getTelefono());
			ps.setInt(4, pdv.tipoPdv.getId());
			ps.setInt(5, pdv.ubigeo.getId());
			
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
	public String pdvUpd(Pdv pdv) {

		sql.append("UPDATE mdl_puntodeventa SET ")
		.append("razonSocial = ?, ")
		.append("direccion = ?, ")
		.append("telefono = ?, ")
		.append("idTipoPuntoDeVenta = ?, ")
		.append("idUbigeo = ? ")
		.append("WHERE id = ? ");
		
		try(Connection cn = db.getConnection();
				PreparedStatement ps = cn.prepareStatement(sql.toString())){
		
			ps.setString(1, pdv.getRazonSocial());
			ps.setString(2, pdv.getDireccion());
			ps.setString(3, pdv.getTelefono());
			ps.setInt(4, pdv.tipoPdv.getId());
			ps.setInt(5, pdv.ubigeo.getId());
			ps.setInt(6, pdv.getId());
			
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
	public String pdvDel(List<Integer> ids) {
		sql.append("DELETE FROM mdl_puntodeventa WHERE id = ?");
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
	public List<Object[]> pdvCbo() {

		List<Object[]> list = null;
		
		sql.append("SELECT ")
		.append("id, ")
		.append("razonSocial ")
		.append("FROM mdl_puntodeventa ")
		.append("ORDER BY razonSocial ");
		
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
	public Object[] pdvGet(Integer id) {

		Object[] reg = null;
		
		sql.append("SELECT ")
		.append("PDV.id, ")
		.append("PDV.razonSocial, ")
		.append("PDV.direccion, ")
		.append("PDV.telefono, ")
		.append("PDV.idTipoPuntoDeVenta, ")
		.append("PDV.idUbigeo ")
		.append("FROM mdl_puntodeventa PDV ")
		.append("INNER JOIN mdl_tipopuntodeventa TPDV ON TPDV.id = PDV.idTipoPuntoDeVenta ")
		.append("INNER JOIN mdl_ubigeo U ON U.id = PDV.idUbigeo ")
		.append("WHERE PDV.id = ? ");
		
		try(Connection cn = db.getConnection();
				PreparedStatement ps = cn.prepareStatement(sql.toString())){
			
			ps.setInt(1, id);
			
			try(ResultSet rs = ps.executeQuery()){
				
				if(rs.next()){
					
					reg = new Object[6];
					
					reg[0] = rs.getString(1);
					reg[1] = rs.getString(2);
					reg[2] = rs.getString(3);
					reg[3] = rs.getString(4);
					reg[4] = rs.getString(5);
					reg[5] = rs.getString(6);
 				}
				
			}catch(SQLException e){
				message = e.getMessage();
			}
			
			
		}catch(SQLException e){
			message = e.getMessage();
		}
		
		return reg;
		
	}

	@Override
	public String getMessage() {

		return message;
		
	}

}
