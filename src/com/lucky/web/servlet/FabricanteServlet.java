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
import com.lucky.dto.Fabricante;
import com.lucky.web.validator.FabricanteValidator;
import com.lucky.xml.Xml;

import com.lucky.convert.DeString;

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
		List<Object[]> list = null;
		
		DaoFabricante daoFabricante = new DaoFabricanteImpl();
		switch(accion){
        case "CBO":
             list = daoFabricante.fabricanteCbo();

            if (list != null) {
                result = Xml.forCbo(list);

            } else {
                result = Xml.forMsg(daoFabricante.getMessage());
            }
            break;
		case "QRY":
			list = daoFabricante.fabricanteQry();
			if(list != null){
				result = Xml.forQry(list);
			}else{
				result = Xml.forMsg(daoFabricante.getMessage());
			}
			break;
			
        case "INS":
            Fabricante fabricante = new Fabricante();
            FabricanteValidator validator = new FabricanteValidator();
            List<String> list_msg = validator.valida(
                    request, fabricante, false);

            if (list_msg.isEmpty()) {
                String msg = daoFabricante.fabricanteIns(fabricante);
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
                String msg = daoFabricante.fabricantelDel(ids);
                result = Xml.forMsg(msg);
            }
            break;
        case "UPD":
            fabricante = new Fabricante();
            validator = new FabricanteValidator();
            list_msg = validator.valida(request, fabricante, true);

            if (list_msg.isEmpty()) {
                String msg = daoFabricante.fabricanteUpd(fabricante);
                result = Xml.forMsg(msg);

            } else {
                result = Xml.forMsg(list_msg);
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
	

    @Override
	protected void doGet(HttpServletRequest request, 
			HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

    @Override
	protected void doPost(HttpServletRequest request, 
			HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

}
