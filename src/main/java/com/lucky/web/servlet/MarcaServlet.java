package main.java.com.lucky.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import main.java.com.lucky.dao.DaoMarca;
import main.java.com.lucky.dao.impl.DaoMarcaImpl;
import main.java.com.lucky.xml.Xml;

/**
 * Servlet implementation class MarcaServlet
 */
@WebServlet(name = "Marca", urlPatterns = { "/Marca" })
public class MarcaServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void processRequest(HttpServletRequest request, 
			HttpServletResponse response)throws ServletException, IOException{
		request.setCharacterEncoding("UTF-8");
		String accion = request.getParameter("accion");
		accion = (accion == null) ? "" : accion;
		StringBuilder result;
		
		DaoMarca daoMarca = new DaoMarcaImpl();
		switch(accion){
		case "QRY":
			List<Object[]> list = daoMarca.marcaQry();
			if(list != null){
				result = Xml.forQry(list);
			}else{
				result = Xml.forMsg(daoMarca.getMessage());
			}
			break;
		case "":
			result = Xml.forMsg("Solicitud requerida");
			break;
		default :
			result = Xml.forMsg("Solicitud no reconocida");
		}
		
		response.setContentType("text/xml;charset=UTF-8");
		try(PrintWriter out = response.getWriter()){
			out.print(result);
		}

		
	}

    public MarcaServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    @Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
    	processRequest(request, response);
	}

    @Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//doGet(request, response);
    	processRequest(request, response);
	}

}
