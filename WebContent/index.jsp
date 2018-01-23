<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@include file="WEB-INF/jspf/browser.jspf" %>
<%
    session.invalidate();
%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>sige.com</title>
        <link href="js/jquery-ui.min.css" type="text/css" rel="stylesheet"/>
        <link href="css/main.css" type="text/css" rel="stylesheet"/>
        <link href="sige/form.css" type="text/css" rel="stylesheet"/>

        <script src="js/jquery-2.1.4.min.js" type="text/javascript"></script>
        <script src="js/jquery-ui.min.js" type="text/javascript"></script>
        <script src="sige/form.js" type="text/javascript"></script>
    </head>
    <body>
        <form class="parainfo" action="Usuarios" method="post"
              style="margin: auto;display: table;margin-top: 50px">
            <input type="hidden" name="accion" value="LOGIN"/>

            <fieldset class="ui-corner-all">
                <legend>Login</legend>

                <table class="tabla">
                    <tr>
                        <th rowspan="4">
                            <img src="images/lock.png"/>
                        </th>
                        <td><label for="usuario">Usuario</label></td>
                        <td>
                            <input type="text" name="usuario" maxlength="50"
                                   value="${usuarios.usuario}" id="usuario"
                                   style="width: 200px"/>
                        </td>
                    </tr>
                    <tr>
                        <td><label for="password">Password</label></td>
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
                                    class="submit">Autenticarse</button>
                            <br/>
                            <span style="color: #777">
                                <img src="images/lucky_logo2.png" 
                                     style="vertical-align: middle"/>
                               <i><b>S.A.C.</b></i><br/>
                            </span>
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
    </body>
</html>

