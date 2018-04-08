package com.lucky.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.lucky.convert.DeString;
import com.lucky.dao.DaoCampaniaPublicitaria;
import com.lucky.dao.impl.DaoCampaniaPublicitariaImpl;
import com.lucky.dto.CampaniaPublicitaria;
import com.lucky.web.validator.CampaniaPublicitariaValidator;
import com.lucky.xml.Xml;

@WebServlet(name = "CampaniaPublicitaria", urlPatterns = { "/CampaniaPublicitaria" })
public class CampaniaPublicitariaServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
       

    public CampaniaPublicitariaServlet() {
        super();
    }

    protected void processRequest(HttpServletRequest request,
    		HttpServletResponse response)
    		throws ServletException, IOException {
    	
    	String contentType = "text/html;charset=UTF-8";
    	request.setCharacterEncoding("UTF-8");
    	
    	String accion = request.getParameter("accion");
    	accion = (accion == null) ? "" : accion;
    	String result = null;
    	String target = null;
    	StringBuilder resultAux = null;
    	
    	DaoCampaniaPublicitaria daoCampaniaPublicitaria = new DaoCampaniaPublicitariaImpl();
    	List<Object[]> list = null;
    	
    	switch(accion){
        	case "CBO":
	            list = daoCampaniaPublicitaria.campaniaPublicitariaCbo();
	        	
	            if (list != null) {
	            	resultAux = Xml.forCbo(list);
	
	            } else {
	            	resultAux = Xml.forMsg(daoCampaniaPublicitaria.getMessage());
	                response.setContentType("text/xml;charset=UTF-8");
	            }
	            break;
	            
	    	case "QRY":
	    		
	    		list = daoCampaniaPublicitaria.campaniaPublicitariaQry();
	    		
	    		if( list != null){
	    			request.setAttribute("list", list);
	    		}else{
	    			result = daoCampaniaPublicitaria.getMessage();
	    		}
	    		
	    		target = "campana.jsp";
	    		break;
	    		
	    	case "INS":
	    		
	    		CampaniaPublicitaria campaniaPublicitaria = new CampaniaPublicitaria();
	    		
	    		CampaniaPublicitariaValidator validator = new CampaniaPublicitariaValidator();
	    		
	    		result = validator.valida(request, campaniaPublicitaria, false);
	    		
	    		if(result == null){
	    			result = daoCampaniaPublicitaria.campaniaPublicitariaIns(campaniaPublicitaria);
	    		}
	    		break;
	    		
	    	case "UPD":
	    		
	    		campaniaPublicitaria = new CampaniaPublicitaria();
	    		validator = new CampaniaPublicitariaValidator();
	    		result = validator.valida(request, campaniaPublicitaria, true);
	    		
	    		if(result == null){
	    			result = daoCampaniaPublicitaria.campaniaPublicitariaUpd(campaniaPublicitaria);
	    		}
	    		break;
	    		
	    	case "DEL":
	    		
	    		List<Integer> ids = DeString.ids(request.getParameter("ids"));
	    		if(ids == null){
	    			result = "Lista de (ID)s incorrecta";
	    		}else{
	    			result = daoCampaniaPublicitaria.campaniaPublicitariaDel(ids);
	    		}
	    		break;
	    	
	    	case "GET":
	    		
	    		Integer idCampania = DeString.aInteger(request.getParameter("idCampania"));
	    		
	    		if(idCampania != null){
	    			Object[] reg = daoCampaniaPublicitaria.campaniaPublicitariaGet(idCampania);
	    			
	    			if(reg != null){
	    				String[] titu = {"idCampania","nombre","descripcion","fecIni","fecFin","idFabricante","idCanal"};
	    				Object[] data = {reg[0], reg[1], reg[2], reg[3], reg[4], reg[5], reg[6]};
	    				result =  Xml.forUpd(titu,data).toString();
	    			}else{
	    				result = Xml.forMsg(daoCampaniaPublicitaria.getMessage()).toString();
	    			}
	    		}else{
	    			result = Xml.forMsg("ID de Campania Publicitaria Incorrecto").toString();
	    		}
	    		contentType = "text/xml;charset=UTF-8";
	    		break;
	    		
	    	case "":
	    		result = "Solicitud requerida";
	    		break;
    		
	    	default :
	    		result = "Solicitud desconocida";
    	}
    	
    	if(target == null){
    		if(resultAux == null){
	    		response.setContentType(contentType);
	    		try ( PrintWriter out= response.getWriter() ){
	        		if(result == null){
	        			result = "";
	        		}
	        		out.print(result);
	        	}
    		}else{
    			response.setContentType("text/xml;charset=UTF-8");
    	        try (PrintWriter out = response.getWriter()) {
    	            out.print(resultAux);
    	        }
    		}
    		
    	}else{
    		if(result != null){
    			request.setAttribute("msg", result);
    		}
    		RequestDispatcher dispatcher = request.getRequestDispatcher(target);
    		dispatcher.forward(request, response);
    	}
    	
    }

	protected void doGet(HttpServletRequest request, 
			HttpServletResponse response) 
			throws ServletException, IOException {
		processRequest(request,response);
	}


	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) 
			throws ServletException, IOException {
		processRequest(request,response);
	}

}
