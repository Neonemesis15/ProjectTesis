package main.java.com.lucky.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import main.java.com.lucky.dao.DaoClasificacion;
import main.java.com.lucky.dao.impl.DaoClasificacionImpl;
import main.java.com.lucky.xml.Xml;

/**
 * Servlet implementation class ClasificacionServlet
 */
@WebServlet(name = "Clasificacion", urlPatterns = { "/Clasificacion" })
public class ClasificacionServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

	protected void processRequest(HttpServletRequest request, 
			HttpServletResponse response) throws ServletException, IOException {
		
		request.setCharacterEncoding("UTF-8");
		
		String accion = request.getParameter("accion");
		accion = (accion == null) ? "" : accion;
		String result = null;
		String target = null;
		String contentType = "text/html;charset=UTF-8";
		//StringBuilder result;
		//
		DaoClasificacion daoClasificacion = new DaoClasificacionImpl();
		
		switch(accion){
		case "QRY":
			List<Object[]> list = daoClasificacion.clasificacionQry();
			if(list != null){
				request.setAttribute("list", list);
			}else{
				result = daoClasificacion.getMessage();
			}
			target = "clasificacion.jsp";
			break;
		case "":
			result = "Solicitud requerida";
			break;
		default:
			result = "Solicitud no reconocida";
		}
		
		//
		
		if(target == null){
			response.setContentType(contentType);
			try(PrintWriter out = response.getWriter()){
				if(result == null){
					result = "";
				}
				out.print(result);
			}
		} else {
			if(result != null){
				request.setAttribute("msg", result);
			}
			RequestDispatcher dispatcher = request.getRequestDispatcher(target);
			dispatcher.forward(request, response);
		}
		
		
		/*
		switch(accion){
		case "QRY":
			List<Object[]> list = daoClasificacion.clasificacionQry();
			if(list != null){
				result = Xml.forQry(list);
			} else {
				result = Xml.forMsg(daoClasificacion.getMessage());
			}
			break;
        
		default:
            result = Xml.forMsg("Solicitud no reconocida");
		}
		
		response.setContentType("text/xml;charset=UTF-8");
		try(PrintWriter out = response.getWriter()){
			out.print(result);
		}
		*/
		
	}
	
    public ClasificacionServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    @Override
	protected void doGet(HttpServletRequest request, 
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		processRequest(request, response);
	}

    @Override
	protected void doPost(HttpServletRequest request, 
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//doGet(request, response);
		processRequest(request, response);
	}

}
