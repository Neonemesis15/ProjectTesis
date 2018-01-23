package com.lucky.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.lucky.dao.DaoFabricante;
import com.lucky.dao.impl.DaoFabricanteImpl;
import com.lucky.xml.Xml;

/**
 * Servlet implementation class FabricanteServlet
 */
@WebServlet(name = "Fabricante", urlPatterns = { "/Fabricante" })
public class FabricanteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	
	protected void processRequest(HttpServletRequest request, 
			HttpServletResponse response) throws ServletException, IOException{
		request.setCharacterEncoding("UTF-8");
		String accion = request.getParameter("accion");
		accion = (accion == null)? "" : accion;
		StringBuilder result;
		//
		
		DaoFabricante daoFabricante = new DaoFabricanteImpl();
		switch(accion){
		case "QRY":
			List<Object[]> list = daoFabricante.fabricanteQry();
			if(list != null){
				result = Xml.forQry(list);
			}else{
				result = Xml.forMsg(daoFabricante.getMessage());
			}
			break;
		case "":
			result = Xml.forMsg("Solicitud Requerida");
			break;
		default:
			result = Xml.forMsg("Solicitud no reconocida");
		}
		
		response.setContentType("text/xml;charset=UTF-8");
		try(PrintWriter out = response.getWriter()){
			out.print(result);
		}
	}
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    /*public FabricanteServlet() {
        super();
        // TODO Auto-generated constructor stub
    }*/

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
