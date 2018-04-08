package com.lucky.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import com.lucky.dao.DaoCronograma;
import com.lucky.dto.Cronograma;
import com.lucky.sql.ConectaDb;

public class DaoCronogramaImpl implements DaoCronograma {

	
	private final ConectaDb db;
	private final StringBuilder sql;
	private String message;
	
	public DaoCronogramaImpl(){
		this.db = new ConectaDb();
		this.sql = new StringBuilder();
	}
	
	@Override
	public List<Object[]> cronogramaQry() {
		List<Object[]> list = null;
		
		sql.append("SELECT ")
		.append("C.id, ")
		.append("PDV2.razonSocial pdv, ")
		.append("CONCAT(U2.nombreUsuario,' / ',P.nombres,' ', P.apellidoPaterno,' ', SUBSTRING(P.apellidoMaterno,1,1),'.') usuario, ")
		.append("CONCAT(SUBSTR(MONTHNAME(STR_TO_DATE(P2.mes, '%m')),1,3),' - ', P2.`anio`,' - ','Sem-', P2.semana) visita, ")
		.append("V.descripcion campania ")
		.append("FROM mdl_cronogramavisitas C ")
		.append("INNER JOIN mdl_puntodeventaporvisita PDV ON PDV.id = C.idPuntoDeVentaPorVisita ")
		.append("INNER JOIN mdl_usuarioporvisitadetalle U ON U.id = C.idUsuarioPorVisitaDetalle ")
		.append("INNER JOIN mdl_puntodeventa PDV2 ON PDV2.id = PDV.idPuntoDeVenta ")
		.append("INNER JOIN mdl_usuario U2 ON U2.id = U.idUsuarioAsignado ")
		.append("INNER JOIN mdl_persona P ON U2.idPersona = P.id ")
		.append("INNER JOIN mdl_visita V ON V.id = PDV.idVisita ")
		.append("INNER JOIN mdl_periodo P2 ON P2.id = V.idPeriodo ");
		
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
	public String cronogramaIns(Cronograma cronograma) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String cronogramaUpd(Cronograma cronograma) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String cronogramaDel(List<Integer> ids) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Object[]> cronogramaCbo() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object[] cronogramaGet(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getMessage() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Object[]> cronogramaQry(Integer idCampania, Integer idPeriodo) {
		List<Object[]> list = null;
		
		sql.append("SELECT ")
		.append("MIN(C.id) id, ")
		.append("CONCAT(UPPER(U2.nombreUsuario),' / ',P.nombres,' ', P.apellidoPaterno,' ', SUBSTRING(P.apellidoMaterno,1,1),'.') usuario, ")
		.append("COUNT(PDV2.razonSocial) CantPdv ")
		.append("FROM mdl_cronogramavisitas C ")
		.append("INNER JOIN mdl_puntodeventaporvisita PDV ON PDV.id = C.idPuntoDeVentaPorVisita ")
		.append("INNER JOIN mdl_usuarioporvisitadetalle U ON U.id = C.idUsuarioPorVisitaDetalle ")
		.append("INNER JOIN mdl_puntodeventa PDV2 ON PDV2.id = PDV.idPuntoDeVenta ")
		.append("INNER JOIN mdl_usuario U2 ON U2.id = U.idUsuarioAsignado ")
		.append("INNER JOIN mdl_persona P ON U2.idPersona = P.id ")
		.append("INNER JOIN mdl_visita V ON V.id = PDV.idVisita ")
		.append("INNER JOIN mdl_periodo P2 ON P2.id = V.idPeriodo ")
		.append("WHERE V.idCampaniaPublicitaria = ? ")
		.append("AND V.idPeriodo = ? ")
		.append("GROUP BY CONCAT(U2.nombreUsuario,' / ',P.nombres,' ', P.apellidoPaterno,' ', SUBSTRING(P.apellidoMaterno,1,1),'.') ");
		
		try(Connection cn = db.getConnection();
				PreparedStatement ps = cn.prepareStatement(sql.toString())
			){
			
			ps.setInt(1, idCampania);
			ps.setInt(2, idPeriodo);
			
			ResultSet rs = ps.executeQuery();
			
			list = new LinkedList<>();
			
			while(rs.next()){
				
				Object[] reg = new Object[3];
				
				reg[0] = rs.getString(1);
				reg[1] = rs.getString(2);
				reg[2] = rs.getString(3);
				
				list.add(reg);
			}
			
		} catch(SQLException e){
			message = e.getMessage();
		}
		
		return list;
	}

}
