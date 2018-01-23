function fabricanteQry(){
	$("#error_fabricante_qry").html("").hide();
	// Solicita data para grilla de fabricantes
	$.ajax({
		url: "Fabricante",
		type: "post",
		datatype: "xml",
		data: {
			accion : "QRY"
		},
		success: function(data){
			console.log('Ok!!');
			var msg = $(data).find('msg').text();
			if($.trim(msg).length !== 0){
				message("Data no Encontrada", msg);
			}else {
				
				var body = "";
				$(data).find('fil').each(function(){
					var idfabricante = $(this).find('col:eq(0)').text();
					var nombre = $(this).find('col:eq(1)').text();
					var descripcion = $(this).find('col:eq(2)').text();
					
					body += "<tr>"
						+ "<td id=\"fabricante_" + idfabricante + "\">" + nombre + "</td>"
						+ "<td colspan=\"2\" id=\"nombre_" + idfabricante + "\">" + descripcion + "</td>"
						+ "<td><input type=\"checkbox\" name=\"idfabricante_del\" value=\"" + idfabricante + "\"></td>"
						+ "<td><input type=\"radio\" name=\"idfabricante_upd\" value=\"" + idfabricante + "\"></td>"
						+ "</tr>";
				});
				
				
				// pinta data en grilla fabricantes
				$("#body_fabricante").html(body);
				
				
				// muestra dialogo con grilla
				$("#dlg_fabricante_qry").dialog({
					modal: true,
					width: 500,
					buttons: {
						"Cerrar": function(){
							$(this).dialog("close");
						}
					}
				});
				
			}
		},
		error: function (err) {
	        console.log("AJAX error in request: " + JSON.stringify(err, null, 2));
		}
	});
}

function categoriaQry(){
	$("#error_categoria_qry").html("").hide();
	$.ajax({
		url: "Categoria",
		type: "post",
		datatype: "xml",
		data: {
			accion : "QRY"
		},
		success: function(data){
			console.log("Ok!");
			var msg = $(data).find('msg').text();
			if($.trim(msg).length !== 0){
				message("Data no encontrada", msg);
			}else {
				var body = "";
				$(data).find('fil').each(function(){
					var idcategoria = $(this).find('col:eq(0)').text();
					var nombre = $(this).find('col:eq(1)').text();
					var descripcion = $(this).find('col:eq(2)').text();
					
					body += "<tr>"
						+ "<td id=\"categoria_" + idcategoria + "\">" + nombre + "</td>"
						+ "<td colspan=\"2\" id=\"nombre_" + idcategoria + "\">" + descripcion + "</td>"
						+ "<td><input type=\"checkbox\" name=\"idcategoria_del\" value=\"" + idcategoria + "\"></td>"
						+ "<td><input type=\"radio\" name=\"idcategoria_upd\" value=\"" + idcategoria + "\"></td>"
						+ "</tr>";
				});
				
				// Pinta data en grilla de categoria
				$("#body_categoria").html(body);
				
				// Muestra el dialogo con grilla
				$("#dlg_categoria_qry").dialog({
					modal: true,
					width: 500,
					buttons: {
						"Cerrar": function(){
							$(this).dialog("close");
						}
					}
				});
			}
		},
		error: function(err){
			console.log("AJAX error in request: " + JSON.stringify(err, null, 2));
		}
	});
}

function marcaQry(){
	$("#error_marca_qry").html("").hide();
	$.ajax({
		url: "Marca",
		type: "post",
		datatype: "xml",
		data: {
			accion: "QRY"
		},
		success: function(data){
			console.log("Ok!");
			var msg = $(data).find('msg').text();
			if($.trim(msg).length !== 0 ){
				message("Data no encontrada", msg);
			}else{
				
				var body = "";
				$(data).find('fil').each(function(){
					var idmarca = $(this).find('col:eq(0)').text();
					var nombre = $(this).find('col:eq(1)').text();
					var descripcion = $(this).find('col:eq(2)').text();
					
					body += "<tr>"
						+ "<td id=\"marca_" + idmarca + "\">" + nombre + "</td>"
						+ "<td colspan=\"2\" id=\"nombre_" + idmarca + "\">" + descripcion + "</td>"
						+ "<td><input type=\"checkbox\" name=\"idmarca_del\" value=\"" + idmarca + "\"></td>"
						+ "<td><input type=\"radio\" name=\"idmarca_upd\" value\"" + idmarca + "\"></td>"
						+ "</tr>";
				});
				
				// Pinta data en grilla de marca
				
				$("#body_marca").html(body);
				
				// Muestra el dialogo con grilla
				
				$("#dlg_marca_qry").dialog({
					modal: true,
					width: 500,
					buttons: {
						"Cerrar": function(){
							$(this).dialog("close");
						}
					}
				});
				
			}
		},
		error: function(err){
			console.log("AJAX error in request: " + JSON.stringify(err, null, 2));
		}
	});
}