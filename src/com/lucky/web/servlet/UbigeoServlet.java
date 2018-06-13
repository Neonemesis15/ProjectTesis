package com.lucky.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.lucky.convert.DeString;
import com.lucky.dao.DaoUbigeo;
import com.lucky.dao.impl.DaoUbigeoImpl;
import com.lucky.dto.Ubigeo;
import com.lucky.web.validator.UbigeoValidator;
import com.lucky.xml.Xml;

/**
 * Servlet implementation class UbigeoServlet
 */
@WebServlet(name = "Ubigeo", urlPatterns = { "/Ubigeo" })
public class UbigeoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    protected void processRequest(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {
       
    	String accion = request.getParameter("accion");
        accion = (accion == null) ? "" : accion;
        StringBuilder result;
        
        DaoUbigeo daoUbigeo = new DaoUbigeoImpl();
        switch (accion) {
        case "CBO":
            List<Object[]> list = daoUbigeo.ubigeoCbo();

            if (list != null) {
                result = Xml.forCbo(list);

            } else {
                result = Xml.forMsg(daoUbigeo.getMessage());
            }
            break;
            
        case "QRY":
            list = daoUbigeo.ubigeoQry();

            if (list != null) {
                result = Xml.forQry(list);

            } else {
                result = Xml.forMsg(daoUbigeo.getMessage());
            }
            break;
        
        case "QRY_02":
        	Integer idCampania = DeString.aInteger(request.getParameter("idCampania"));
        	Integer idPeriodo = DeString.aInteger(request.getParameter("idPeriodo"));
        	Integer idTipPdv = DeString.aInteger(request.getParameter("idTipPdv"));
        	
        	list = daoUbigeo.ubigeoQry(idCampania, idPeriodo, idTipPdv);
        	if(list!=null){
        		result = Xml.forQry(list);
        	}else{
        		result = Xml.forMsg(daoUbigeo.getMessage());
        	}
        	break;
        case "INS":
            Ubigeo ubigeo = new Ubigeo();
            UbigeoValidator validator = new UbigeoValidator();
            List<String> list_msg = validator.valida(
                    request, ubigeo, false);

            if (list_msg.isEmpty()) {
                String msg = daoUbigeo.ubigeoIns(ubigeo);
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
	
    public UbigeoServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

}
