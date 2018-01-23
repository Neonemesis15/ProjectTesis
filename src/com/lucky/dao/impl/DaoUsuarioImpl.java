package com.lucky.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import com.lucky.dao.DaoUsuario;
import com.lucky.dto.Usuario;
import com.lucky.sql.ConectaDb;

public class DaoUsuarioImpl implements DaoUsuario {

    private final ConectaDb db;
    private final StringBuilder sql;
    private String message;
	
    public DaoUsuarioImpl(){
        this.db = new ConectaDb();
        this.sql = new StringBuilder();
    }
    
	@Override
	public List<Object[]> usuarioQry() {
		List<Object[]> list = null;
        sql.append("SELECT u.id, ")
        .append("u.nombreUsuario, ")
        .append("CONCAT(p.apellidoPaterno,' ', ")
        .append("p.apellidoMaterno,', ', ")
        .append("p.nombres,' (', date_format(p.fechaNacimiento,'%d/%m/%Y'),')'), ")
        .append("f.nombre ")
        .append("FROM mdl_usuario u ")
        .append("INNER JOIN mdl_persona p ")
        .append("ON u.idPersona = p.id ")
        .append("INNER JOIN mdl_perfil f ")
        .append("ON u.idPerfil = f.id ");

		try (Connection cn = db.getConnection();
		        PreparedStatement ps = cn.prepareStatement(sql.toString());
		        ResultSet rs = ps.executeQuery()) {
		
		    list = new LinkedList<>();
		    while (rs.next()) {
		        Object[] reg = new Object[5];
		
		        reg[0] = rs.getInt(1);
		        reg[1] = rs.getString(2);
		        reg[2] = rs.getString(3);
		        reg[3] = rs.getString(4);
		        
		        list.add(reg);
		    }
		
		} catch (SQLException e) {
		    message = e.getMessage();
		}
		
		return list;
	}

	@Override
	public String usuarioIns(Usuario usuario) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String usuarioDel(List<Integer> ids) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object[] usuarioGet(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String usuarioUpd(Usuario usuario) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getMessage() {
		return message;
	}

}
