<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Gestion de usuarios</title>
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

        </div>
        <%-- diálogos de edición--%>
        <%-- <%@include file="WEB-INF/jspf/tpdv.jspf" %> --%>
        <%-- <%@include file="WEB-INF/jspf/ubigeo.jspf" %> --%>
        <%-- <%@include file="WEB-INF/jspf/departamento.jspf" %> --%>
        <%-- <%@include file="WEB-INF/jspf/provincia.jspf" %> --%>
        <%-- <%@include file="WEB-INF/jspf/distrito.jspf" %> --%>

        <%-- <%@include file="WEB-INF/jspf/pdv.jspf" %> --%>

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