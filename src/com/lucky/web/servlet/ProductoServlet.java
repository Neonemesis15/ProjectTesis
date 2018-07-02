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
import com.lucky.dao.DaoProducto;
import com.lucky.dao.impl.DaoProductoImpl;
import com.lucky.dto.Producto;
//import com.lucky.web.validator.ProductoValidator;
import com.lucky.xml.Xml;


@WebServlet(name = "Producto", urlPatterns = { "/Producto" })
public class ProductoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
  
    public ProductoServlet() {
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
    	
    	DaoProducto daoProducto = new DaoProductoImpl();
    	List<Object[]> list = null;
    	
    	switch(accion){
	    	case "QRY":
	    		
	    		list = daoProducto.productoQry();
	    		
	    		if( list != null){
	    			request.setAttribute("list", list);
	    		}else{
	    			result = daoProducto.getMessage();
	    		}
	    		
	    		target = "producto.jsp";
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
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		processRequest(request,response);
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		processRequest(request,response);
	}

}
