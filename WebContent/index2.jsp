<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<title>Home</title>

        <link href="css/main.css" type="text/css" rel="stylesheet"/>
        <link href="js/menu/menu.css" rel="stylesheet" type="text/css"/>
        <link href="js/jquery-ui.min.css" type="text/css" rel="stylesheet"/>
        <link href="sige/table.css" type="text/css" rel="stylesheet"/>
        <link href="sige/form.css" type="text/css" rel="stylesheet"/>
		
		<script src="js/jquery-2.1.4.min.js" type="text/javascript"></script>
        <script src="js/jquery-ui.min.js" type="text/javascript"></script>
        <script src="js/menu/menu.js" type="text/javascript"></script>
        <script src="sige/table.js" type="text/javascript"></script>
        <script src="sige/form.js" type="text/javascript"></script>    
  		 
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
			<%-- cuerpo --%>
		</div>
	</div>
</body>
</html>