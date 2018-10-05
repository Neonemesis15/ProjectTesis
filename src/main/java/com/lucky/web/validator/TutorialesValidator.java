package main.java.com.lucky.web.validator;

import javax.servlet.http.HttpServletRequest;

import main.java.com.lucky.convert.DeString;
import main.java.com.lucky.dto.Tutoriales;

/**
 * @author parainformaticos.com
 */
public class TutorialesValidator {

    public TutorialesValidator() {
    }

    /**
     * @param request
     * @param tutoriales
     * @param caso == "UPD" o "INS"
     * @return mensaje de ingresos incorrectos
     */
    public String valida(
            HttpServletRequest request, Tutoriales tutoriales, String caso) {
        StringBuilder sb = new StringBuilder("<ul>");

        Integer idtutorial
                = DeString.aInteger(request.getParameter("idtutorial"));
        String titulo = request.getParameter("titulo");
        String tipo = request.getParameter("tipo");
        Double precio = DeString.aDouble(request.getParameter("precio"));

        if ((caso.compareTo("UPD") == 0) && (idtutorial == null)) {
            sb.append("<li>ID incorrecto</li>");
        }

        if ((titulo == null) || (titulo.trim().length() == 0)) {
            sb.append("<li>ingrese T&iacute;tulo de Tutorial</li>");
        }

        if ((tipo == null) || (tipo.trim().length() == 0)) {
            sb.append("<li>seleccione Tipo de Tutorial</li>");
        } else if ((tipo.compareTo("Separata") != 0)
                && (tipo.compareTo("Video") != 0)) {
            sb.append("<li>Tipo debe ser \"Separata\" o \"Video\"</li>");
        }

        if (precio == null) {
            sb.append("<li>Ingrese Precio de Tutorial</li>");
        } else if ((precio <= 0) || (precio > 100)) {
            sb.append("<li>Precio debe estar entre ]1, 100]</li>");
        }

        tutoriales.setIdtutorial(idtutorial);
        tutoriales.setTitulo(titulo);
        tutoriales.setTipo(tipo);
        tutoriales.setPrecio(precio);

        String result = (sb.length() != 4) // "<ul>"
                ? sb.append("</ul>").toString()
                : null;

        return result;
    }
}

