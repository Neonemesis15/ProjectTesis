var lstPdvDisponiblesGlobal;
var lstPdvAsignadosGlobal;

$(function(){
	//Cargar Campanias Publicitarias
	$.ajax({
			url :"CampaniaPublicitaria",
			data:{
				accion:"CBO"
			},
			success: function(data){
				var msg = $(data).find('msg').text();
				if($.trim(msg).length !== 0){
					message("Data no Encontrada", msg);
				}else{
					var option = "";
					$(data).find('op').each(function(){
						option += "<option value=\""
								  + $(this).attr('id') + "\">"
								  + $(this).text() + "</option>";
					});
					$('#idcampania').html(option);
					periodoCbo();
				}
				
			}
	});

	//Cargar Tipos de Punto de Venta
	$.ajax({
		url:"TipoPdv",
		data:{
			accion:"CBO"
		},
		success: function(data){
			var msg = $(data).find('msg').text();
			if($.trim(msg).length !== 0){
				message("Data no Encontrada", msg);
			}else{
				var option = "";
				$(data).find('op').each(function(){
					option += "<option value=\""
					+ $(this).attr('id') + "\">"
					+ $(this).text() + "</option>";
				});
				$("#idtippdv_ins").html(option);
			}
		}
	});
});

function periodoCbo(){
	$.ajax({
			url:"Periodo",
			data:{
				  accion:"CBO_02",
				  idCampania: $("#idcampania").val()
			},
			success: function(data){
				var msg = $(data).find('msg').text();
				if($.trim(msg).length !== 0){
					message("Data no Encontrada", msg);
				}else{
					var option ="";
					$(data).find('op').each(function(){
						option += "<option value=\""
								+ $(this).attr('id') + "\">"
								+ $(this).text() + "</option>";
					});
					$("#idperiodo").html(option);
					cronogramaQry();
				}
			}
	});
}

function cronogramaQry(){
	$("#error_cronograma_qry").html("").hide();
	$.ajax({
			url:"Cronograma",
			type:"post",
			datatype: "xml",
			data:{
				accion		: "QRY_02",
				idCampania	: $("#idcampania").val(),
				idPeriodo	: $("#idperiodo").val()
			},
			success : function(data){
				var msg = $(data).find('msg').text();
				if($.trim(msg).length !== 0){
					message("Data no Encontrada",msg);
				} else {
					var body = "";
					$(data).find('fil').each(function(){
						var idCronograma = $(this).find('col:eq(0)').text();
						var usuario = $(this).find('col:eq(1)').text();
						var cantPdv = $(this).find('col:eq(2)').text();
						
						body += "<tr>"
								+ "<td><input type=\"radio\" name=\"idcronograma_upd\" value=\"" + idCronograma + "\"/></td>"
								+ "<td><input type=\"checkbox\" name=\"idcronograma_del\" value=\"" + idCronograma + "\"/></td>"
								+ "<td colspan=\"2\" id=\"usuario_" + idCronograma + "\">" + usuario + "</td>"
								+ "<td id=\"cantPdv_" + idCronograma + "\">" + cantPdv + "</td>"
								+ "</tr>"
					});
					$("#body_cronograma").html(body);
				}
			}
	});
}

function cronogramaIns(){
	// lectura del combo de campanias
	$.ajax({
			url :"CampaniaPublicitaria",
			type:"post",
			datatype:"xml",
			data:{
				accion:"CBO"
			},
			success: function(data){
				var msg = $(data).find('msg').text();
				if($.trim(msg).length !== 0){
					message("Data no Encontrada", msg);
				}else{
					var option = "";
					$(data).find('op').each(function(){
						option += "<option value=\""
						+ $(this).attr('id') + "\">"
						+ $(this).text() + "</option>";
					});
					$('#idcampania_ins').html(option);

					$.ajax({
							url:"Periodo",
							data:{
								accion:"CBO_02",
								idCampania: $("#idcampania").val()
							},
							success: function(data){
								var msg = $(data).find('msg').text();
								if($.trim(msg).length !== 0){
									message("Data no Encontrada", msg);
								}else{
									var option = "";
									$(data).find('op').each(function(){
										option += "<option value=\""
										+ $(this).attr('id')+"\">"
										+ $(this).text() + "</option>";
									});
									$("#idperiodo_ins").html(option);
								}
							}
					})






					$("#dlg_cronograma_ins").dialog({
						modal: true,
						width: 480,
						buttons:{
							"Cancelar": function(){
								$(this).dialog("close");
							},
							"Enviar Datos": function(){
								
							}
						}
					});








				}
			}
	})



}



function periodoCboIns(){
	$.ajax({
		url:"Periodo",
		data:{
			accion:"CBO_02",
			idCampania: $("#idcampania_ins").val()
		},
		success: function(data){
			var msg = $(data).find("msg").text();
			if($.trim(msg).length !== 0){
				message("Data no Encontrada", msg);
			}else{
				var option = "";
				$(data).find('op').each(function(){
					option += "<option value=\""
					+ $(this).attr("id")+"\">"
					+ $(this).text() + "</option>";
				});
				$("#idperiodo_ins").html(option);
			}
		}
	});
}

