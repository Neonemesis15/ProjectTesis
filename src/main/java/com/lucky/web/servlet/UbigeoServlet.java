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
import main.java.com.lucky.dao.DaoUbigeo;
import main.java.com.lucky.dao.impl.DaoUbigeoImpl;
import main.java.com.lucky.dto.Ubigeo;
import main.java.com.lucky.web.validator.UbigeoValidator;
import main.java.com.lucky.xml.Xml;

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
        // 
        final Integer filsXpag = 11;        
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
        
        case "CBO_02":
        	Integer idCampania = DeString.aInteger(request.getParameter("idCampania"));
        	Integer idPeriodo = DeString.aInteger(request.getParameter("idPeriodo"));
        	Integer idTipPdv = DeString.aInteger(request.getParameter("idTipPdv"));
        	
        	list = daoUbigeo.ubigeoCbo(idCampania, idPeriodo, idTipPdv);
        	if(list!=null){
        		result = Xml.forQry(list);
        	}else{
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
        

        case "UBIGEO_PAGS":
        	
        	UbigeoValidator validator = new UbigeoValidator();
        	String where = validator.validaPag(request);
        	Integer[] ctasPagsFils = daoUbigeo.ubigeoCtasPags(filsXpag, where);
        	
        	if(ctasPagsFils != null){
        		String[] titu = {"pags", "fils"};
        		Object[] data = {ctasPagsFils[0],ctasPagsFils[1]};
        		result = Xml.forDatos(titu, data);
        	}else{
        		result = Xml.forMsg(daoUbigeo.getMessage());
        	}
        	
        	break;
        case "UBIGEO_QRY":
        	validator = new UbigeoValidator();
        	where = validator.validaPag(request);
        	Integer numpag = DeString.aInteger(request.getParameter("numpag"));
        	list = daoUbigeo.ubigeoQry(numpag, filsXpag, where);
        	if (list != null) {
                result = Xml.forQry(list);
            } else {
                result = Xml.forMsg(daoUbigeo.getMessage());
            }
        	break;
        case "INS":
            Ubigeo ubigeo = new Ubigeo();
            validator = new UbigeoValidator();
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
