<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>


<html>

    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

        <title>sige.com</title>
        
        <link href="css/main.css" type="text/css" rel="stylesheet"/>
        <link href="js/menu/menu.css" rel="stylesheet" type="text/css"/>
        <link href="js/jquery-ui.min.css" type="text/css" rel="stylesheet"/>
        <link href="sige/table.css" type="text/css" rel="stylesheet"/>
        <link href="sige/form.css" type="text/css" rel="stylesheet"/>
		
		<script src="js/jquery-2.1.4.min.js" type="text/javascript"></script>
        <script src="js/jquery-ui.min.js" type="text/javascript"></script>
        <script src="sige/table.js" type="text/javascript"></script>
        <script src="sige/form.js" type="text/javascript"></script>
        <script src="js/tutoriales.js" type="text/javascript"></script>

 		
 		
    </head>
    <body>
        <div id="m_main">
		    <div id="m_top">
		        Usuario: ${usuarios.nombres} ${usuarios.apellidos}
		    </div>
			<div id="m_menu">
				<%@ include file="menu2.jsp"%>
			</div>
			<div id="m_body">
					
		        <fmt:setLocale value="en_US"/>
		        <form class="parainfo" action="Usuarios" method="post"
		              style="margin: auto;display: table;margin-top: 50px">
		            <input type="hidden" name="accion" value="LOGIN"/>
		
		            <fieldset class="ui-corner-all">
		                <legend>Cambiar Password</legend>
		
		                <table class="tabla">
		                    <tr>
		                        <td><label for="usuario">Nuevo Password</label></td>
		                        <td>
		                            <input type="text" name="usuario" maxlength="50"
		                                   value="${usuarios.usuario}" id="usuario"
		                                   style="width: 200px"/>
		                        </td>
		                    </tr>
		                    <tr>
		                        <td><label for="password">Repita Nuevo Password</label></td>
		                        <td>
		                            <input type="password" name="password" 
		                                   maxlength="50" id="usuario"
		                                   value="${usuarios.password}" 
		                                   style="width: 200px"/>
		                        </td>
		                    </tr>
		                    <tr>
		                        <td colspan="2">&nbsp;</td>
		                    </tr>
		                    <tr>
		                        <td colspan="2" style="text-align: right">
		                            <button type="submit" 
		                                    class="submit">Aceptar</button>
		                            
		                        </td>
		                    </tr>
		                </table>
		            </fieldset>
		        </form>
		
		        <%-- para errores --%>
		        <c:if test="${msg.size() > 0}">
		            <ul class="msg_error ui-state-error ui-corner-all">
		                <c:forEach var="m" items="${msg}">
		                	<li>${m}</li>
		                </c:forEach>
		            </ul>
		        </c:if>
			</div>
		</div>
  
    </body>
</html>
