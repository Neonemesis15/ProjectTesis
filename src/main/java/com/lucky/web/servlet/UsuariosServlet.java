package main.java.com.lucky.web.servlet;

import main.java.com.lucky.dao.DaoUsuarios;
import main.java.com.lucky.dao.impl.DaoUsuariosImpl;
import main.java.com.lucky.dto.Usuarios;
import main.java.com.lucky.web.validator.UsuariosValidator;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "UsuariosServlet", urlPatterns = {"/Usuarios"})
public class UsuariosServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

	protected void processRequest(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        String accion = request.getParameter("accion");
        accion = (accion == null) ? "" : accion;
        String result = null;
        String target = null;
        List<String> message = new LinkedList<>();
        //
        DaoUsuarios daoUsuarios = new DaoUsuariosImpl();

        switch (accion) {
            case "LOGIN":
                Usuarios usuarios = new Usuarios();
                UsuariosValidator validator = new UsuariosValidator();
                message = validator.valida(request, usuarios);

                if (message.isEmpty()) {
                    usuarios = daoUsuarios.autentica(
                            usuarios.getUsuario(), usuarios.getPassword());

                    if (usuarios == null) {
                        result = daoUsuarios.getMessage();
                    }
                }

                if (message.isEmpty() && (usuarios != null)) {
                    final String ID = request.getSession().getId();
                    request.getSession().setAttribute("ID", ID);
                    request.getSession().setAttribute("usuarios", usuarios);
                    request.getSession().setAttribute(
                            "autorizacion", usuarios.getAutorizacion());

                    if (usuarios.getAutorizacion().equals("ADMIN")) {
                        target = "index2.jsp";
                        
                    } else if (usuarios.getAutorizacion().equals("CLIENT")) {
                        target = "index2.jsp";
                    } else if (usuarios.getAutorizacion().equals("SUPER")) {
                        target = "index4.jsp";
                    } else if (usuarios.getAutorizacion().equals("REPORT")) {
                        target = "index5.jsp";
                    }
                    

                } else {
                    request.setAttribute("usuarios", usuarios);
                }
                break;

            case "LOGOUT":
                request.getSession().invalidate();
                target = "view/";
                break;

            case "":
                result = "Solicitud requerida";
                break;

            default:
                result = "Solicitud no reconocida";
        }

        if (result != null) {
            message.add(result);
        }

        if (!message.isEmpty()) {
            request.setAttribute("msg", message);
        }

        if (target == null) {
            RequestDispatcher dispatcher
                    = request.getRequestDispatcher("index.jsp");
            dispatcher.forward(request, response);

        } else {
            response.sendRedirect(target);
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

