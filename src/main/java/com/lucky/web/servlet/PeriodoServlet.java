package main.java.com.lucky.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import main.java.com.lucky.convert.DeString;
import main.java.com.lucky.dao.DaoCanal;
import main.java.com.lucky.dao.DaoPeriodo;
import main.java.com.lucky.dao.impl.DaoCanalImpl;
import main.java.com.lucky.dao.impl.DaoPeriodoImpl;
import main.java.com.lucky.xml.Xml;


@WebServlet(name = "Periodo", urlPatterns = { "/Periodo" })
public class PeriodoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public PeriodoServlet() {
        super();
        
    }

    protected void processRequest(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {
        String accion = request.getParameter("accion");
        accion = (accion == null) ? "" : accion;
        StringBuilder result;
        //
        DaoPeriodo daoPeriodo = new DaoPeriodoImpl();
        switch (accion) {
	        case "CBO":
	            List<Object[]> list = daoPeriodo.periodoCbo();
	
	            if (list != null) {
	                result = Xml.forCbo(list);
	
	            } else {
	                result = Xml.forMsg(daoPeriodo.getMessage());
	            }
	            break;
	            
	        case "CBO_02":
	        	Integer idCampania = DeString.aInteger(request.getParameter("idCampania"));
	        	
	        	list = daoPeriodo.periodoCbo(idCampania);
	        	
	            if (list != null) {
	                result = Xml.forCbo(list);
	
	            } else {
	                result = Xml.forMsg(daoPeriodo.getMessage());
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

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

}
