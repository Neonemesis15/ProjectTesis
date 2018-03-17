package com.lucky.web.validator;

import java.sql.Date;
import java.util.LinkedList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

import com.lucky.convert.DeString;
import com.lucky.dto.Fabricante;

public class FabricanteValidator {

	
	public FabricanteValidator(){
	}
	
    public List<String> valida(HttpServletRequest request, 
            Fabricante fabricante, boolean upd) {
        
        List<String> list = new LinkedList<>();

        Integer idfabricante
                = DeString.aInteger(request.getParameter("id"));
        String nombre = request.getParameter("nombre");
        String descripcion = request.getParameter("descripcion");

        if (upd && (idfabricante == null)) {
            list.add("ID incorrecto");
        }

        if ((nombre == null) || (nombre.trim().length() == 0)) {
            list.add("ingrese nombre del Fabricantes");
        }
        
        if ((descripcion == null) || (descripcion.trim().length() == 0)) {
            list.add("ingrese descripcion del Fabricante");
        }
        

        fabricante.setId(idfabricante);
        fabricante.setNombre(nombre);
        fabricante.setDescripcion(descripcion);

        return list;
    }
	
}
