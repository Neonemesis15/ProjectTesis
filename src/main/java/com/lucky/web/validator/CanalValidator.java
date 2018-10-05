package main.java.com.lucky.web.validator;


import java.sql.Date;
import java.util.LinkedList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

import main.java.com.lucky.convert.DeString;
import main.java.com.lucky.dto.Canal;


public class CanalValidator {

    public CanalValidator() {
    }

    public List<String> valida(HttpServletRequest request, 
            Canal canal, boolean upd) {
        
        List<String> list = new LinkedList<>();

        Integer idcanal
                = DeString.aInteger(request.getParameter("id"));
        String nombre = request.getParameter("nombre");
        String descripcion = request.getParameter("descripcion");

        if (upd && (idcanal == null)) {
            list.add("ID incorrecto");
        }

        if ((nombre == null) || (nombre.trim().length() == 0)) {
            list.add("ingrese nombre de Canal");
        }
        
        if ((descripcion == null) || (descripcion.trim().length() == 0)) {
            list.add("ingrese descripcion de Canal");
        }
        

        canal.setId(idcanal);
        canal.setNombre(nombre);
        canal.setDescripcion(descripcion);

        return list;
    }
    
}
