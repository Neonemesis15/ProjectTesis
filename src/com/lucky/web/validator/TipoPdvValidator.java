package com.lucky.web.validator;

import java.util.LinkedList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

import com.lucky.convert.DeString;
import com.lucky.dto.TipoPdv;

public class TipoPdvValidator {

    public List<String> valida(HttpServletRequest request,  TipoPdv tipoPdv, boolean upd) {
    	
    	List<String> list = new LinkedList<>();
        
    	Integer idtipoPdv = DeString.aInteger(request.getParameter("id"));
		String nombre = request.getParameter("nombre");
		String descripcion = request.getParameter("descripcion");
		
        if (upd && (idtipoPdv == null)) {
            list.add("ID incorrecto");
        }
        
        if ((nombre == null) || (nombre.trim().length() == 0)) {
            list.add("Ingrese Nombre del Tipo de Pdv");
        }
        
        if ((descripcion == null) || (descripcion.trim().length() == 0)) {
            list.add("Ingrese Descripcion del Tipo de Pdv");
        }
        
        tipoPdv.setId(idtipoPdv);
        tipoPdv.setNombre(nombre);
        tipoPdv.setNombre(nombre);
        
        return list;
        
    }
}
