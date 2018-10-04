function ubigeo(){
	
	$("#ubigeoFindTxt").val($.trim($("#ubigeoFindTxt").val()));
	$.ajax({
		url: "Ubigeo",
		dataType: "xml",
		type: "post",
		data: {
			accion: "UBIGEO_PAGS",
			col: $("#ubigeoFindCbo").val(),
			txt: $("#ubigeoFindTxt").val()
		},
		success: function (data){
			var msg = $(data).find('msg').text();
			if($.trim(msg).length !== 0){
				$("#error_ubigeo_qry").text(msg);
				$("#error_ubigeo_qry").css("visibility","visible");
			}else{
				var pags = $(data).find('pags').attr('val');
				var fils = $(data).find('fils').attr('val');
				
				$("#foot_ubigeo01").html("Total: " + fils + " registros");
                $("#foot_ubigeo02").html(" de " + pags);
                
                var option = "";
                for (var x = 0; x < pags; ++x) {
                    option += "<option value=\""
                            + x + "\">" + (x + 1) + "</option>";
                }
                $("#numpag_ubigeo").html(option);
			}
		}
	});
}


//==============================================================
//Scripts Ubigeo
//==============================================================
function ubigeoQry() {
 $("#error_ubigeo_qry").html("").hide();
 // solicita data para grilla pacientes
 $.ajax({
     url: "Ubigeo",
     type: "post",
     datatype: "xml",
     data: {
         accion: "QRY"
     },
     success: function (data) {
         var msg = $(data).find('msg').text();

         if ($.trim(msg).length !== 0) {
             message("Data no Encontrada", msg);

         } else {
             var body = "";

             $(data).find('fil').each(function () {
                 var idubigeo        = $(this).find('col:eq(0)').text();
                 var nomdepartamento = $(this).find('col:eq(1)').text();
                 var nomprovincia    = $(this).find('col:eq(2)').text();
                 var nomdistrito     = $(this).find('col:eq(3)').text();

                 body += "<tr>"
                         + "<td colspan=\"2\" id=\"nomdepartamento_" + idubigeo + "\">" + nomdepartamento + "</td>"
                         + "<td colspan=\"2\" id=\"nomprovincia_" + idubigeo + "\">" + nomprovincia + "</td>"
                         + "<td colspan=\"3\" id=\"nomdistrito_" + idubigeo + "\">" + nomdistrito + "</td>"
                         + "<td><input type=\"checkbox\" name=\"idubigeo_del\" value=\"" + idubigeo + "\"/></td>"
                         + "<td><input type=\"radio\" name=\"idubigeo_upd\" value=\"" + idubigeo + "\"/></td>"
                         + "</tr>";
             });

             // pinta data en grilla ubigeos
             $("#body_ubigeo").html(body);
             
             //Llena la información de header y footer
             ubigeo();
             
             // muestra diálogo con grilla
             $("#dlg_ubigeo_qry").dialog({
                 modal: true,
                 width: 700,
                 buttons: {
                     "Cerrar": function () {
                         $(this).dialog("close");
                     }
                 }
             });
         }
     }
 });
}



function ubigeoIns(){
 // lectura para el combo Departamentos
 $.ajax({
     url: "combo.txt",
     type: "post",
     datatype: "txt",
     data: {
         accion: "CBO"
     },
     success: function (data) {
         var msg = $(data).find('msg').text();

         if ($.trim(msg).length !== 0) {
             message("Data no Encontrada", msg);

         } else {
             var option = "";

             $(data).find('op').each(function () {
                 option += "<option value=\""
                         + $(this).attr('id') + "\">"
                         + $(this).text() + "</option>";
             });

             $("#iddepartamento_ins").html(option);
             
             // lectura para el combo de Provincia
             $.ajax({
                 url: "combo.txt",
                 type: "post",
                 datatype: "txt",
                 data: {
                     accion: "CBO"
                 },
                 success: function (data) {
                     var msg = $(data).find('msg').text();

                     if ($.trim(msg).length !== 0) {
                         message("Data no Encontrada", msg);

                     } else {
                         var option = "";

                         $(data).find('op').each(function () {
                             option += "<option value=\""
                                     + $(this).attr('id') + "\">"
                                     + $(this).text() + "</option>";
                         });

                         $("#idprovincia_ins_ins").html(option);
                         
                         // lectura para el combo de Distritos
                         $.ajax({
                             url: "combo.txt",
                             type: "post",
                             datatype: "txt",
                             data: {
                                 accion: "CBO"
                             },
                             success: function (data) {
                                 var msg = $(data).find('msg').text();

                                 if ($.trim(msg).length !== 0) {
                                     message("Data no Encontrada", msg);

                                 } else {
                                     var option = "";

                                     $(data).find('op').each(function () {
                                         option += "<option value=\""
                                                 + $(this).attr('id') + "\">"
                                                 + $(this).text() + "</option>";
                                     });

                                     $("#iddistrito_ins").html(option);
                                     // ---
                                     // combos cargaron data
                                     $("#error_ubigeo_ins").html("").hide();

                                     $("#dlg_ubigeo_ins").dialog({
                                         modal: true,
                                         width: 480,
                                         buttons: {
                                             "Cancelar": function () {
                                                 $(this).dialog("close");
                                             },
                                             "Enviar Datos": function () {
                                                 $.ajax({
                                                     url: "ubigeo",
                                                     type: "post",
                                                     data: {
                                                         accion: "INS",
                                                         iddepartamento: $("#iddepartamento_ins").val(),
                                                         idprovincia: $("#idprovincia_ins").val(),
                                                         iddistrito: $("#iddistrito_ins").val()
                                                     },
                                                     success: function (error) {
                                                         if (error.length !== 0) {
                                                             $("#error_ubigeo_ins").html(error).show();

                                                         } else {
                                                             //window.location = "Citas?accion=QRY";
                                                         }
                                                     }
                                                 });
                                             }
                                         }
                                     });
                                 }
                             }
                         });
                     }
                 }
             });
         }
     }
 });
}


