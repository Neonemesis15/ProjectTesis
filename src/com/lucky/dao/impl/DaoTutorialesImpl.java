package com.lucky.dao.impl;

import com.lucky.dao.DaoTutoriales;
import com.lucky.dto.Tutoriales;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;
import com.lucky.sql.ConectaDb;

public class DaoTutorialesImpl implements DaoTutoriales {

    private final ConectaDb db;
    private final StringBuilder sql;
    private String message;

    public DaoTutorialesImpl() {
        this.db = new ConectaDb();
        this.sql = new StringBuilder();
    }

    @Override
    public List<Tutoriales> tutorialesQry() {
        List<Tutoriales> list = null;
        sql.append("SELECT ")
                .append("idtutorial,")
                .append("titulo,")
                .append("tipo,")
                .append("precio ")
                .append("FROM tutoriales");

        try (Connection cn = db.getConnection();
                PreparedStatement ps = cn.prepareStatement(sql.toString());
                ResultSet rs = ps.executeQuery()) {

            list = new LinkedList<>();
            while (rs.next()) {
                Tutoriales p = new Tutoriales();

                p.setIdtutorial(rs.getInt(1));
                p.setTitulo(rs.getString(2));
                p.setTipo(rs.getString(3));
                p.setPrecio(rs.getDouble(4));

                list.add(p);
            }

        } catch (SQLException e) {
            message = e.getMessage();
        }

        return list;
    }

    @Override
    public String tutorialesIns(Tutoriales tutoriales) {
        sql.append("INSERT INTO tutoriales(")
                .append("titulo,")
                .append("tipo,")
                .append("precio")
                .append(") VALUES(?,?,?)");

        try (Connection cn = db.getConnection();
                PreparedStatement ps = cn.prepareStatement(sql.toString())) {

            ps.setString(1, tutoriales.getTitulo());
            ps.setString(2, tutoriales.getTipo());
            ps.setDouble(3, tutoriales.getPrecio());

            int ctos = ps.executeUpdate();
            if (ctos == 0) {
                throw new SQLException("0 filas afectadas");
            }

        } catch (SQLException e) {
            message = e.getMessage();
        }

        return message;
    }

    @Override
    public String tutorialesDel(List<Integer> ids) {
        sql.append("DELETE FROM tutoriales WHERE idtutorial=?");

        try (Connection cn = db.getConnection();
                PreparedStatement ps = 
                        cn.prepareStatement(sql.toString())) {

            cn.setAutoCommit(false); // desactiva autoCommit
            boolean ok = true;

            for (Integer x : ids) {
                ps.setInt(1, x);
                
                int ctos = ps.executeUpdate();
                if (ctos == 0) {
                    ok = false;
                    message = "ID recibido no existe";
                    break;
                }
            }

            if (ok) {
                cn.commit();
            } else {
                cn.rollback();
            }

            cn.setAutoCommit(true); // activa autoCommit

        } catch (SQLException e) {
            message = e.getMessage();
        }

        return message;
    }

    @Override
    public Tutoriales tutorialesGet(Integer idtutorial) {
        Tutoriales tutoriales = null;
        sql.append("SELECT ")
                .append("idtutorial,")
                .append("titulo,")
                .append("tipo,")
                .append("precio ")
                .append("FROM tutoriales ")
                .append("WHERE idtutorial=?");

        try (Connection cn = db.getConnection();
                PreparedStatement ps = cn.prepareStatement(sql.toString())) {

            ps.setInt(1, idtutorial);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    tutoriales = new Tutoriales();

                    tutoriales.setIdtutorial(rs.getInt(1));
                    tutoriales.setTitulo(rs.getString(2));
                    tutoriales.setTipo(rs.getString(3));
                    tutoriales.setPrecio(rs.getDouble(4));

                } else {
                    throw new SQLException("ID: " + idtutorial + " no existe");
                }
            }

        } catch (SQLException e) {
            message = e.getMessage();
        }

        return tutoriales;
    }

    @Override
    public String tutorialesUpd(Tutoriales tutoriales) {
        sql.append("UPDATE tutoriales SET ")
                .append("titulo=?,")
                .append("tipo=?,")
                .append("precio=? ")
                .append("WHERE idtutorial=?");

        try (Connection cn = db.getConnection();
                PreparedStatement ps = cn.prepareStatement(sql.toString())) {

            ps.setString(1, tutoriales.getTitulo());
            ps.setString(2, tutoriales.getTipo());
            ps.setDouble(3, tutoriales.getPrecio());
            ps.setInt(4, tutoriales.getIdtutorial());

            int ctos = ps.executeUpdate();
            if (ctos == 0) {
                throw new SQLException("0 filas afectadas");
            }

        } catch (SQLException ex) {
            message = ex.getMessage();
        }

        return message;
    }

    @Override
    public String getMessage() {
        return message;
    }

}

