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
import com.lucky.dao.DaoCronograma;
import com.lucky.dao.impl.DaoCronogramaImpl;
import com.lucky.dto.Cronograma;
import com.lucky.xml.Xml;

/**
 * Servlet implementation class CronogramaServlet
 */
@WebServlet(name = "Cronograma", urlPatterns = { "/Cronograma" })
public class CronogramaServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public CronogramaServlet() {
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
    	
    	DaoCronograma daoCronograma = new DaoCronogramaImpl();
    	List<Object[]> list = null;
    	
    	switch(accion){    		
	    	case "QRY":
	    		
	    		list = daoCronograma.cronogramaQry(1,1);
	    		
	    		if( list != null){
	    			request.setAttribute("list", list);
	    		}else{
	    			result = daoCronograma.getMessage();
	    		}
	    		
	    		target = "cronograma.jsp";
	    		break;
	    	
	    	case "QRY_02":
	    		
	    		Integer idCampania = DeString.aInteger(request.getParameter("idCampania"));
	    		Integer idPeriodo = DeString.aInteger(request.getParameter("idPeriodo"));
	    		
	    		list = daoCronograma.cronogramaQry(idCampania,idPeriodo);
	    		
	    		if(list != null){
	    			resultAux = Xml.forQry(list);
	    		}else{
	    			resultAux = Xml.forMsg(daoCronograma.getMessage());
	    		}
	    		break;
	    		
	    	/*case "INS":
	    		
	    		Cronograma cronograma = new Cronograma();
	    		
	    		CronogramaValidator validator = new CronogramaValidator();
	    		
	    		result = validator.valida(request, cronograma, false);
	    		
	    		if(result == null){
	    			result = daoCronograma.cronogramaIns(cronograma);
	    		}
	    		break;
	    	*/	
	    	/*case "UPD":
	    		
	    		cronograma = new Cronograma();
	    		validator = new CronogramaValidator();
	    		result = validator.valida(request, cronograma, true);
	    		
	    		if(result == null){
	    			result = daoCronograma.cronogramaUpd(cronograma);
	    		}
	    		break;
	    	*/	
	    	case "DEL":
	    		
	    		List<Integer> ids = DeString.ids(request.getParameter("ids"));
	    		if(ids == null){
	    			result = "Lista de (ID)s incorrecta";
	    		}else{
	    			result = daoCronograma.cronogramaDel(ids);
	    		}
	    		break;
	    	
	    	case "GET":
	    		
	    		Integer idCronograma = DeString.aInteger(request.getParameter("idCronograma"));
	    		
	    		if(idCronograma != null){
	    			Object[] reg = daoCronograma.cronogramaGet(idCronograma);
	    			
	    			if(reg != null){
	    				String[] titu = {"idCampania","nombre","descripcion","fecIni","fecFin","idFabricante","idCanal"};
	    				Object[] data = {reg[0], reg[1], reg[2], reg[3], reg[4], reg[5], reg[6]};
	    				result =  Xml.forUpd(titu,data).toString();
	    			}else{
	    				result = Xml.forMsg(daoCronograma.getMessage()).toString();
	    			}
	    		}else{
	    			result = Xml.forMsg("ID de Cronograma de Visita es Incorrecto").toString();
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
    
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request,response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request,response);
	}

}