function ubigeoUpd(){
 var id = $("input[name='idubigeo_upd']:checked").val();
 if (isNaN(id)) {
     message("Advertencia", "Seleccione Fila para Actualizar Datos");
 } else {
     $.ajax({
         url: "get.txt",
         type: "post",
         datatype: "txt",
         data: {
             accion: "GET",
             idubigeo: id
         },
         success: function (data) {
             var msg = $(data).find('msg').text();

             if ($.trim(msg).length !== 0) {
                 message("Data no Encontrada", msg);

             } else {
                 var ideubigeo        = $(data).find('id').attr('val');
                 var idedepartamento  = $(data).find('iddepartamento').attr('val');
                 var ideprovincia     = $(data).find('idprovincia').attr('val');
                 var idedistrito      = $(data).find('iddistrito').attr('val');

                 // Lectura para el combo de Departamento
                 $.ajax({
                     url: "combo.txt",
                     type: "post",
                     datatype: "txt",
                     data: {
                         accion: "CBO"
                     },
                     success: function (data) {
                         var msg = $(data).find('msg').text();

                         if ($.trim(msg).length !== 0) {
                             message("Data no Encontrada", msg);

                         } else {
                             var option = "";

                             $(data).find('op').each(function () {
                                 option += "<option value=\""
                                         + $(this).attr('id') + "\">"
                                         + $(this).text() + "</option>";
                             });

                             $("#iddepartamento_upd").html(option);
                             $("#iddepartamento_upd").val(idedepartamento);
                             // ---
                             // Lectura para el combo de Provincia
                             $.ajax({
                                 url: "combo.txt",
                                 type: "post",
                                 datatype: "txt",
                                 data: {
                                     accion: "CBO"
                                 },
                                 success: function (data) {
                                     var msg = $(data).find('msg').text();

                                     if ($.trim(msg).length !== 0) {
                                         message("Data no Encontrada", msg);

                                     } else {
                                         var option = "";

                                         $(data).find('op').each(function () {
                                             option += "<option value=\""
                                                     + $(this).attr('id') + "\">"
                                                     + $(this).text() + "</option>";
                                         });

                                         $("#idprovincia_upd").html(option);
                                         $("#idprovincia_upd").val(ideprovincia);
                                         // ---
                                         // Lectura para el combo de Distrito
                                         $.ajax({
                                             url: "combo.txt",
                                             type: "post",
                                             datatype: "txt",
                                             data: {
                                                 accion: "CBO"
                                             },
                                             success: function (data) {
                                                 var msg = $(data).find('msg').text();

                                                 if ($.trim(msg).length !== 0) {
                                                     message("Data no Encontrada", msg);

                                                 } else {
                                                     var option = "";

                                                     $(data).find('op').each(function () {
                                                         option += "<option value=\""
                                                                 + $(this).attr('id') + "\">"
                                                                 + $(this).text() + "</option>";
                                                     });

                                                     $("#iddistrito_upd").html(option);
                                                     $("#iddistrito_upd").val(idedistrito);
                                                     // ---
                                                     // ---
                                                     // todo Ok
                                                     $("#error_ubigeo_upd").html("").hide();

                                                     $("#dlg_ubigeo_upd").dialog({
                                                         modal: true,
                                                         width: 480,
                                                         buttons: {
                                                             "Cancelar": function () {
                                                                 $(this).dialog("close");
                                                             },
                                                             "Enviar Datos": function () {
                                                                 $.ajax({
                                                                     url: "ubigeo",
                                                                     type: "post",
                                                                     data: {
                                                                         accion: "UPD",
                                                                         id              : ideubigeo,
                                                                         iddepartamento  : $("#iddepartamento_upd").val(),
                                                                         idprovincia     : $("#idprovincia_upd").val(),
                                                                         iddistrito      : $("#iddistrito_upd").val()
                                                                     },
                                                                     success: function (error) {
                                                                         if (error.length !== 0) {
                                                                             $("#error_ubigeo_upd").html(error).show();

                                                                         } else {
                                                                             //window.location = "Citas?accion=QRY";
                                                                         }
                                                                     }
                                                                 });
                                                             }
                                                         }
                                                     });
                                                 }
                                             }
                                         });
                                     }
                                 }
                             });

                         }
                     }
                 });
             }
         }
     });
 }
}

function ubigeoDel(){
 var ids = [];
 $("input[name='idubigeo_del']:checked").each(function () {
     ids.push($(this).val());
 });
 if (ids.length === 0) {
     message("Advertencia", "Seleccione fila(s) a Retirar");
 } else {
     $("#p_message").html("¿Retirar registro(s)?");
     $("#dlg_message").dialog({
         modal: true,
         width: 440,
         buttons: {
             "No": function () {
                 $(this).dialog("close");
             },
             "Si": function () {
                 $(this).dialog("close");

                 $.ajax({
                     url: "ubigeo",
                     type: "post",
                     data: {
                         accion: "DEL",
                         ids: ids.toString()
                     },
                     success: function (error) {
                         if (error.length !== 0) {
                             message("Error", error);

                         } else {
                             //window.location = "Citas?accion=QRY";
                         }
                     }
                 });
             }
         }
     });
 }
}
