<!-- para o menu vamos adicionar tamb�m o js do bootstrap e jQuery -->

		<script src="js/jquery-2.1.4.min.js" type="text/javascript"></script>
        <script src="js/jquery-ui.min.js" type="text/javascript"></script>
        <script src="sige/table.js" type="text/javascript"></script>
        <script src="sige/form.js" type="text/javascript"></script>
        <script src="js/bootstrap.min.js"></script>

        
<!-- c�digo do menu (navbar)
existem v�rias classes do navbar, vou pegar no site do bootstrap
� basicamente um ctrl+c ctrl+v 
 -->

<nav class="navbar navbar-inverse">
	<div class="container-fluid">
		<!-- Brand and toggle get grouped for better mobile display -->
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed"
				data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
				aria-expanded="false">
				<span class="sr-only">Toggle navigation</span> <span
					class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="index.jsp">Supervisor</a>
		</div>

		<!-- Collect the nav links, forms, and other content for toggling -->
		<div class="collapse navbar-collapse"
			id="bs-example-navbar-collapse-1">
			<ul class="nav navbar-nav">
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown" role="button" aria-haspopup="true"
					aria-expanded="false">Mis Datos <span class="caret"></span></a>
					<ul class="dropdown-menu">
						<%--  <li><a href="Tutoriales?accion=QRY">Cambiar Password</a></li> --%>
						<li><a href="cambiarPass.jsp">Cambiar Password</a></li> 
						<li><a href="#">Actualizar mis datos</a></li>
						<li><a href="Usuarios?accion=LOGOUT">Cerrar Sesion</a></li>
					</ul>
				</li>
			</ul>
		</div>
		<!-- /.navbar-collapse -->
	</div>
	<!-- /.container-fluid -->
</nav>