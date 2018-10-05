package main.java.com.lucky.dao.impl;

import main.java.com.lucky.dao.DaoUsuarios;
import main.java.com.lucky.dto.Usuarios;
import main.java.com.lucky.sql.ConectaDb;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DaoUsuariosImpl implements DaoUsuarios {

    private final ConectaDb db;
    private final StringBuilder sql;
    private String message;

    public DaoUsuariosImpl() {
        db = new ConectaDb();
        this.sql = new StringBuilder();
    }

    @Override
    public Usuarios autentica(String usuario, String password) {
        Usuarios usuarios = null;
        sql.append("SELECT ")
                .append("idusuario,")
                .append("apellidos,")
                .append("nombres,")
                .append("usuario,")
                .append("autorizacion ")
                .append("FROM usuarios ")
                .append("WHERE (usuario = ?) ")
                .append("AND (AES_DECRYPT(password, 'parainfo') = ?)");

        try (Connection cn = db.getConnection();
                PreparedStatement ps
                = cn.prepareStatement(sql.toString())) {

            ps.setString(1, usuario);
            ps.setString(2, password);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    usuarios = new Usuarios();

                    usuarios.setIdusuario(rs.getInt(1));
                    usuarios.setApellidos(rs.getString(2));
                    usuarios.setNombres(rs.getString(3));
                    usuarios.setUsuario(rs.getString(4));
                    usuarios.setAutorizacion(rs.getString(5));

                } else {
                    throw new SQLException("Usuario NO registrado");
                }
            }

        } catch (SQLException e) {
            message = e.getMessage();
        }

        return usuarios;
    }

    @Override
    public String getMessage() {
        return message;
    }
}

