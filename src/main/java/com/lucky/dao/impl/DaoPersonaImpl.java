package main.java.com.lucky.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import main.java.com.lucky.dao.DaoPersona;
import main.java.com.lucky.sql.ConectaDb;

public class DaoPersonaImpl implements DaoPersona {

    private final ConectaDb db;
    private final StringBuilder sql;
    private String message;
    
    public DaoPersonaImpl(){
        this.db = new ConectaDb();
        this.sql = new StringBuilder();
    }
    
	@Override
	public List<Object[]> personaCbo() {
        List<Object[]> list = null;
        sql.append("SELECT p.id, ")
                .append("CONCAT(p.apellidoPaterno,' ', ")
                .append("p.apellidoMaterno,', ', ")
                .append("p.nombres) ")
                .append("FROM mdl_persona p ")
                .append("ORDER BY p.apellidoPaterno ");

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
	public List<Object[]> personaQry() {
		List<Object[]> list = null;
		sql.append("SELECT p.nombres, ")
		.append("p.apellidoPaterno, ")
		.append("p.apellidoMaterno, ")
		.append("p.fechaNacimiento, ")
		.append("p.telefono ")
		.append("FROM mdl_persona p ")
		.append("ORDER BY p.apellidoPaterno ");
		
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
