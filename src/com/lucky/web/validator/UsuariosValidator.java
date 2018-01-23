package com.lucky.web.validator;

import com.lucky.dto.Usuarios;
import java.util.LinkedList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

/**
 * @author psalas17
 */
public class UsuariosValidator {

    public UsuariosValidator() {
    }

    /**
     * @param request
     * @param usuarios para encapsular datos
     * @return lista de ingresos incorrectos
     */
    public List<String> valida(
            HttpServletRequest request, 
            Usuarios usuarios) {
        List<String> list = new LinkedList<>();

        String usuario = request.getParameter("usuario");
        String password = request.getParameter("password");

        if ((usuario == null) || (usuario.trim().length() == 0)) {
            list.add("Ingrese Usuario");
        }

        if ((password == null) || (password.trim().length() == 0)) {
            list.add("Ingrese Password");
        }

        usuarios.setUsuario(usuario);
        usuarios.setPassword(password);

        return list;
    }
}

