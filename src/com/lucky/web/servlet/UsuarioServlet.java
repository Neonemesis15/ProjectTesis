package com.lucky.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.lucky.dao.DaoUsuario;
import com.lucky.dao.impl.DaoUsuarioImpl;

/**
 * Servlet implementation class UsuarioServlet
 */
@WebServlet(name = "Usuario", urlPatterns = { "/Usuario" })
public class UsuarioServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
      
	protected void processRequest (HttpServletRequest request, 
					HttpServletResponse response) 
					throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		String contentType = "text/html;charset=UTF-8";
		
		String accion = request.getParameter("accion");
		accion = (accion == null) ? "" : accion;
		String result = null;
		String target = null;
		// -- <I REQ100> -- Switch Case When ...
		DaoUsuario daoUsuario = new DaoUsuarioImpl(); 
		switch(accion){
		case "QRY":
			List<Object[]> list = daoUsuario.usuarioQry();
			if(list != null){
				request.setAttribute("list", list);
			}else{
				result = daoUsuario.getMessage();
			}
			target = "usuario.jsp";
			break;
        case "":
            result = "Solicitud requerida";
            break;

        default:
            result = "Solicitud no reconocida";
		}
		// -- <F REQ100>
        if (target == null) {
            response.setContentType(contentType);
            try (PrintWriter out = response.getWriter()) {
                if (result == null) {
                    result = "";
                }

                out.print(result);
            }

        } else {
            if (result != null) {
                request.setAttribute("msg", result);
            }

            RequestDispatcher dispatcher = 
                    request.getRequestDispatcher(target);
            dispatcher.forward(request, response);
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
    
	/*
	public UsuarioServlet() {
        super();
        // TODO Auto-generated constructor stub
    }
    */
    /*
	protected void doGet(HttpServletRequest request, 
			HttpServletResponse response) 
					throws ServletException, IOException {
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}
	*/
	/*
	protected void doPost(HttpServletRequest request, 
			HttpServletResponse response) 
					throws ServletException, IOException {

		doGet(request, response);
	}
	*/

}