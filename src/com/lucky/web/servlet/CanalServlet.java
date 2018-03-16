package com.lucky.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.lucky.dao.DaoCanal;
import com.lucky.dao.impl.DaoCanalImpl;
import com.lucky.dto.Canal;
import com.lucky.web.validator.CanalValidator;
import com.lucky.xml.Xml;

import com.lucky.convert.DeString;


@WebServlet(name = "Canal", urlPatterns = { "/Canal" })
public class CanalServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    protected void processRequest(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {
        String accion = request.getParameter("accion");
        accion = (accion == null) ? "" : accion;
        StringBuilder result;
        //
        DaoCanal daoCanal = new DaoCanalImpl();
        switch (accion) {
	        case "CBO":
	            List<Object[]> list = daoCanal.canalCbo();
	
	            if (list != null) {
	                result = Xml.forCbo(list);
	
	            } else {
	                result = Xml.forMsg(daoCanal.getMessage());
	            }
	            break;
	            
	        case "QRY":
	            list = daoCanal.canalQry();
	
	            if (list != null) {
	                result = Xml.forQry(list);
	
	            } else {
	                result = Xml.forMsg(daoCanal.getMessage());
	            }
	            break;
            case "INS":
                Canal canal = new Canal();
                CanalValidator validator = new CanalValidator();
                List<String> list_msg = validator.valida(
                        request, canal, false);

                if (list_msg.isEmpty()) {
                    String msg = daoCanal.canalIns(canal);
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
                    String msg = daoCanal.canalDel(ids);
                    result = Xml.forMsg(msg);
                }
                break;
            case "UPD":
                canal = new Canal();
                validator = new CanalValidator();
                list_msg = validator.valida(request, canal, true);

                if (list_msg.isEmpty()) {
                    String msg = daoCanal.canalUpd(canal);
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
