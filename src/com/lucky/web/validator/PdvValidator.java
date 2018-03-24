package com.lucky.web.validator;

import java.sql.Date;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.lucky.convert.DeString;
import com.lucky.dto.Pdv;

public class PdvValidator {
	
	public String valida(HttpServletRequest request, Pdv pdv, boolean upd){
		
		StringBuilder sb = new StringBuilder("<ul>");
		
		Integer id = DeString.aInteger(request.getParameter("id"));
		String razonSocial = request.getParameter("razonSocial");
		String direccion = request.getParameter("direccion");
		String telefono = request.getParameter("telefono");
		Integer idTipoPuntoDeVenta = DeString.aInteger(request.getParameter("idTipoPuntoDeVenta"));
		Integer idUbigeo = DeString.aInteger(request.getParameter("idUbigeo"));
		
		if(upd && (id == null)){
			sb.append("<li>Id Punto de Venta incorrecto</li>");
		}
		
		if((razonSocial == null) && (razonSocial.trim().length() == 0)){
			sb.append("<li>Ingrese la Razón Social del Punto de Venta</li>");
		}
		
		if((direccion == null) && (direccion.trim().length() == 0)){
			sb.append("<li>Ingrese la Dirección del Punto de Venta</li>");
		}
		
		if((idTipoPuntoDeVenta == null)){
			sb.append("<li>Ingrese el Tipo del Punto de Venta</li>");
		}
		
		if((idUbigeo == null)){
			sb.append("<li>Ingrese el Ubigeo del Punto de Venta</li>");
		}
		
		pdv.setId(id);
		pdv.setRazonSocial(razonSocial);
		pdv.setDireccion(direccion);
		pdv.setTelefono(telefono);
		pdv.tipoPdv.setId(idTipoPuntoDeVenta);
		pdv.ubigeo.setId(idUbigeo);
		
		String result = (sb.length() != 4) ? sb.append("</ul>").toString() : null;
		
		return result;
		
	}

}
