<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
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
    
   	<script src="js/jquery-2.1.4.min.js" type="text/javascript"></script>
    <script src="js/jquery-ui.min.js" type="text/javascript"></script>
    <script src="sige/table.js" type="text/javascript"></script>
    <script src="sige/form.js" type="text/javascript"></script>
    <script src="sige/message.js" type="text/javascript"></script>
    
    <script src="js/usuario.js" type="text/javascript"></script>
    
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
			<div class="center">
        	<h2> <i class="fas fa-user-circle" style="font-size:1.5em; color:Tomato"></i> Maestro de Usuarios</h2>
        	</div>
			<table class="parainfo" style="margin: auto;width: 80%">
			<hr><br/>
				<thead>
					<tr>
						<th class = "crud">
							<a class="upd" href="#" onclick="usuarioUpd();" title="Actualizar Registro">
								<span></span>
							</a>
						</th>
						<th class = "crud">
							<a class="del" href="#" onclick="usuarioDel();" title="Eliminar Registro">
								<span></span>
							</a>
						</th>
						<th class = "crud">
							<a class="ins" href="#" onclick="usuarioIns();" title="Agregar Registro">
								<span></span>
							</a>
						</th>
						<td>Usuario</td>
						<th class = "crud">
							<a class="qry" href="#" onclick="personaQry()" title="Lista de Personas">
								<span></span>
							</a>
						</th>
						<td>Personas (Nacimiento)</td>
						<th class = "crud">
							<a class="qry" href="#" onclick="perfilQry()" title="Lista de Perfiles">
								<span></span>
							</a>
						</th>
						<td>Pefil</td>
					</tr>
				</thead>
				<tbody>
					<c:forEach var="reg" items="${list}">
						<tr>
							<th>
								<input type="radio" name="idUsuario_upd" value="${reg[0]}"/>
							</th>
							<th>
								<input type="checkbox" name="idUsuario_del" value="${reg[0]}"/>
							</th>
							<td colspan="2">${reg[1]}</td>
							<td colspan="2">${reg[2]}</td>
							<td colspan="2">${reg[3]}</td>
						</tr>
					</c:forEach>	
				</tbody>
			</table>
		</div>
		<%-- di�logos de edici�n usuarios--%>
		<%@include file="WEB-INF/jspf/usuarios.jspf" %>
		<%@include file="WEB-INF/jspf/personas.jspf" %>
		<%@include file="WEB-INF/jspf/perfil.jspf" %>
		
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

</body>
</html>