function usuariosFind(){
	$("#dlg_usuarios_find").dialog({
		modal:true,
		width: 360,
		height: 330,
		buttons: {
			"Cerrar":function(){
				$(this).dialog("close");
			}
		}
	});
	$.ajax({
		url: "Usuario",
		type: "post",
		data :{
			accion : "QRY_02",
			idCampania: $("#idcampania_ins").val(),
			idPeriodo: $("#idperiodo_ins").val()
		},
		success: function(data){
			var msg = $(data).find("msg").text();
			if($.trim(msg).length !== 0){
				message("Data no Encontrada", msg);
			}else{
				var lista = "<table class=\"parainfo\" style=\"100%\"><tbody>";
				$(data).find('fil').each(function(){
					var idUsuario = $(this).find('col:eq(0)').text();
					var nomUsuario = $(this).find('col:eq(1)').text();

					lista += "<tr><td>"
					+ "<a class=\"parainfo\" href=\"#\" onclick=\"usuarioPinta('"+idUsuario+"','"+nomUsuario+"');\">"
					+ nomUsuario
					+ "</a>"
					+ "</td></tr>";
				});

				lista += "</body></table>";

				//Pinta Lista de Usuarios By IdCampania & IdPeriodo
				$("#usuariosLst").html(lista);
			}
		}
	});
}

function usuarioPinta(idUsuario, nomUsuario){
	$("#idUsuario_ins").val(idUsuario);
	$("#usuario_ins").val(nomUsuario);
	
	//Listar PDV Asignados
	$.ajax({
		url: "Pdv",
		data : {
			accion: "ASI",
			idCampania : 1,
			idPeriodo : 1,
			idUsuario: $("#idUsuario_ins").val()
		}, success: function(data){
			var msg = $(data).find('msg').text();
			if($.trim(msg).length !== 0){
				message("Data no Encontrada", msg);
			}else{
				var li = "";
				$(data).find('op').each(function(){
					li += "<li class=\"ui-widget-content\" id=\""
						  + $(this).attr('id') + "\">"
						  + $(this).text() + "</li>";
				});
				$('#selectable_asig').html(li);
				//Cierra dialog
				$("#dlg_usuarios_find").dialog("close");
			}
		}
	});
	
}


function ubigeosFind(){
	$("#dlg_ubigeo_find").dialog({
		modal: true,
		width: 360,
		height: 330,
		buttons: {
			"Cerrar": function(){
				$(this).dialog("close");
			}
		}
	});

	$.ajax({
		url: "Ubigeo",
		type:"post",
		data: {
			accion: "QRY_02",
			idCampania: $("#idcampania_ins").val(),
			idPeriodo: $("#idperiodo_ins").val(),
			idTipPdv: $("#idtippdv_ins").val()
		},
		success: function(data){
			var msg = $(data).find("msg").text();
			if($.trim(msg).length !== 0){
				message("Data no Encontrada", msg);
			}else{
				var lista = "<table class=\"parainfo\" style=\"100%\"><tbody>";
				$(data).find('fil').each(function(){
					var idUbigeo = $(this).find('col:eq(0)').text();
					var nomUbigeo = $(this).find('col:eq(1)').text();
					lista += "<tr><td>"
					+ "<a class=\"parainfo\" href=\"#\" onclick=\"ubigeoPinta('"+idUbigeo+"','"+nomUbigeo+"');\">"
					+ nomUbigeo
					+ "</a>"
					+ "</td></tr>";
					//Pinta Lista de Ubigeos By idCampania/idPeriodo/idTipPdv
					$("#ubigeoLst").html(lista);
				})
			}
		}
	});
}

function ubigeoPinta(idUbigeo, nomUbigeo){
	$("#idUbigeo_ins").val(idUbigeo);
	$("#ubigeo_ins").val(nomUbigeo);
	
	// Listar PDV Disponibles
	$.ajax({
		url: "Pdv",
		data : {
			accion: "LST",
			idCampania: 1,
			idPeriodo: 1,
			idUbigeo: idUbigeo,
			idTipPdv: $("#idtippdv_ins").val()
		}, success: function(data){
			var msg = $(data).find('msg').text();
			if($.trim(msg).length !== 0){
				message("Data no Encontrada", msg);
			}else{
				var li = "";
				$(data).find('op').each(function(){
					li += "<li class=\"ui-widget-content\" id=\""
							  + $(this).attr('id') + "\">"
							  + $(this).text() + "</li>";
				});
				
				$('#selectable_disp').html(li);
				//Cierra dialog
				$("#dlg_ubigeo_find").dialog("close");	
				
			}
		}
	});
	
	
	
}

