package main.java.com.lucky.web.validator;


import java.sql.Date;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import main.java.com.lucky.convert.DeString;
import main.java.com.lucky.dto.CampaniaPublicitaria;

public class CampaniaPublicitariaValidator {

	public CampaniaPublicitariaValidator(){	
	}
	
	public String valida(HttpServletRequest request, CampaniaPublicitaria campaniaPublicitaria, boolean upd){
		
		StringBuilder sb = new StringBuilder("<ul>");
		
		Integer id = DeString.aInteger(request.getParameter("id"));
		String nombre = request.getParameter("nombre");
		String descripcion = request.getParameter("descripcion");
		Date fechaInicio = DeString.aDate(request.getParameter("fechaInicio"));
		Date fechaFin = DeString.aDate(request.getParameter("fechaFin"));
		Integer idFabricante = DeString.aInteger(request.getParameter("idFabricante"));
		Integer idCanal = DeString.aInteger(request.getParameter("idCanal"));
		
		if(upd && (id == null)){
			//list.add("ID Incorrecto");
			sb.append("<li>Id Campania Publicitaria incorrecto</li>");
		}
		
		if((nombre == null) && (nombre.trim().length() == 0)){
			//list.add("Ingrese el nombre de la Campania Publicitaria");
			sb.append("<li>Ingrese el nombre de la campania publicita</li>");
		}
		
		if((descripcion == null)){
			//list.add("Ingrese una descripcion para la Campania Publicitaria");
			sb.append("<li>Ingrese una descripcion para la Campania Publicitaria</li>");
		}
		
		if(fechaInicio == null){
			//list.add("Ingrese una Fecha de Inicio para la Campania Publicitaria");
			sb.append("<li>Ingrese una Fecha de Inicio para la Campania Publicitaria</li>");
		}
		
		if(fechaFin == null){
			//list.add("Ingrese una Fecha de Fin para la Campania Publicitaria");
			sb.append("<li>Ingrese una Fecha de Fin para la Campania Publicitaria</li>");
		}
		
		if(idFabricante == null){
			//list.add("Seleccione un fabricante para la Campania Publicitaria");
			sb.append("<li>Seleccione un fabricante para la Campania Publicitaria</li>");
		}
		
		if(idCanal == null){
			//list.add("Seleccione un Canal para la Campania Publicitaria");
			sb.append("<li>Seleccione un Canal para la Campania Publicitaria</li>");
		}
		
		campaniaPublicitaria.setId(id);
		campaniaPublicitaria.setNombre(nombre);
		campaniaPublicitaria.setDescripcion(descripcion);
		campaniaPublicitaria.setFechaInicio(fechaInicio);
		campaniaPublicitaria.setFechaFin(fechaFin);
		campaniaPublicitaria.fabricante.setId(idFabricante);
		campaniaPublicitaria.canal.setId(idCanal);
		
		String result = (sb.length() != 4) ? sb.append("</ul>").toString() : null;
		
		return result;
		
	}
	
}
