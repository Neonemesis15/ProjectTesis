package com.lucky.web.validator;

import java.sql.Date;
import java.util.LinkedList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import com.lucky.convert.DeString;
import com.lucky.dto.Ubigeo;

public class UbigeoValidator {

	public List<String> valida(HttpServletRequest request, Ubigeo ubigeo, boolean upd) {
		List<String> list = new LinkedList<>();
		
        Integer idubigeo = DeString.aInteger(request.getParameter("id"));
        Integer idPais = DeString.aInteger(request.getParameter("idPais"));
        Integer idDepartamento = DeString.aInteger(request.getParameter("idDepartamento"));
        Integer idProvincia = DeString.aInteger(request.getParameter("idProvincia"));
        Integer idDistrito = DeString.aInteger(request.getParameter("idDistrito"));
        String codigo = request.getParameter("codigo");
        
        if (upd && (idubigeo == null)) {
            list.add("ID incorrecto");
        }
        
        if ((idPais == null)) {
            list.add("ingrese nombre de Pais");
        }
        
        if ((idDepartamento == null)) {
            list.add("ingrese nombre de Departamento");
        }
        
        if ((idProvincia == null)) {
            list.add("ingrese nombre de Provincia");
        }
        
        if ((idDistrito == null)) {
            list.add("ingrese nombre de Distrito");
        }
        
        ubigeo.setCodigo(codigo);
        ubigeo.pais.setId(idPais);
        ubigeo.departamento.setId(idDepartamento);
        ubigeo.provincia.setId(idProvincia);
        ubigeo.distrito.setId(idDistrito);
        
        return list;
	}
}