function addPdv(){
	//$("#lstpdvasignados_ins ol").append('<li class="ui-widget-content" id="11">Metro Nuevo</li>');
	
	var liIndex = [];
	lstPdvDisponiblesGlobal.forEach(function(e){
		liIndex.push(e.index);
	});
	
	//document.querySelectorAll("#selectable_disp li");
	
	//var head = document.getElementById("selectable_disp");
	//items[0].parentNode.removeChild(items[0],items[1],items[2],items[3]);
	//var obj = [0,1,2,3,4];
	//var obj2 = obj.join();
	//console.log(obj2);

	// Remover de la lista de Pdv Disponibles (1 a 1)
	$("#selectable_disp li").filter(function(index, el) {
	    return $.inArray(index, liIndex) > -1;
	}).remove();
	
	// Agregar a la lista de Pdv Asignados
	lstPdvDisponiblesGlobal.forEach(function(e){
		$("#lstpdvasignados_ins ol")
		.append("<li class=\"ui-widget-content\" id="
		+ e.id + ">" 
		+ e.value + "</li>");		
	});

	lstPdvDisponiblesGlobal = [];

	//$("#selectable_disp li").eq(String(obj2)).remove();
}

function addAllPdv(){
	
	// -- Variable Temporal para guardar el Listado de PdvDisponibles
	lstPdvDisponibleTmp = [];
	
	// -- Guardar en varible, los datos + importantes 
	$("#selectable_disp li").each(function(index){
		var obj = {};
		obj["id"] = this.id;
		obj["value"] = $(this).text();
		obj["index"] = $(this).index();
		lstPdvDisponibleTmp.push(obj); 
	});

	// -- Guardar en un Array, los indices seleccionados
	var liIndex = [];
	lstPdvDisponibleTmp.forEach(function(e){
		liIndex.push(e.index);
	});

	// -- Remover PdvAsignados (Todos);
	$("#selectable_disp li").filter(function(index, el) {
	    return $.inArray(index, liIndex) > -1;
	}).remove();

	// -- Agregar a la lista de Pdv Asignados
	lstPdvDisponibleTmp.forEach(function(e){
		$("#lstpdvasignados_ins ol")
		.append("<li class=\"ui-widget-content\" id="
		+ e.id + ">" 
		+ e.value + "</li>");		
	});

	// -- Eliminar la información de la variable Temporal
	lstPdvDisponibleTmp = [];
}

function removePdv(){

	var liIndex = [];
	lstPdvAsignadosGlobal.forEach(function(e){
		liIndex.push(e.index);
	});

	// Remover de la lista de Pdv Asignados (1 a 1)
	$("#selectable_asig li").filter(function(index, el) {
	    return $.inArray(index, liIndex) > -1;
	}).remove();

	// Agregar a la lista de Pdv Disponibles
	lstPdvAsignadosGlobal.forEach(function(e){
		$("#lstpdvdisponibles_ins ol")
		.append("<li class=\"ui-widget-content\" id="
		+ e.id + ">" 
		+ e.value + "</li>");		
	});

	lstPdvAsignadosGlobal = [];

}

function removeAllPdv(){
	
	// -- Variable Temporal para guardar el Listado de PdvAsignados
	lstPdvAsignadoTmp = [];
	
	// -- Guardar en varible, los datos + importantes 
	$("#selectable_asig li").each(function(index){
		var obj = {};
		obj["id"] = this.id;
		obj["value"] = $(this).text();
		obj["index"] = $(this).index();
		lstPdvAsignadoTmp.push(obj); 
	});

	// -- Guardar en un Array, los indices seleccionados
	var liIndex = [];
	lstPdvAsignadoTmp.forEach(function(e){
		liIndex.push(e.index);
	});

	// -- Remover PdvDisponibles (Todos);
	$("#selectable_asig li").filter(function(index, el) {
	    return $.inArray(index, liIndex) > -1;
	}).remove();

	// -- Agregar a la lista de Pdv Disponibles
	lstPdvAsignadoTmp.forEach(function(e){
		$("#lstpdvdisponibles_ins ol")
		.append("<li class=\"ui-widget-content\" id="
		+ e.id + ">" 
		+ e.value + "</li>");		
	});

	// -- Eliminar la información de la variable Temporal
	lstPdvAsignadoTmp = [];
}

function pdvDisponiblesQry(){
	$.ajax({
		url: "Pdv",
		data : {
			accion: "LST",
			idCampania: 1,
			idPeriodo: 1,
			idUbigeo: 12
		}, success: function(data){
			var msg = $(data).find('msg').text();
			if($.trim(msg).length !== 0){
				message("Data no Encontrada", msg);
			}else{
				var li = "";
				$(data).find('op').each(function(){
					li += "<li class=\"ui-widget-content\" id=\""
							  + $(this).attr('id') + "\">"
							  + $(this).text() + "</li>";
				});
				
				$('#selectable_disp').html(li);
							
			}
		}
	});
}

function pdvAsignadosQry(){
	$.ajax({
		url: "Pdv",
		data : {
			accion: "ASI",
			idCampania : 1,
			idPeriodo : 1,
			idUsuario: $("#idUsuario_ins").val()
		}, success: function(data){
			var msg = $(data).find('msg').text();
			if($.trim(msg).length !== 0){
				message("Data no Encontrada", msg);
			}else{
				var li = "";
				$(data).find('op').each(function(){
					li += "<li class=\"ui-widget-content\" id=\""
						  + $(this).attr('id') + "\">"
						  + $(this).text() + "</li>";
				});
				$('#selectable_asig').html(li);
			}
		}
	});
}
