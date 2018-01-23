<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<%@include file="../../WEB-INF/jspf/aaadmin.jspf" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link href="../../css/main.css" type="text/css" rel="stylesheet"/>
        <link href="../../jq/menu/menu.css" rel="stylesheet" type="text/css"/>

        <script src="../../jq/jquery-2.1.4.min.js" type="text/javascript"></script>
        <script src="../../jq/menu/menu.js" type="text/javascript"></script>
    </head>
    <body>
        <div id="m_main">
            <div id="m_top">
                Usuario: ${usuarios.nombres} ${usuarios.apellidos}
            </div>
            
            <div id="m_menu">
                <%@include file="../../WEB-INF/jspf/menuadmin.jspf" %>
            </div>

            <div id="m_body">
                <!-- contenido del menu -->
            </div>
        </div>
    </body>
</html>

