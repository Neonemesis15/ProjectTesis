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
	        <table class="parainfo" style="margin: auto;width: 498px">
	            <thead>
	                <tr>
	                    <td>Título</td>
	                    <td>Precio</td>
	                    <td>Tipo</td>
	                    <th class="crud">
	                        <a class="ins" href="#" onclick="tutorialesIns();"
	                           title="Nuevo Registro">
	                            <span></span></a>
	                    </th>
	                    <th class="crud">
	                        <a class="del" href="#" onclick="tutorialesDel();"
	                           title="Retirar Registros">
	                            <span></span></a>
	                    </th>
	                    <th class="crud">
	                        <a class="upd" href="#" onclick="tutorialesUpd();"
	                           title="Actualizar Registro">
	                            <span></span></a>
	                    </th>
	                </tr>
	            </thead>
	            <tbody>
	                <c:forEach var="t" items="${list}">
	                    <tr>
	                        <td>${t.titulo}</td>
	                        <td style="text-align: center">
	                            <fmt:formatNumber type="number" pattern="#,##0.00"
	                                              value="${t.precio}"/>
	                        </td>
	                        <td colspan="2">${t.tipo}</td>
	                        <th>
	                            <input type="checkbox" name="idtutorial_check" 
	                                   value="${t.idtutorial}"/>
	                        </th>
	                        <th>
	                            <input type="radio" name="idtutorial_radio" 
	                                   value="${t.idtutorial}"/>
	                        </th>
	                    </tr>
	                </c:forEach>
	            </tbody>
	        </table>
	        
	        <%-- para INS  --%>
	        <div style="display: none">
	            <div id="dins" title="Nuevo registro">
	                <form class="parainfo">
	                    <table>
	                        <tr>
	                            <td>Tutorial</td>
	                            <td>
	                                <input type="text" id="titulo_ins" 
	                                       maxlength="200" style="width: 300px"/>
	                            </td>
	                        </tr>
	                        <tr>
	                            <td>Tipo</td>
	                            <td>
	                                <select id="tipo_ins" style="width: 310px">
	                                    <option value="Separata">Separata</option>
	                                    <option value="Video">Video</option>
	                                </select>
	                            </td>
	                        </tr>
	                        <tr>
	                            <td>Precio&nbsp;S/.</td>
	                            <td>
	                                <input type="text" id="precio_ins" maxlength="6" 
	                                       style="width: 100px;text-align: right"/>
	                            </td>
	                        </tr>
	                    </table>
	                </form>
	                
	                <div id="error_ins" style="color: red"></div>
	            </div>
	        </div>
	        
	        <%-- para UPD  --%>
	        <div style="display: none">
	            <div id="dupd" title="Actualizar datos de registro">
	                <form class="parainfo">
	                    <input type="hidden" id="idtutorial_upd"/>
	                    <table>
	                        <tr>
	                            <td>Tutorial</td>
	                            <td>
	                                <input type="text" id="titulo_upd" 
	                                       maxlength="200" style="width: 300px"/>
	                            </td>
	                        </tr>
	                        <tr>
	                            <td>Tipo</td>
	                            <td>
	                                <select id="tipo_upd" style="width: 205px">
	                                    <option value="Separata">Separata</option>
	                                    <option value="Video">Video</option>
	                                </select>
	                            </td>
	                        </tr>
	                        <tr>
	                            <td>Precio&nbsp;S/.</td>
	                            <td>
	                                <input type="text" id="precio_upd" maxlength="6" 
	                                       style="width: 100px;text-align: right"/>
	                            </td>
	                        </tr>
	                    </table>
	                </form>
	
	                <p id="error_upd" style="color: red"></p>
	            </div>
	        </div>
	        
	        <%-- para error en consulta  --%>
	        <p class="msg">${msg}</p>
	        
	        <%-- para mensajes alert --%>
	        <div style="display: none">
	            <div id="dlg_msg"><p id="p_msg"></p></div>
	        </div>
			</div>
		</div>
		
 
    </body>
</html>

