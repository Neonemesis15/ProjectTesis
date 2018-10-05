package main.java.com.lucky.web.servlet;

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

import main.java.com.lucky.convert.DeString;
import main.java.com.lucky.dao.DaoTutoriales;
import main.java.com.lucky.dao.impl.DaoTutorialesImpl;
import main.java.com.lucky.dto.Tutoriales;
import main.java.com.lucky.web.validator.TutorialesValidator;
import main.java.com.lucky.xml.Xml;

@WebServlet(name = "TutorialesServlet", urlPatterns = {"/Tutoriales"})
public class TutorialesServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

	protected void processRequest(HttpServletRequest request, 
            HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
        String contentType = "text/html;charset=UTF-8";

        String accion = request.getParameter("accion");
        accion = (accion == null) ? "" : accion;
        String result = null;
        String target = null;
        //
        DaoTutoriales daoTutoriales = new DaoTutorialesImpl();

        switch (accion) {
            case "QRY":
                List<Tutoriales> list = daoTutoriales.tutorialesQry();

                if (list != null) {
                    request.setAttribute("list", list);
                } else {
                    result = daoTutoriales.getMessage();
                }

                target = "tutoriales.jsp";
                break;

            case "INS":
                Tutoriales tutoriales = new Tutoriales();
                TutorialesValidator validator = 
                        new TutorialesValidator();
                result = validator.valida(request, tutoriales, "INS");

                if (result == null) {
                    result = daoTutoriales.tutorialesIns(tutoriales);
                }
                break;

            case "DEL":
                List<Integer> ids
                        = DeString.ids(request.getParameter("ids"));

                if (ids == null) {
                    result = "Lista de ID(s) incorrecta";
                } else {
                    result = daoTutoriales.tutorialesDel(ids);
                }
                break;

            case "GET":
                Integer idtutorial
                        = DeString.aInteger(
                                request.getParameter("idtutorial"));

                if (idtutorial != null) {
                    tutoriales = daoTutoriales.tutorialesGet(idtutorial);

                    if (tutoriales != null) {
                        Object[] til = {
                            "idtutorial_upd", 
                            "titulo_upd",
                            "tipo_upd", 
                            "precio_upd"
                        };
                        Object[] dat = {
                            tutoriales.getIdtutorial(), 
                            tutoriales.getTitulo(),
                            tutoriales.getTipo(), 
                            tutoriales.getPrecio()
                        };

                        List<Object[]> lget = new LinkedList<>();
                        lget.add(til);
                        lget.add(dat);

                        Xml xml = new Xml();
                        result = xml.toXml(lget).toString();
                        contentType = "text/xml;charset=UTF-8";
                    }
                }
                break;

            case "UPD":
                tutoriales = new Tutoriales();
                validator = new TutorialesValidator();
                result = validator.valida(request, tutoriales, "UPD");

                if (result == null) {
                    result = daoTutoriales.tutorialesUpd(tutoriales);
                }
                break;

            case "":
                result = "Solicitud requerida";
                break;

            default:
                result = "Solicitud no reconocida";
        }

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
}

