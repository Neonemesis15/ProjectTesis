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
import com.lucky.dao.DaoPdv;
import com.lucky.dao.impl.DaoPdvImpl;
import com.lucky.dto.CampaniaPublicitaria;
import com.lucky.dto.Pdv;
import com.lucky.web.validator.CampaniaPublicitariaValidator;
import com.lucky.web.validator.PdvValidator;
import com.lucky.xml.Xml;

/**
 * Servlet implementation class PdvServlet
 */
@WebServlet(name = "Pdv", urlPatterns = { "/Pdv" })
public class PdvServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public PdvServlet() {
        super();
        // TODO Auto-generated constructor stub
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
    	
    	DaoPdv daoPdv = new DaoPdvImpl();
    	List<Object[]> list = null;
    	
    	switch(accion){  
	    	case "QRY":
	    		
	    		list = daoPdv.pdvQry();
	    		
	    		if( list != null){
	    			request.setAttribute("list", list);
	    		}else{
	    			result = daoPdv.getMessage();
	    		}
	    		
	    		target = "pdv.jsp";
	    		break;
	    		
	    	case "INS":
	    		
	    		Pdv pdv = new Pdv();
	    		
	    		PdvValidator validator = new PdvValidator();
	    		
	    		result = validator.valida(request, pdv, false);
	    		
	    		if(result == null){
	    			result = daoPdv.pdvIns(pdv);
	    		}
	    		break;
	    		
	    	case "UPD":
	    		
	    		pdv = new Pdv();
	    		validator = new PdvValidator();
	    		result = validator.valida(request, pdv, true);
	    		
	    		if(result == null){
	    			result = daoPdv.pdvUpd(pdv);
	    		}
	    		break;
	    		
	    	case "DEL":
	    		
	    		List<Integer> ids = DeString.ids(request.getParameter("ids"));
	    		if(ids == null){
	    			result = "Lista de (ID)s incorrecta";
	    		}else{
	    			result = daoPdv.pdvDel(ids);
	    		}
	    		break;
	    	
	    	case "GET":
	    		
	    		Integer idPdv = DeString.aInteger(request.getParameter("idpdv"));
	    		
	    		if(idPdv != null){
	    			Object[] reg = daoPdv.pdvGet(idPdv);
	    			
	    			if(reg != null){
	    				String[] titu = {"idPdv","razonSocial","direccion","telefono","idTipoPuntoDeVenta","idUbigeo"};
	    				Object[] data = {reg[0], reg[1], reg[2], reg[3], reg[4], reg[5]};
	    				result =  Xml.forUpd(titu,data).toString();
	    			}else{
	    				result = Xml.forMsg(daoPdv.getMessage()).toString();
	    			}
	    		}else{
	    			result = Xml.forMsg("ID de Punto de Venta Incorrecto").toString();
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
    		response.setContentType(contentType);
    		try ( PrintWriter out= response.getWriter() ){
        		if(result == null){
        			result = "";
        		}
        		out.print(result);
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
