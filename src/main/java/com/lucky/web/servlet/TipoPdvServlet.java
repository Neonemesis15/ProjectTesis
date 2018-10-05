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
import main.java.com.lucky.dao.DaoTipoPdv;
import main.java.com.lucky.dao.impl.DaoTipoPdvImpl;
import main.java.com.lucky.dto.Canal;
import main.java.com.lucky.dto.TipoPdv;
import main.java.com.lucky.web.validator.CanalValidator;
import main.java.com.lucky.web.validator.TipoPdvValidator;
import main.java.com.lucky.xml.Xml;

/**
 * Servlet implementation class TipoPdvServlet
 */
@WebServlet(name = "TipoPdv", urlPatterns = { "/TipoPdv" })
public class TipoPdvServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;



    protected void processRequest(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {
    	
        String accion = request.getParameter("accion");
        accion = (accion == null) ? "" : accion;
        StringBuilder result;
        
        DaoTipoPdv daoTipoPdv = new DaoTipoPdvImpl();
        
        switch (accion) {
	        case "CBO":
	            List<Object[]> list = daoTipoPdv.tipoPdvCbo();
	
	            if (list != null) {
	                result = Xml.forCbo(list);
	
	            } else {
	                result = Xml.forMsg(daoTipoPdv.getMessage());
	            }
	            break;
	            
	        case "QRY":
	            list = daoTipoPdv.tipoPdvQry();
	
	            if (list != null) {
	                result = Xml.forQry(list);
	
	            } else {
	                result = Xml.forMsg(daoTipoPdv.getMessage());
	            }
	            break;

            case "INS":
                TipoPdv tipoPdv = new TipoPdv();
                TipoPdvValidator validator = new TipoPdvValidator();
                List<String> list_msg = validator.valida(
                        request, tipoPdv, false);

                if (list_msg.isEmpty()) {
                    String msg = daoTipoPdv.tipoPdvIns(tipoPdv);
                    result = Xml.forMsg(msg);

                } else {
                    result = Xml.forMsg(list_msg);
                }
                break;	
            
            case "DEL":
                List<Integer> ids
                        = DeString.ids(request.getParameter("ids"));

                if (ids == null) {
                    result = Xml.forMsg("Lista de ID(s) incorrecta");
                } else {
                    String msg = daoTipoPdv.tipoPdvDel(ids);
                    result = Xml.forMsg(msg);
                }
                break;
            
            case "UPD":
                tipoPdv = new TipoPdv();
                validator = new TipoPdvValidator();
                list_msg = validator.valida(request, tipoPdv, true);

                if (list_msg.isEmpty()) {
                    String msg = daoTipoPdv.tipoPdvUpd(tipoPdv);
                    result = Xml.forMsg(msg);

                } else {
                    result = Xml.forMsg(list_msg);
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
