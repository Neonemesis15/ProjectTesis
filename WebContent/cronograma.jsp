<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Gestion de usuarios</title>
	<link href="fontawesome/css/fontawesome-all.min.css" type="text/css" rel="stylesheet" />
	<link href="css/main.css" type="text/css" rel="stylesheet"/>
	<link href="js/menu/menu.css" rel="stylesheet" type="text/css"/>
	<link href="js/jquery-ui.min.css" type="text/css" rel="stylesheet"/>
    <link href="sige/table.css" type="text/css" rel="stylesheet"/>
    <link href="sige/form.css" type="text/css" rel="stylesheet"/>
    <link href="sige/message.css" type="text/css" rel="stylesheet"/>
    <link href="js/timepicker/jquery-ui-timepicker-addon.css" rel="stylesheet" type="text/css"/>
    
    

   	<script src="js/jquery-2.1.4.min.js" type="text/javascript"></script>
    <script src="js/jquery-ui.min.js" type="text/javascript"></script>
    <script src="sige/table.js" type="text/javascript"></script>
    <script src="sige/form.js" type="text/javascript"></script>
    <script src="sige/message.js" type="text/javascript"></script>
    <script src="js/timepicker/jquery-ui-timepicker-addon.js" type="text/javascript"></script>
    <script src="js/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="js/usuario.js" type="text/javascript"></script>
    <script src="js/cronograma.js" type="text/javascript"></script>
    
</head>
<body>
    <div id="m_main">
	    <div id="m_top">
	        Usuario: ${usuarios.nombres} ${usuarios.apellidos}
	    </div>
		<div id="m_menu">
			<%@ include file="menu4.jsp"%>
		</div>
		<div id="m_body">
        	<div class="center">
        		<h2> <i class="fas fa-calendar-alt" style="font-size:1.5em; color:Tomato"></i> Cronograma de Visitas </h2>
        	</div>
        	<hr>
        	<form class="parainfo" style="margin: auto;display: table;margin-top: 30px;margin-bottom: 10px">
        	<fieldset class="ui-corner-all">
        		<legend>Filtros</legend>
	        	<table class="table">
	        		<tr>
	        			<td style="text-align: right">Selecciona Campania:</td>
	        			<td><select id="idcampania" class="parainfo" onchange="periodoCbo()" ></select></td>
	        		</tr>
	        		<tr>
	        			<td style="text-align: right">Selecciona Periodo:</td>
	        			<td><select id="idperiodo" class="parainfo" ></select></td>
	        		</tr>
	        	</table>
        	</fieldset>
        	</form>

        	<br/>
        	<table class="parainfo" style="margin: auto; width: 80%">
        	
        		<thead>
                    <tr>
                        <th class = "crud">
                            <a class="upd" href="#" onclick="cronogramaUpd();" title="Actualizar Registro">
                                <span></span>
                            </a>
                        </th>
                        <th class = "crud">
                            <a class="del" href="#" onclick="cronogramaDel();" title="Eliminar Registro">
                                <span></span>
                            </a>
                        </th>
                        <th class = "crud">
                            <a class="ins" href="#" onclick="cronogramaIns();" title="Agregar Registro">
                                <span></span>
                            </a>
                        </th>
                        <td >Usuario / nombres </td>
                        <td >Cant. PDV Asignados</td>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach var="reg" items="${list}">
                        <tr>
                            <th>
                                <input type="radio" name="idcronograma_upd" value="${reg[0]}"/>
                            </th>
                            <th>
                                <input type="checkbox" name="idcronograma_del" value="${reg[0]}"/>
                            </th>
                            <td colspan="2">${reg[1]}</td>
                            <td>${reg[2]}</td>
                        </tr>
                    </c:forEach>    
                </tbody>
        	</table>
        	<div id="content"></div>
        	<%-- diálogos de edición--%>
    	    
    	    <%-- mensajes del servidor --%>
	        <c:if test="${msg != null}">
	            <div class="msg_error 
	                 ui-state-highlight ui-corner-all">${msg}</div>
	        </c:if>
	        
	        <%-- para mensajes locales --%>
	        <div style="display: none">
	            <div id="dlg_message"><p id="p_message"></p></div>
	        </div>
		</div>
	</div>
</body>
</html>