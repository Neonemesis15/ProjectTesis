package com.lucky.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.lucky.dao.DaoPersona;
import com.lucky.dao.impl.DaoPersonaImpl;
import com.lucky.xml.Xml;

/**
 * Servlet implementation class PersonaServlet
 */
@WebServlet(name = "Persona", urlPatterns = { "/Persona" })
public class PersonaServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    protected void processRequest(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {
    	request.setCharacterEncoding("UTF-8");
    	String accion = request.getParameter("accion");
    	accion = (accion == null) ? "" : accion;
    	StringBuilder result;
    	//
    	DaoPersona daoPersona = new DaoPersonaImpl();
    	
    	switch (accion) {
        case "CBO":
            List<Object[]> list = daoPersona.personaCbo();

            if (list != null) {
                result = Xml.forCbo(list);

            } else {
                result = Xml.forMsg(daoPersona.getMessage());
            }
            break;
            
        case "QRY":
        	list = daoPersona.personaQry();
        	
        	if(list != null){
        		result = Xml.forQry(list);
        	}else{
        		result = Xml.forMsg(daoPersona.getMessage());
        	}
        	break;
        	
        case "":
            result = Xml.forMsg("Solicitud requerida");
            break;

        default:
            result = Xml.forMsg("Solicitud no reconocida");
    	}
    	
        response.setContentType("text/xml;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            out.print(result);
        }
    }


    @Override
    protected void doGet(HttpServletRequest request, 
    		HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, 
    		HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

}
