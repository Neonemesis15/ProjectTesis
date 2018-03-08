package com.lucky.web.validator;

import java.util.LinkedList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.lucky.convert.DeString;
import com.lucky.dto.CampaniaPublicitaria;

public class CampaniaPublicitariaValidator {

	public CampaniaPublicitariaValidator(){	
	}
	
	public List<String> valida (HttpServletRequest request,
			CampaniaPublicitaria campaniaPublicitaria, boolean upd){
		
		List<String> list = new LinkedList<>();
		
		Integer id = DeString.aInteger(request.getParameter("id"));
		String nombre = request.getParameter("nombre");
		String descripcion = request.getParameter("descripcion");
		String fechaInicio = request.getParameter("fechaInicio");
		String fechaFin = request.getParameter("fechaFin");
		Integer idFabricante = DeString.aInteger(request.getParameter("idFabricante"));
		Integer idCanal = DeString.aInteger(request.getParameter("idCanal"));
		
		if(upd && (id == null)){
			list.add("ID Incorrecto");
		}
		
		if((nombre == null) && (nombre.trim().length() == 0)){
			list.add("Ingrese el nombre de la Campania Publicitaria");
		}
		
		if((descripcion == null)){
			list.add("Ingrese una descripcion para la Campania Publicitaria");
		}
		
		if(fechaInicio == null){
			list.add("Ingrese una Fecha de Inicio para la Campania Publicitaria");
		}
		
		if(fechaFin == null){
			list.add("Ingrese una Fecha de Fin para la Campania Publicitaria");
		}
		
		if(idFabricante == null){
			list.add("Seleccione un fabricante para la Campania Publicitaria");
		}
		
		if(idCanal == null){
			list.add("Seleccione un Canal para la Campania Publicitaria");
		}
		
		campaniaPublicitaria.setId(id);
		campaniaPublicitaria.setNombre(nombre);
		campaniaPublicitaria.setDescripcion(descripcion);
		campaniaPublicitaria.setFechaInicio(fechaInicio);
		campaniaPublicitaria.setFechaFin(fechaFin);
		campaniaPublicitaria.fabricante.setId(idFabricante);
		campaniaPublicitaria.canal.setId(idCanal);
		
		return list;
		
	}
}
