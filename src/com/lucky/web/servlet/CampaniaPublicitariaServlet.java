package com.lucky.web.servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.lucky.dao.DaoCampaniaPublicitaria;
import com.lucky.dao.impl.DaoCampaniaPublicitariaImpl;
import com.lucky.dto.CampaniaPublicitaria;
import com.lucky.web.validator.CampaniaPublicitariaValidator;
import com.lucky.xml.Xml;

/**
 * Servlet implementation class CampaniaPublicitariaServlet
 */
@WebServlet(name = "CampaniaPublicitaria", urlPatterns = { "/CampaniaPublicitaria" })
public class CampaniaPublicitariaServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
       

    public CampaniaPublicitariaServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    protected void processRequest(HttpServletRequest request,
    		HttpServletResponse response)
    		throws ServletException, IOException {
    	
    	request.setCharacterEncoding("UTF-8");
    	
    	String accion = request.getParameter("accion");
    	accion = (accion == null) ? "" : accion;
    	StringBuilder result;
    	
    	DaoCampaniaPublicitaria daoCampaniaPublicitaria = new DaoCampaniaPublicitariaImpl();
    	List<Object[]> list = null;
    	
    	switch(accion){
	    	case "CBO":
	    		
	    		list = daoCampaniaPublicitaria.campaniaPublicitariaCbo();
	    		
	    		if( list != null ){
	    			result = Xml.forCbo(list);
	    		}else{
	    			result = Xml.forMsg(daoCampaniaPublicitaria.getMessage());
	    		}
	    		break;
	    		
	    	case "QRY":
	    		
	    		list = daoCampaniaPublicitaria.campaniaPublicitariaQry();
	    		
	    		if( list != null){
	    			result = Xml.forQry(list);
	    		}else{
	    			result = Xml.forMsg(daoCampaniaPublicitaria.getMessage());
	    		}
	    		break;
	    		
	    	case "INS":
	    		
	    		CampaniaPublicitaria campaniaPublicitaria = new CampaniaPublicitaria();
	    		
	    		CampaniaPublicitariaValidator validator = new CampaniaPublicitariaValidator();
	    		
	    		List<String> list_msg = validator.valida(request, campaniaPublicitaria, false);
	    		
	    		if(list_msg.isEmpty()){
	    			String msg = daoCampaniaPublicitaria.campaniaPublicitariaIns(campaniaPublicitaria);
	    			result = Xml.forMsg(msg);
	    		}else{
	    			result = Xml.forMsg(list_msg);
	    		}
	    		break;
	    		
	    	case "UPD":
	    	case "DEL":
	    	case "":
    		default :
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
