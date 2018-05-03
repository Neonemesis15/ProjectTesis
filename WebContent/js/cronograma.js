$(function(){
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
