<%@ page pageEncoding="UTF-8" %>



<div id="menu">
    <ul class="menu" style="width: 100%">
   		<li><a href="#" class="parent"><span>Home</span></a></li>
        <li><a href="#" class="parent"><span>Mis Datos</span></a>
            <div>
                <ul>
                <%--Tutoriales?accion=QRY --%>
                    <li><a href="cambiarPass.jsp"><span>Cambiar Password</span></a></li>
                    <li><a href="Usuarios?accion=LOGOUT"><span>Cerrar Sesi&oacute;n</span></a></li>
                </ul>
            </div>
        </li>

        <li>
            <a href="#" class="parent"><span>Periodos</span></a>
            <div>
                <ul>
                    <li><a href="#"><span>Personal</span></a></li>
                    <li><a href="#"><span>Puntos de Venta</span></a></li>
                </ul>
            </div>
        </li>
        <li>
            <a href="#" class="parent"><span>Cuestionarios</span></a>
            <div>
                <ul>
                    <li><a href="#"><span>Productos</span></a></li>
                    <li><a href="#"><span>Materiales</span></a></li>
                </ul>
            </div>
        </li>
        <li class="last">
            <a href="Usuarios?accion=LOGOUT"><span>Cerrar Sesi&oacute;n</span></a>
        </li>
    </ul>
</div>

<div id="copyright" style="display: none">
    Copyright &copy; 2012 
    <a href="http://apycom.com/">
        Apycom jQuery Menus</a>
</div>
<div style="clear: both"></div>