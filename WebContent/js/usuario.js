// ================================================
// Script Usuarios
// ================================================

function usuarioIns(){
	// lectura del combo de personas
	$.ajax({
		url: "Persona",
		type: "post",
		datatype: "xml",
		data : {
			accion: "CBO"
		},
		success: function(data){
			var msg = $(data).find('msg').text();
			if ($.trim(msg).length !== 0) {
				message("Data no Encontrada", msg);
			}else{
				var option = "";
				$(data).find('op').each(function(){
					option += "<option value=\""
						+ $(this).attr('id') + "\">"
						+ $(this).text() + "</option>";
				});
				
				$("#persona_ins").html(option);
				
				$("#dlg_usuario_ins").dialog({
                    modal: true,
                    width: 480,
                    buttons: {
                        "Cancelar": function () {
                            $(this).dialog("close");
                        },
                        "Enviar Datos": function () {
                            /*$.ajax({
                                url: "Citas",
                                type: "post",
                                data: {
                                    accion: "INS",
                                    idpaciente: $("#idpaciente_ins").val(),
                                    idespecialidad: $("#idespecialidad_ins").val(),
                                    idmedico: $("#idmedico_ins").val(),
                                    diahora: $("#diahora_ins").val()
                                },
                                success: function (error) {
                                    if (error.length !== 0) {
                                        $("#error_citas_ins").html(error).show();

                                    } else {
                                        window.location = "Citas?accion=QRY";
                                    }
                                }
                            });*/
                        }
                    }
				});
			}
		}
	});
}

function usuarioDel(){
    var ids = [];
    $("input[name='idusuario_del']:checked").each(function () {
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
                        url: "usuario",
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

function usuarioUpd(){
    var id = $("input[name='idusuario_upd']:checked").val();
    if (isNaN(id)) {
        message("Advertencia", "Seleccione Fila para Actualizar Datos");
        }else{
        // pidiendo datos de usuario
        $.ajax({
            url: "combo.txt",
            type: "post",
            datatype: "txt",
            data: {
                accion: "POST",
                idcita: id
            },
            success: function (data) {
                var msg = $(data).find('msg').text();

                if ($.trim(msg).length !== 0) {
                    message("Data no Encontrada", msg);

                } else {
                    var idcampana = $(data).find('idcampana').attr('val');
                    var nomcampana = $(data).find('nombre').attr('val');
                    var descampana = $(data).find('descripcion').attr('val');
                    var fecinicampana = $(data).find('fechaini').attr('val');
                    var fecfincampana = $(data).find('fechafin').attr('val');
                    var idempresa = $(data).find('idempresa').attr('val');
                    var idcanal = $(data).find('idcanal').attr('val');

                    $("#idcampana_upd").val(idcampana);
                    $("#nombre_upd").val(nomcampana);
                    $("#descripcion_upd").val(descampana);
                    $("#fechaini_upd").val(fecinicampana);
                    $("#fechafin_upd").val(fecfincampana);

                    // lectura para el combo empresas
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

                                $("#idempresa_upd").html(option);
                                $("#idempresa_upd").val(idempresa);
                                // ---
                                // Lectura para el combo de canales
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

                                            $("#idcanal_upd").html(option);
                                            $("#idcanal_upd").val(idcanal);
                                            // ---
                                            // todo Ok
                                            $("#error_usuario_upd").html("").hide();

                                            $("#dlg_usuario_upd").dialog({
                                                modal: true,
                                                width: 480,
                                                buttons: {
                                                    "Cancelar": function () {
                                                        $(this).dialog("close");
                                                    },
                                                    "Enviar Datos": function () {
                                                        $.ajax({
                                                            url: "usuario",
                                                            type: "post",
                                                            data: {
                                                                accion: "UPD",
                                                                idcita: idcita,
                                                                idpaciente: $("#idpaciente_upd").val(),
                                                                idmedico: $("#idmedico_upd").val(),
                                                                diahora: $("#diahora_upd").val()
                                                            },
                                                            success: function (error) {
                                                                if (error.length !== 0) {
                                                                    $("#error_citas_upd").html(error).show();

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

// ==============================================================
// Script Persona
// ==============================================================

function personaFind() {
    $("#dlg_persona_find").dialog({
        modal: true,
        width: 360,
        height: 330,
        buttons: {
            "Cerrar": function () {
                $(this).dialog("close");
            }
        }
    });

    $.ajax({
        url: "persona.txt",
        type: "post",
        datatype: "txt",
        data: {
            accion: "QRY"
        },
        success: function (data) {
            var msg = $(data).find('msg').text();

            if ($.trim(msg).length !== 0) {
                message("Data no Encontrada", msg);

            } else {
                var lista = "<table class=\"parainfo\" style=\"width:100%\"><tbody>";

                $(data).find('fil').each(function () {
                    var idpersona = $(this).find('col:eq(0)').text();
                    var persona = $(this).find('col:eq(1)').text();

                    lista += "<tr><td>"
                            + "<a class=\"parainfo\" href=\"#\" onclick=\"personaPinta('" + idpersona + "','" + persona + "');\">"
                            + persona
                            + "</a>"
                            + "</td></tr>";
                });

                lista += "</tbody></table>";

                // pinta lista de personas
                $("#personaLst").html(lista);
            }
        }
    });
}

function personaPinta(idpersona, persona) {
    $("#idpersona").val(idpersona);
    $("#persona_ins").val(persona);

    // cierra dialogo
    $("#dlg_persona_find").dialog("close");
}

function personaQry() {
    $("#error_persona_qry").html("").hide();
    // solicita data para grilla pacientes
    $.ajax({
        url: "empresa.txt",
        type: "post",
        datatype: "txt",
        data: {
            accion: "QRY"
        },
        success: function (data) {
            console.log(data);
            var msg = $(data).find('msg').text();

            if ($.trim(msg).length !== 0) {
                message("Data no Encontrada", msg);

            } else {
                var body = "";

                $(data).find('fil').each(function () {
                    var idpersona = $(this).find('col:eq(0)').text();
                    var nompersona = $(this).find('col:eq(1)').text();
                    var apepatpersona = $(this).find('col:eq(2)').text();
                    var apematpersona = $(this).find('col:eq(3)').text();
                    var birpersona = $(this).find('col:eq(4)').text();
                    var celpersona = $(this).find('col:eq(5)').text();

                    body += "<tr>"
                            + "<td id=\"nompersona_" + idpersona + "\">" + nompersona + "</td>"
                            + "<td id=\"apepatpersona_" + idpersona + "\">" + apepatpersona + "</td>"
                            + "<td id=\"apematpersona_" + idpersona + "\">" + apematpersona + "</td>"
                            + "<td id=\"birpersona_" + idpersona + "\">" + birpersona + "</td>"
                            + "<td colspan=\"2\" id=\"celpersona_" + idpersona + "\">" + celpersona + "</td>"
                            + "<td><input type=\"checkbox\" name=\"idpersona_del\" value=\"" + idpersona + "\"/></td>"
                            + "<td><input type=\"radio\" name=\"idpersona_upd\" value=\"" + idpersona + "\"/></td>"
                            + "</tr>";
                });

                // pinta data en grilla personas
                $("#body_persona").html(body);

                // muestra diálogo con grilla
                $("#dlg_persona_qry").dialog({
                    modal: true,
                    width: 800,
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

function personaIns(){
    $("#error_persona_ins").html("").hide();
    //

    $("#dlg_persona_ins").dialog({
        modal: true,
        width: 480,
        datatype: "xml",
        buttons: {
            "Cancelar": function () {
                $(this).dialog("close");
            },
            "Enviar Datos": function () {
                $.ajax({
                    url: "persona",
                    type: "post",
                    datatype: "xml",
                    data: {
                        accion: "INS",
                        nombre: $("#nompersona_ins").val(),
                        apepaterno: $("#apepaterno_ins").val(),
                        apematerno: $("#apematerno_ins").val(),
                        birthday: $("#birthday_ins").val(),
                        phone: $("#phone_ins").val()
                    },
                    success: function (data) {
                        var ctos = $(data).find("msg").size();

                        if (ctos > 0) {
                            var msg = "<ul>";
                            $(data).find("msg").each(function () {
                                msg += "<li>" + $(this).text() + "</li>";
                            });
                            msg += "</ul>";

                            $("#error_persona_ins").html(msg).show();

                        } else {
                            $("#dlg_persona_ins").dialog("close");
                            personaQry();
                        }
                    }
                });
            }
        }
    });
}

function personaDel(){
    var ids = [];
    $("input[name='idpersona_del']:checked").each(function () {
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
                        url: "persona",
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

function personaUpd(){
    var id = $("input[name='idpersona_upd']:checked").val();
    if (isNaN(id)) {
        message("Advertencia", "Seleccione Fila para Actualizar Datos");
    } else {
        $.ajax({
            url: "get.txt",
            type: "post",
            datatype: "txt",
            data: {
                accion: "GET",
                idcita: id
            },
            success: function (data) {
                var msg = $(data).find('msg').text();

                if ($.trim(msg).length !== 0) {
                    message("Data no Encontrada", msg);

                } else {
                    var idpersona = $(data).find('idpersona').attr('val');
                    var nompersona = $(data).find('nombre').attr('val');
                    var despersona = $(data).find('descripcion').attr('val');


                    $("#nompersona_upd").val(nompersona);
                    $("#despersona_upd").val(despersona);

                    $("#error_persona_upd").html("").hide();
                    
                    $("#dlg_persona_upd").dialog({
                        modal: true,
                        width: 480,
                        datatype: "xml",
                        buttons: {
                            "Cancelar": function () {
                                $(this).dialog("close");
                            },
                            "Enviar Datos": function () {
                                $.ajax({
                                    url: "persona",
                                    type: "post",
                                    datatype: "xml",
                                    data: {
                                        accion: "UPD",
                                        idmedico: id,
                                        idespecialidad: $("#medico_idespecialidad_upd").val(),
                                        nombre: $("#medico_upd").val()
                                    },
                                    success: function (data) {
                                        var ctos = $(data).find("msg").size();

                                        if (ctos > 0) {
                                            var msg = "<ul>";
                                            $(data).find("msg").each(function () {
                                                msg += "<li>" + $(this).text() + "</li>";
                                            });
                                            msg += "</ul>";

                                            $("#error_persona_upd").html(msg).show();

                                        } else {
                                            $("#dlg_persona_upd").dialog("close");
                                            personaQry();
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



// ==============================================================
// Scripts Campaña
// ==============================================================

$(function () {
    // datepicker
    $("#fechaini_ins, #fechafin_ins, #fechaini_upd, #fechafin_upd").datepicker({
        showOn: "button",
        buttonImage: "images/calendar.gif",
        buttonImageOnly: true,
        showAnim: 'slideDown',
        changeMonth: true,
        changeYear: true,
        yearRange: "1940:2020"
    });

    $("#fechaini_ins, #fechaini_upd").datepicker('setDate', new Date());
    $("#fechafin_ins, #fechafin_upd").datepicker('setDate', new Date());
    
    // timepicker
    $.timepicker.regional['es'] = {
        timeOnlyTitle: 'Seleccione Hora',
        timeText: 'hh:mm', 
        hourText: 'Hora',
        minuteText: 'Minutos',
        secondText: 'Segundos',
        currentText: 'Ahora',
        closeText: 'Aceptar',
        ampm: false
    };

    $.timepicker.setDefaults($.timepicker.regional['es']);
    $("#fechaini_ins, #fechafin_ins, #fechaini_upd, #fechafin_upd").datetimepicker({
        showOn: 'button',
        buttonImage: 'images/calendar.gif',
        buttonImageOnly: true,
        showAnim: 'slideDown',
        controlType: 'select',
        oneLine: true,
        timeFormat: 'hh:mm tt',
        yearRange: '2015:2020',
        changeMonth: true,
        changeYear: true,
        hour: 8,
        minute: 30,
        hourMin: 8,
        hourMax: 17
    });

    $("#fechaini_ins").datetimepicker('setDate', new Date());
    $("#fechafin_ins").datetimepicker('setDate', new Date());
});

function campanaIns(){
    // lectura para el combo empresa
    $.ajax({
        url: "Fabricante",
        type: "post",
        datatype: "xml",
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

                $("#idempresa_ins").html(option);
                // ---

                // lectura para el combo canal
                $.ajax({
                    url: "Canal",
                    type: "post",
                    datatype: "xml",
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

                            $("#idcanal_ins").html(option);
                            // combos cargaron data
                            $("#error_campana_ins").html("").hide();


                            $("#dlg_campana_ins").dialog({
                                modal: true,
                                width: 480,
                                buttons: {
                                    "Cancelar": function () {
                                        $(this).dialog("close");
                                    },
                                    "Enviar Datos": function () {
                                        $.ajax({
                                            url: "CampaniaPublicitaria",
                                            type: "post",
                                            data: {
                                                accion: "INS",
                                                nombre: $("#nombre_ins").val(),
                                                descripcion: $("#descripcion_ins").val(),
                                                fechaInicio: $("#fechaini_ins").val(),
                                                fechaFin: $("#fechafin_ins").val(),
                                                idFabricante: $("#idempresa_ins").val(),
                                                idCanal: $("#idcanal_ins").val()
                                            },
                                            success: function (error) {
                                                if (error.length !== 0) {
                                                    //console.log('entro en un error fatality' + error);
                                                	$("#error_campana_ins").html(error).show();
                                                    
                                                } else {
                                                	//console.log('logramos entrar correctamente');
                                                    window.location = "CampaniaPublicitaria?accion=QRY";
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

function campanaDel(){
    var ids = [];
    $("input[name='idcampana_del']:checked").each(function () {
        ids.push($(this).val());
    });
    if (ids.length === 0) {
        message("Advertencia", "Seleccione fila(s) a Retirar");
    } else {
        $("#p_message").html("Esta seguro de eliminar el/los registro(s) seleccionado(s) ?");
        $("#dlg_message").dialog({
            title: 'Eliminar Registro(s)',
        	modal: true,
            width: 440,
            buttons: {
                "No": function () {
                    $(this).dialog("close");
                },
                "Si": function () {
                    $(this).dialog("close");
                    //$('#content').html('<img id="loader-img" alt="" src="http://preloaders.net/preloaders/287/Filling%20broken%20ring.gif" width="100" height="100" align="center" />');
                    $.ajax({
                        url: "CampaniaPublicitaria",
                        type: "post",
                        data: {
                            accion: "DEL",
                            ids: ids.toString()
                        },
                        success: function (error) {
                            if (error.length !== 0) {
                                message("Error", error);

                            } else {
                            	/*setTimeout(function () {
                            		$('#content').html('Excelente!!').addClass('border');
                            	},3000);*/
                            	window.location = "CampaniaPublicitaria?accion=QRY";
                            }
                        }
                    });
                }
            }
        });
    }
}

function campanaUpd(){
    var id = $("input[name='idcampana_upd']:checked").val();
    if (isNaN(id)) {
        message("Advertencia", "Seleccione Fila para Actualizar Datos");
        }else{
        // pidiendo datos de campana
        $.ajax({
            url: "CampaniaPublicitaria",
            type: "post",
            datatype: "xml",
            data: {
                accion: "GET",
                idCampania: id
            },
            success: function (data) {
                var msg = $(data).find('msg').text();

                if ($.trim(msg).length !== 0) {
                    message("Data no Encontrada", msg);

                } else {
                    var idcampana = $(data).find('idCampania').attr('val');
                    var nomcampana = $(data).find('nombre').attr('val');
                    var descampana = $(data).find('descripcion').attr('val');
                    var fecinicampana = $(data).find('fecIni').attr('val');
                    var fecfincampana = $(data).find('fecFin').attr('val');
                    var idempresa = $(data).find('idFabricante').attr('val');
                    var idcanal = $(data).find('idCanal').attr('val');
                    
                    console.log('fecha inicio:' + fecinicampana);
                    
                    $("#idcampana_upd").val(idcampana);
                    $("#nombre_upd").val(nomcampana);
                    $("#descripcion_upd").val(descampana);
                    $("#fechaini_upd").val(fecinicampana);
                    $("#fechafin_upd").val(fecfincampana);

                    // lectura para el combo empresas
                    $.ajax({
                        url: "Fabricante",
                        type: "post",
                        datatype: "xml",
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

                                $("#idempresa_upd").html(option);
                                $("#idempresa_upd").val(idempresa);
                                // ---
                                // Lectura para el combo de canales
                                $.ajax({
                                    url: "Canal",
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

                                            $("#idcanal_upd").html(option);
                                            $("#idcanal_upd").val(idcanal);
                                            // ---
                                            // todo Ok
                                            $("#error_campana_upd").html("").hide();

                                            $("#dlg_campana_upd").dialog({
                                                modal: true,
                                                width: 480,
                                                buttons: {
                                                    "Cancelar": function () {
                                                        $(this).dialog("close");
                                                    },
                                                    "Enviar Datos": function () {
                                                        $.ajax({
                                                            url: "CampaniaPublicitaria",
                                                            type: "post",
                                                            data: {
                                                                accion: "UPD",
                                                                id: id,
                                                                nombre: $("#nombre_upd").val(),
                                                                descripcion: $("#descripcion_upd").val(),
                                                                fechaInicio: $("#fechaini_upd").val(),
                                                                fechaFin: $("#fechafin_upd").val(),
                                                                idFabricante: $("#idempresa_upd").val(),
                                                                idCanal: $("#idcanal_upd").val()
                                                            },
                                                            success: function (error) {
                                                                if (error.length !== 0) {
                                                                    $("#error_campana_upd").html(error).show();

                                                                } else {
                                                                    window.location = "CampaniaPublicitaria?accion=QRY";
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

// ==============================================================
// Scripts Empresa
// ==============================================================

function empresaQry() {
	$("#error_empresa_qry").html("").hide();
    // solicita data para grilla pacientes
    $.ajax({
        url: "Fabricante",
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
                console.log(data);
                $(data).find('fil').each(function () {
                    var idempresa = $(this).find('col:eq(0)').text();
                    var nombre = $(this).find('col:eq(1)').text();
                    var descripcion = $(this).find('col:eq(2)').text();

                    body += "<tr>"
                            + "<td id=\"empresa_" + idempresa + "\">" + nombre + "</td>"
                            + "<td colspan=\"2\" id=\"nacimiento_" + idempresa + "\">" + descripcion + "</td>"
                            + "<td><input type=\"checkbox\" name=\"idempresa_del\" value=\"" + idempresa + "\"/></td>"
                            + "<td><input type=\"radio\" name=\"idempresa_upd\" value=\"" + idempresa + "\"/></td>"
                            + "</tr>";
                });

                // pinta data en grilla empresas
                $("#body_empresa").html(body);

                // muestra diálogo con grilla
                $("#dlg_empresa_qry").dialog({
                    modal: true,
                    width: 500,
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

function empresaIns(){
    $("#error_empresa_ins").html("").hide();
    //

    $("#dlg_empresa_ins").dialog({
        modal: true,
        width: 480,
        datatype: "xml",
        buttons: {
            "Cancelar": function () {
                $(this).dialog("close");
            },
            "Enviar Datos": function () {
                $.ajax({
                    url: "Empresa",
                    type: "post",
                    datatype: "xml",
                    data: {
                        accion: "INS",
                        idespecialidad: $("#medico_idespecialidad_ins").val(),
                        nombre: $("#medico_ins").val()
                    },
                    success: function (data) {
                        var ctos = $(data).find("msg").size();

                        if (ctos > 0) {
                            var msg = "<ul>";
                            $(data).find("msg").each(function () {
                                msg += "<li>" + $(this).text() + "</li>";
                            });
                            msg += "</ul>";

                            $("#error_empresa_ins").html(msg).show();

                        } else {
                            $("#dlg_empresa_ins").dialog("close");
                            empresaQry();
                        }
                    }
                });
            }
        }
    });
}

function empresaDel(){
    var ids = [];
    $("input[name='idempresa_del']:checked").each(function () {
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
                        url: "empresa",
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

function empresaUpd(){
    var id = $("input[name='idempresa_upd']:checked").val();
    if (isNaN(id)) {
        message("Advertencia", "Seleccione Fila para Actualizar Datos");
    } else {
        $.ajax({
            url: "get.txt",
            type: "post",
            datatype: "txt",
            data: {
                accion: "GET",
                idcita: id
            },
            success: function (data) {
                var msg = $(data).find('msg').text();

                if ($.trim(msg).length !== 0) {
                    message("Data no Encontrada", msg);

                } else {
                    var idempresa = $(data).find('idempresa').attr('val');
                    var nomempresa = $(data).find('nombre').attr('val');
                    var desempresa = $(data).find('descripcion').attr('val');


                    $("#nomempresa_upd").val(nomempresa);
                    $("#desempresa_upd").val(desempresa);

                    $("#error_empresa_upd").html("").hide();
                    
                    $("#dlg_empresa_upd").dialog({
                        modal: true,
                        width: 480,
                        datatype: "xml",
                        buttons: {
                            "Cancelar": function () {
                                $(this).dialog("close");
                            },
                            "Enviar Datos": function () {
                                $.ajax({
                                    url: "Empresa",
                                    type: "post",
                                    datatype: "xml",
                                    data: {
                                        accion: "UPD",
                                        idmedico: id,
                                        idespecialidad: $("#medico_idespecialidad_upd").val(),
                                        nombre: $("#medico_upd").val()
                                    },
                                    success: function (data) {
                                        var ctos = $(data).find("msg").size();

                                        if (ctos > 0) {
                                            var msg = "<ul>";
                                            $(data).find("msg").each(function () {
                                                msg += "<li>" + $(this).text() + "</li>";
                                            });
                                            msg += "</ul>";

                                            $("#error_empresa_upd").html(msg).show();

                                        } else {
                                            $("#dlg_empresa_upd").dialog("close");
                                            empresaQry();
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

// ==============================================================
// Scripts Perfil
// ==============================================================

function perfilQry() {
    $("#error_perfil_qry").html("").hide();
    // solicita data para grilla pacientes
    $.ajax({
        url: "empresa.txt",
        type: "post",
        datatype: "txt",
        data: {
            accion: "QRY"
        },
        success: function (data) {
            var msg = $(data).find('msg').text();

            if ($.trim(msg).length !== 0) {
                message("Data no Encontrada", msg);

            } else {
                var body = "";
                console.log(data);
                $(data).find('fil').each(function () {
                    var idperfil = $(this).find('col:eq(0)').text();
                    var nombre = $(this).find('col:eq(1)').text();
                    var descripcion = $(this).find('col:eq(2)').text();

                    body += "<tr>"
                            + "<td id=\"perfil_" + idperfil + "\">" + nombre + "</td>"
                            + "<td colspan=\"2\" id=\"nacimiento_" + idperfil + "\">" + descripcion + "</td>"
                            + "<td><input type=\"checkbox\" name=\"idperfil_del\" value=\"" + idperfil + "\"/></td>"
                            + "<td><input type=\"radio\" name=\"idperfil_upd\" value=\"" + idperfil + "\"/></td>"
                            + "</tr>";
                });

                // pinta data en grilla perfils
                $("#body_perfil").html(body);

                // muestra diálogo con grilla
                $("#dlg_perfil_qry").dialog({
                    modal: true,
                    width: 500,
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

function perfilIns(){
    $("#error_perfil_ins").html("").hide();
    //

    $("#dlg_perfil_ins").dialog({
        modal: true,
        width: 480,
        datatype: "xml",
        buttons: {
            "Cancelar": function () {
                $(this).dialog("close");
            },
            "Enviar Datos": function () {
                $.ajax({
                    url: "perfil",
                    type: "post",
                    datatype: "xml",
                    data: {
                        accion: "INS",
                        idespecialidad: $("#medico_idespecialidad_ins").val(),
                        nombre: $("#medico_ins").val()
                    },
                    success: function (data) {
                        var ctos = $(data).find("msg").size();

                        if (ctos > 0) {
                            var msg = "<ul>";
                            $(data).find("msg").each(function () {
                                msg += "<li>" + $(this).text() + "</li>";
                            });
                            msg += "</ul>";

                            $("#error_perfil_ins").html(msg).show();

                        } else {
                            $("#dlg_perfil_ins").dialog("close");
                            perfilQry();
                        }
                    }
                });
            }
        }
    });
}

function perfilDel(){
    var ids = [];
    $("input[name='idperfil_del']:checked").each(function () {
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
                        url: "perfil",
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

function perfilUpd(){
    var id = $("input[name='idperfil_upd']:checked").val();
    if (isNaN(id)) {
        message("Advertencia", "Seleccione Fila para Actualizar Datos");
    } else {
        $.ajax({
            url: "get.txt",
            type: "post",
            datatype: "txt",
            data: {
                accion: "GET",
                idcita: id
            },
            success: function (data) {
                var msg = $(data).find('msg').text();

                if ($.trim(msg).length !== 0) {
                    message("Data no Encontrada", msg);

                } else {
                    var idperfil = $(data).find('idperfil').attr('val');
                    var nomperfil = $(data).find('nombre').attr('val');
                    var desperfil = $(data).find('descripcion').attr('val');


                    $("#nomperfil_upd").val(nomperfil);
                    $("#desperfil_upd").val(desperfil);

                    $("#error_perfil_upd").html("").hide();
                    
                    $("#dlg_perfil_upd").dialog({
                        modal: true,
                        width: 480,
                        datatype: "xml",
                        buttons: {
                            "Cancelar": function () {
                                $(this).dialog("close");
                            },
                            "Enviar Datos": function () {
                                $.ajax({
                                    url: "perfil",
                                    type: "post",
                                    datatype: "xml",
                                    data: {
                                        accion: "UPD",
                                        idmedico: id,
                                        idespecialidad: $("#medico_idespecialidad_upd").val(),
                                        nombre: $("#medico_upd").val()
                                    },
                                    success: function (data) {
                                        var ctos = $(data).find("msg").size();

                                        if (ctos > 0) {
                                            var msg = "<ul>";
                                            $(data).find("msg").each(function () {
                                                msg += "<li>" + $(this).text() + "</li>";
                                            });
                                            msg += "</ul>";

                                            $("#error_perfil_upd").html(msg).show();

                                        } else {
                                            $("#dlg_perfil_upd").dialog("close");
                                            perfilQry();
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

// ==============================================================
// Scripts Canal
// ==============================================================

function canalQry(){
    $("#error_canal_qry").html("").hide();
    $.ajax({
        url: "Canal",
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
                    var idcanal = $(this).find('col:eq(0)').text();
                    var nombre = $(this).find('col:eq(1)').text();
                    var descripcion = $(this).find('col:eq(2)').text();

                    body += "<tr>"
                            + "<td id=\"nombre_" + idcanal + "\">" + nombre + "</td>"
                            + "<td colspan=\"2\" id=\"descripcion_" + idcanal + "\">" + descripcion + "</td>"
                            + "<td><input type=\"checkbox\" name=\"idcanal_del\" value=\"" + idcanal + "\"/></td>"
                            + "<td><input type=\"radio\" name=\"idcanal_upd\" value=\"" + idcanal + "\"/></td>"
                            + "</tr>";
                });

                // pinta data en grilla canal
                $("#body_canal").html(body);

                // muestra diálogo con grilla
                $("#dlg_canal_qry").dialog({
                    modal: true,
                    width: 800,
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


function canalIns(){
	$("#descanal_ins").val("");
	$("#nomcanal_ins").val("");
    $("#error_canal_ins").html("").hide();
    //

    $("#dlg_canal_ins").dialog({
        modal: true,
        width: 480,
        datatype: "xml",
        buttons: {
            "Cancelar": function () {
                $(this).dialog("close");
            },
            "Enviar Datos": function () {
                $.ajax({
                    url: "Canal",
                    type: "post",
                    datatype: "xml",
                    data: {
                        accion: "INS",
                        descripcion: $("#descanal_ins").val(),
                        nombre: $("#nomcanal_ins").val()
                    },
                    success: function (data) {
                        var ctos = $(data).find("msg").size();

                        if (ctos > 0) {
                            var msg = "<ul>";
                            $(data).find("msg").each(function () {
                                msg += "<li>" + $(this).text() + "</li>";
                            });
                            msg += "</ul>";

                            $("#error_canal_ins").html(msg).show();

                        } else {
                            $("#dlg_canal_ins").dialog("close");
                            canalQry();
                        }
                    }
                });
            }
        }
    });
}

function canalUpd(){
    var id = $("input[name='idcanal_upd']:checked").val();
    if (isNaN(id)) {
        message("Advertencia", "Seleccione Fila para Actualizar Datos");
    } else {
        $("#nomcanal_upd").val($("#nombre_" + id).text());
        $("#descanal_upd").val($("#descripcion_" + id).text());
        $("#error_canal_upd").html("").hide();
        //

        $("#dlg_canal_upd").dialog({
            modal: true,
            width: 480,
            datatype: "xml",
            buttons: {
                "Cancelar": function () {
                    $(this).dialog("close");
                },
                "Enviar Datos": function () {
                    $.ajax({
                        url: "Canal",
                        type: "post",
                        datatype: "xml",
                        data: {
                            accion: "UPD",
                            id: id,
                            nombre: $("#nomcanal_upd").val(),
                            descripcion: $("#descanal_upd").val()
                        },
                        success: function (data) {
                            var ctos = $(data).find("msg").size();

                            if (ctos > 0) {
                                var msg = "<ul>";
                                $(data).find("msg").each(function () {
                                    msg += "<li>" + $(this).text() + "</li>";
                                });
                                msg += "</ul>";

                                $("#error_canal_upd").html(msg).show();

                            } else {
                                $("#dlg_canal_upd").dialog("close");
                                canalQry();
                            }
                        }
                    });
                }
            }
        });
    }
}

function canalDel(){
    var ids = [];
    $("input[name='idcanal_del']:checked").each(function () {
        ids.push($(this).val());
    });
    if (ids.length === 0) {
        message("Advertencia", "Seleccione fila(s) a Retirar");
    } else {
        $("#p_message").html("¿ Retirar registro(s) ?");
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
                        url: "Canal",
                        type: "post",
                        data: {
                            accion: "DEL",
                            ids: ids.toString()
                        },
                        success: function (data) {
                            var ctos = $(data).find("msg").size();

                            if (ctos > 0) {
                                var msg = "<ul>";
                                $(data).find("msg").each(function () {
                                    msg += "<li>" + $(this).text() + "</li>";
                                });
                                msg += "</ul>";

                                $("#error_canal_qry").html(msg).show();

                            } else {
                            	canalQry();
                            }
                        }
                    });
                }
            }
        });
    }
}

// ==============================================================
// Scripts Producto
// ==============================================================

function productoIns(){
    // lectura para el combo Clasificacion
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

                $("#idclasificacion_ins").html(option);
                // ---

                // combos cargaron data
                $("#error_producto_ins").html("").hide();

                $("#dlg_producto_ins").dialog({
                    modal: true,
                    width: 480,
                    buttons: {
                        "Cancelar": function () {
                            $(this).dialog("close");
                        },
                        "Enviar Datos": function () {
                            $.ajax({
                                url: "Producto",
                                type: "post",
                                data: {
                                    accion: "INS",
                                    skuproducto: $("#sku_ins").val(),
                                    nomproducto: $("#nombre_ins").val(),
                                    desproducto: $("#descripcion_ins").val(),
                                    claproducto: $("#idclasificacion_ins").val()
                                },
                                success: function (error) {
                                    if (error.length !== 0) {
                                        $("#error_producto_ins").html(error).show();

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


function productoUpd(){
    var id = $("input[name='idproducto_upd']:checked").val();
    if (isNaN(id)) {
        message("Advertencia", "Seleccione Fila para Actualizar Datos");
    } else {
        $.ajax({
            url: "get.txt",
            type: "post",
            datatype: "txt",
            data: {
                accion: "GET",
                idcita: id
            },
            success: function (data) {
                var msg = $(data).find('msg').text();

                if ($.trim(msg).length !== 0) {
                    message("Data no Encontrada", msg);

                } else {
                    var ideproducto = $(data).find('id').attr('val');
                    var skuproducto = $(data).find('sku').attr('val');
                    var nomproducto = $(data).find('nombre').attr('val');
                    var desproducto = $(data).find('descripcion').attr('val');
                    var ideclaproducto = $(data).find('idclasificacion').attr('val');

                    $("#sku_upd").val(skuproducto);
                    $("#nombre_upd").val(nomproducto);
                    $("#descripcion_upd").val(desproducto);

                    // Lectura para el combo de Clasificacion
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

                                $("#idclasificacion_upd").html(option);
                                $("#idclasificacion_upd").val(ideclaproducto);
                                // ---
                                // todo Ok
                                $("#error_producto_upd").html("").hide();

                                $("#dlg_producto_upd").dialog({
                                    modal: true,
                                    width: 480,
                                    buttons: {
                                        "Cancelar": function () {
                                            $(this).dialog("close");
                                        },
                                        "Enviar Datos": function () {
                                            $.ajax({
                                                url: "producto",
                                                type: "post",
                                                data: {
                                                    accion: "UPD",
                                                    id: ideproducto,
                                                    sku: $("#sku_upd").val(),
                                                    nombre: $("#nombre_upd").val(),
                                                    descripcion: $("#descripcion_upd").val(),
                                                    idclasificacion: $("#idclasificacion_upd").val()
                                                },
                                                success: function (error) {
                                                    if (error.length !== 0) {
                                                        $("#error_citas_upd").html(error).show();

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

function productoDel(){
    var ids = [];
    $("input[name='idproducto_del']:checked").each(function () {
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
                        url: "producto",
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

// ==============================================================
// Scripts Clasificacion
// ==============================================================
function clasificacionQry() {
    $("#error_clasificacion_qry").html("").hide();
    // solicita data para grilla pacientes
    $.ajax({
        url: "empresa.txt",
        type: "post",
        datatype: "txt",
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
                    var idclasificacion = $(this).find('col:eq(0)').text();
                    var nomempresa = $(this).find('col:eq(1)').text();
                    var nomcategoria = $(this).find('col:eq(2)').text();
                    var nommarca = $(this).find('col:eq(3)').text();

                    body += "<tr>"
                            + "<td colspan=\"2\" id=\"nomempresa_" + idclasificacion + "\">" + nomempresa + "</td>"
                            + "<td colspan=\"2\" id=\"nomcategoria_" + idclasificacion + "\">" + nomcategoria + "</td>"
                            + "<td colspan=\"3\" id=\"nommarca_" + idclasificacion + "\">" + nommarca + "</td>"
                            + "<td><input type=\"checkbox\" name=\"idclasificacion_del\" value=\"" + idclasificacion + "\"/></td>"
                            + "<td><input type=\"radio\" name=\"idclasificacion_upd\" value=\"" + idclasificacion + "\"/></td>"
                            + "</tr>";
                });

                // pinta data en grilla clasificacions
                $("#body_clasificacion").html(body);

                // muestra diálogo con grilla
                $("#dlg_clasificacion_qry").dialog({
                    modal: true,
                    width: 500,
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



function clasificacionIns(){
    // lectura para el combo Empresas
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

                $("#idempresa_ins").html(option);
                
                // lectura para el combo de Categorias
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

                            $("#idcategoria_ins").html(option);
                            
                            // lectura para el combo de marcas
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

                                        $("#idmarca_ins").html(option);
                                        // ---
                                        // combos cargaron data
                                        $("#error_clasificacion_ins").html("").hide();

                                        $("#dlg_clasificacion_ins").dialog({
                                            modal: true,
                                            width: 480,
                                            buttons: {
                                                "Cancelar": function () {
                                                    $(this).dialog("close");
                                                },
                                                "Enviar Datos": function () {
                                                    $.ajax({
                                                        url: "clasificacion",
                                                        type: "post",
                                                        data: {
                                                            accion: "INS",
                                                            idempresa: $("#idempresa_ins").val(),
                                                            idcategoria: $("#idcategoria_ins").val(),
                                                            idmarca: $("#idmarca_ins").val()
                                                        },
                                                        success: function (error) {
                                                            if (error.length !== 0) {
                                                                $("#error_clasificacion_ins").html(error).show();

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


function clasificacionUpd(){
    var id = $("input[name='idclasificacion_upd']:checked").val();
    if (isNaN(id)) {
        message("Advertencia", "Seleccione Fila para Actualizar Datos");
    } else {
        $.ajax({
            url: "get.txt",
            type: "post",
            datatype: "txt",
            data: {
                accion: "GET",
                idcita: id
            },
            success: function (data) {
                var msg = $(data).find('msg').text();

                if ($.trim(msg).length !== 0) {
                    message("Data no Encontrada", msg);

                } else {
                    var ideclasificacion = $(data).find('id').attr('val');
                    var ideempresa       = $(data).find('idempresa').attr('val');
                    var idecategoria     = $(data).find('idcategoria').attr('val');
                    var idemarca         = $(data).find('idmarca').attr('val');

                    // Lectura para el combo de Empresa
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

                                $("#idempresa_upd").html(option);
                                $("#idempresa_upd").val(ideempresa);
                                // ---
                                // Lectura para el combo de Categorias
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

                                            $("#idcategoria_upd").html(option);
                                            $("#idcategoria_upd").val(idecategoria);
                                            // ---
                                            // Lectura para el combo de Marcas
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

                                                        $("#idmarca_upd").html(option);
                                                        $("#idmarca_upd").val(idemarca);
                                                        // ---
                                                        // ---
                                                        // todo Ok
                                                        $("#error_clasificacion_upd").html("").hide();

                                                        $("#dlg_clasificacion_upd").dialog({
                                                            modal: true,
                                                            width: 480,
                                                            buttons: {
                                                                "Cancelar": function () {
                                                                    $(this).dialog("close");
                                                                },
                                                                "Enviar Datos": function () {
                                                                    $.ajax({
                                                                        url: "clasificacion",
                                                                        type: "post",
                                                                        data: {
                                                                            accion: "UPD",
                                                                            id: ideclasificacion,
                                                                            idempresa:   $("#idempresa_upd").val(),
                                                                            idcategoria: $("#idcategoria_upd").val(),
                                                                            idmarca:     $("#idmarca_upd").val()
                                                                        },
                                                                        success: function (error) {
                                                                            if (error.length !== 0) {
                                                                                $("#error_clasificacion_upd").html(error).show();

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

function clasificacionDel(){
    var ids = [];
    $("input[name='idclasificacion_del']:checked").each(function () {
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
                        url: "clasificacion",
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

// ==============================================================
// Scripts Categoria
// ==============================================================

function categoriaQry() {
    $("#error_categoria_qry").html("").hide();
    // solicita data para grilla categorias
    $.ajax({
        url: "empresa.txt",
        type: "post",
        datatype: "txt",
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
                    var idcategoria = $(this).find('col:eq(0)').text();
                    var nombre = $(this).find('col:eq(1)').text();
                    var descripcion = $(this).find('col:eq(2)').text();

                    body += "<tr>"
                            + "<td id=\"nombre_" + idcategoria + "\">" + nombre + "</td>"
                            + "<td colspan=\"2\" id=\"descripcion_" + idcategoria + "\">" + descripcion + "</td>"
                            + "<td><input type=\"checkbox\" name=\"idcategoria_del\" value=\"" + idcategoria + "\"/></td>"
                            + "<td><input type=\"radio\" name=\"idcategoria_upd\" value=\"" + idcategoria + "\"/></td>"
                            + "</tr>";
                });

                // pinta data en grilla categorias
                $("#body_categoria").html(body);

                // muestra diálogo con grilla
                $("#dlg_categoria_qry").dialog({
                    modal: true,
                    width: 500,
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

function categoriaIns(){
    $("#error_categoria_ins").html("").hide();
    //

    $("#dlg_categoria_ins").dialog({
        modal: true,
        width: 480,
        datatype: "xml",
        buttons: {
            "Cancelar": function () {
                $(this).dialog("close");
            },
            "Enviar Datos": function () {
                $.ajax({
                    url: "categoria",
                    type: "post",
                    datatype: "xml",
                    data: {
                        accion: "INS",
                        nombre: $("#nomcategoria_ins").val(),
                        descricion: $("#descategoria_ins").val()
                    },
                    success: function (data) {
                        var ctos = $(data).find("msg").size();

                        if (ctos > 0) {
                            var msg = "<ul>";
                            $(data).find("msg").each(function () {
                                msg += "<li>" + $(this).text() + "</li>";
                            });
                            msg += "</ul>";

                            $("#error_categoria_ins").html(msg).show();

                        } else {
                            $("#dlg_categoria_ins").dialog("close");
                            categoriaQry();
                        }
                    }
                });
            }
        }
    });
}

function categoriaDel(){
    var ids = [];
    $("input[name='idcategoria_del']:checked").each(function () {
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
                        url: "categoria",
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

function categoriaUpd(){
    var id = $("input[name='idcategoria_upd']:checked").val();
    if (isNaN(id)) {
        message("Advertencia", "Seleccione Fila para Actualizar Datos");
    } else {
        $.ajax({
            url: "get.txt",
            type: "post",
            datatype: "txt",
            data: {
                accion: "GET",
                idcita: id
            },
            success: function (data) {
                var msg = $(data).find('msg').text();

                if ($.trim(msg).length !== 0) {
                    message("Data no Encontrada", msg);

                } else {
                    var idcategoria = $(data).find('id').attr('val');
                    var nomcategoria = $(data).find('nombre').attr('val');
                    var descategoria = $(data).find('descripcion').attr('val');


                    $("#nomcategoria_upd").val(nomcategoria);
                    $("#descategoria_upd").val(descategoria);

                    $("#error_categoria_upd").html("").hide();
                    
                    $("#dlg_categoria_upd").dialog({
                        modal: true,
                        width: 480,
                        datatype: "xml",
                        buttons: {
                            "Cancelar": function () {
                                $(this).dialog("close");
                            },
                            "Enviar Datos": function () {
                                $.ajax({
                                    url: "categoria",
                                    type: "post",
                                    datatype: "xml",
                                    data: {
                                        accion: "UPD",
                                        id: idcategoria,
                                        nombre: $("#nomcategoria_upd").val(),
                                        descripion: $("#descategoria_upd").val()
                                    },
                                    success: function (data) {
                                        var ctos = $(data).find("msg").size();

                                        if (ctos > 0) {
                                            var msg = "<ul>";
                                            $(data).find("msg").each(function () {
                                                msg += "<li>" + $(this).text() + "</li>";
                                            });
                                            msg += "</ul>";

                                            $("#error_categoria_upd").html(msg).show();

                                        } else {
                                            $("#dlg_categoria_upd").dialog("close");
                                            categoriaQry();
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

// ==============================================================
// Scripts Marca
// ==============================================================

function marcaQry() {
    $("#error_marca_qry").html("").hide();
    // solicita data para grilla marcas
    $.ajax({
        url: "empresa.txt",
        type: "post",
        datatype: "txt",
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
                    var idmarca = $(this).find('col:eq(0)').text();
                    var nombre = $(this).find('col:eq(1)').text();
                    var descripcion = $(this).find('col:eq(2)').text();

                    body += "<tr>"
                            + "<td id=\"nombre_" + idmarca + "\">" + nombre + "</td>"
                            + "<td colspan=\"2\" id=\"descripcion_" + idmarca + "\">" + descripcion + "</td>"
                            + "<td><input type=\"checkbox\" name=\"idmarca_del\" value=\"" + idmarca + "\"/></td>"
                            + "<td><input type=\"radio\" name=\"idmarca_upd\" value=\"" + idmarca + "\"/></td>"
                            + "</tr>";
                });

                // pinta data en grilla marcas
                $("#body_marca").html(body);

                // muestra diálogo con grilla
                $("#dlg_marca_qry").dialog({
                    modal: true,
                    width: 500,
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

function marcaIns(){
    $("#error_marca_ins").html("").hide();
    //

    $("#dlg_marca_ins").dialog({
        modal: true,
        width: 480,
        datatype: "xml",
        buttons: {
            "Cancelar": function () {
                $(this).dialog("close");
            },
            "Enviar Datos": function () {
                $.ajax({
                    url: "marca",
                    type: "post",
                    datatype: "xml",
                    data: {
                        accion: "INS",
                        nombre: $("#nommarca_ins").val(),
                        descripcion: $("#desmarca_ins").val()
                    },
                    success: function (data) {
                        var ctos = $(data).find("msg").size();

                        if (ctos > 0) {
                            var msg = "<ul>";
                            $(data).find("msg").each(function () {
                                msg += "<li>" + $(this).text() + "</li>";
                            });
                            msg += "</ul>";

                            $("#error_marca_ins").html(msg).show();

                        } else {
                            $("#dlg_marca_ins").dialog("close");
                            marcaQry();
                        }
                    }
                });
            }
        }
    });
}

function marcaDel(){
    var ids = [];
    $("input[name='idmarca_del']:checked").each(function () {
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
                        url: "marca",
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

function marcaUpd(){
    var id = $("input[name='idmarca_upd']:checked").val();
    if (isNaN(id)) {
        message("Advertencia", "Seleccione Fila para Actualizar Datos");
    } else {
        $.ajax({
            url: "get.txt",
            type: "post",
            datatype: "txt",
            data: {
                accion: "GET",
                idcita: id
            },
            success: function (data) {
                var msg = $(data).find('msg').text();

                if ($.trim(msg).length !== 0) {
                    message("Data no Encontrada", msg);

                } else {
                    var idmarca = $(data).find('id').attr('val');
                    var nommarca = $(data).find('nombre').attr('val');
                    var desmarca = $(data).find('descripcion').attr('val');


                    $("#nommarca_upd").val(nommarca);
                    $("#desmarca_upd").val(desmarca);

                    $("#error_marca_upd").html("").hide();
                    
                    $("#dlg_marca_upd").dialog({
                        modal: true,
                        width: 480,
                        datatype: "xml",
                        buttons: {
                            "Cancelar": function () {
                                $(this).dialog("close");
                            },
                            "Enviar Datos": function () {
                                $.ajax({
                                    url: "marca",
                                    type: "post",
                                    datatype: "xml",
                                    data: {
                                        accion: "UPD",
                                        id: idmarca,
                                        nombre: $("#nommarca_upd").val(),
                                        descripion: $("#desmarca_upd").val()
                                    },
                                    success: function (data) {
                                        var ctos = $(data).find("msg").size();

                                        if (ctos > 0) {
                                            var msg = "<ul>";
                                            $(data).find("msg").each(function () {
                                                msg += "<li>" + $(this).text() + "</li>";
                                            });
                                            msg += "</ul>";

                                            $("#error_marca_upd").html(msg).show();

                                        } else {
                                            $("#dlg_marca_upd").dialog("close");
                                            marcaQry();
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

// ==============================================================
// Scripts Punto de Venta (PDV)
// ==============================================================

function pdvIns(){
    // lectura para el combo 'Tipo de PDV'
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

                $("#idtippdv_ins").html(option);
                // ---

                // lectura para el combo canal
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

                            $("#idubigeo").html(option);
                            // combos cargaron data
                            $("#error_pdv_ins").html("").hide();


                            $("#dlg_pdv_ins").dialog({
                                modal: true,
                                width: 480,
                                buttons: {
                                    "Cancelar": function () {
                                        $(this).dialog("close");
                                    },
                                    "Enviar Datos": function () {
                                        $.ajax({
                                            url: "PDV",
                                            type: "post",
                                            data: {
                                                accion: "INS",
                                                razonsocial: $("#razon_ins").val(),
                                                direccion: $("#direccion_ins").val(),
                                                telefono: $("#telefono_ins").val(),
                                                idtipopdv: $("#idtippdv_ins").val(),
                                                idubigeo: $("#idubigeo").val()
                                            },
                                            success: function (error) {
                                                if (error.length !== 0) {
                                                    $("#error_pdv_ins").html(error).show();

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

function pdvDel(){
    var ids = [];
    $("input[name='idpdv_del']:checked").each(function () {
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
                        url: "pdv",
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

function pdvUpd(){
    var id = $("input[name='idpdv_upd']:checked").val();
    if (isNaN(id)) {
        message("Advertencia", "Seleccione Fila para Actualizar Datos");
        }else{
        // pidiendo datos de pdv
        $.ajax({
            url: "get.txt",
            type: "post",
            datatype: "txt",
            data: {
                accion: "GET",
                idpdv: id
            },
            success: function (data) {
                var msg = $(data).find('msg').text();

                if ($.trim(msg).length !== 0) {
                    message("Data no Encontrada", msg);

                } else {
                    var idpdv = $(data).find('id').attr('val');
                    var razonsocial = $(data).find('razonsocial').attr('val');
                    var direccion = $(data).find('direccion').attr('val');
                    var telefono = $(data).find('telefono').attr('val');
                    var idtippdv = $(data).find('idtippdv').attr('val');
                    var idubigeo = $(data).find('idubigeo').attr('val');

                    $("#razon_upd").val(razonsocial);
                    $("#direccion_upd").val(direccion);
                    $("#telefono_upd").val(telefono);
                    $("#idtippdv_upd").val(idtippdv);
                    $("#idubigeo").val(idubigeo);

                    // lectura para el combo 'Tipo de PDV'
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

                                $("#idtippdv_upd").html(option);
                                $("#idtippdv_upd").val(idtippdv);
                                // ---
                                // Lectura para el combo de canales
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

                                            $("#idubigeo").html(option);
                                            $("#idubigeo").val(idubigeo);
                                            // ---
                                            // todo Ok
                                            $("#error_pdv_upd").html("").hide();

                                            $("#dlg_pdv_upd").dialog({
                                                modal: true,
                                                width: 480,
                                                buttons: {
                                                    "Cancelar": function () {
                                                        $(this).dialog("close");
                                                    },
                                                    "Enviar Datos": function () {
                                                        $.ajax({
                                                            url: "pdv",
                                                            type: "post",
                                                            data: {
                                                                accion: "UPD",
                                                                idpdv: idpdv,
                                                                razonsocial: $("#razon_upd").val(),
                                                                direccion: $("#direccion_upd").val(),
                                                                telefono: $("#telefono_upd").val(),
                                                                idtippdv: $("#idtippdv_upd").val(),
                                                                idubigeo: $("#idubigeo").val()
                                                            },
                                                            success: function (error) {
                                                                if (error.length !== 0) {
                                                                    $("#error_pdv_upd").html(error).show();

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

// ==============================================================
// Scripts Tipo de PDV
// ==============================================================

function tippdvQry() {
    $("#error_tippdv_qry").html("").hide();
    // solicita data para grilla pacientes
    $.ajax({
        url: "empresa.txt",
        type: "post",
        datatype: "txt",
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
                    var idtippdv = $(this).find('col:eq(0)').text();
                    var nombre = $(this).find('col:eq(1)').text();
                    var descripcion = $(this).find('col:eq(2)').text();

                    body += "<tr>"
                            + "<td id=\"nombre_" + idtippdv + "\">" + nombre + "</td>"
                            + "<td colspan=\"2\" id=\"descripcion_" + idtippdv + "\">" + descripcion + "</td>"
                            + "<td><input type=\"checkbox\" name=\"idtippdv_del\" value=\"" + idtippdv + "\"/></td>"
                            + "<td><input type=\"radio\" name=\"idtippdv_upd\" value=\"" + idtippdv + "\"/></td>"
                            + "</tr>";
                });

                // pinta data en grilla tippdvs
                $("#body_tippdv").html(body);

                // muestra diálogo con grilla
                $("#dlg_tippdv_qry").dialog({
                    modal: true,
                    width: 500,
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

function tippdvIns(){
    $("#error_tippdv_ins").html("").hide();
    //

    $("#dlg_tippdv_ins").dialog({
        modal: true,
        width: 480,
        datatype: "xml",
        buttons: {
            "Cancelar": function () {
                $(this).dialog("close");
            },
            "Enviar Datos": function () {
                $.ajax({
                    url: "tippdv",
                    type: "post",
                    datatype: "xml",
                    data: {
                        accion: "INS",
                        nombre: $("#nomtippdv_ins").val(),
                        descripcion: $("#destippdv_ins").val()
                    },
                    success: function (data) {
                        var ctos = $(data).find("msg").size();

                        if (ctos > 0) {
                            var msg = "<ul>";
                            $(data).find("msg").each(function () {
                                msg += "<li>" + $(this).text() + "</li>";
                            });
                            msg += "</ul>";

                            $("#error_tippdv_ins").html(msg).show();

                        } else {
                            $("#dlg_tippdv_ins").dialog("close");
                            tippdvQry();
                        }
                    }
                });
            }
        }
    });
}

function tippdvDel(){
    var ids = [];
    $("input[name='idtippdv_del']:checked").each(function () {
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
                        url: "tippdv",
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

function tippdvUpd(){
    var id = $("input[name='idtippdv_upd']:checked").val();
    if (isNaN(id)) {
        message("Advertencia", "Seleccione Fila para Actualizar Datos");
    } else {
        $.ajax({
            url: "get.txt",
            type: "post",
            datatype: "txt",
            data: {
                accion: "GET",
                idcita: id
            },
            success: function (data) {
                var msg = $(data).find('msg').text();

                if ($.trim(msg).length !== 0) {
                    message("Data no Encontrada", msg);

                } else {
                    var idtippdv = $(data).find('id').attr('val');
                    var nomtippdv = $(data).find('nombre').attr('val');
                    var destippdv = $(data).find('descripcion').attr('val');


                    $("#nomtippdv_upd").val(nomtippdv);
                    $("#destippdv_upd").val(destippdv);

                    $("#error_tippdv_upd").html("").hide();
                    
                    $("#dlg_tippdv_upd").dialog({
                        modal: true,
                        width: 480,
                        datatype: "xml",
                        buttons: {
                            "Cancelar": function () {
                                $(this).dialog("close");
                            },
                            "Enviar Datos": function () {
                                $.ajax({
                                    url: "tippdv",
                                    type: "post",
                                    datatype: "xml",
                                    data: {
                                        accion: "UPD",
                                        id: idtippdv,
                                        nombre: $("#nomtippdv").val(),
                                        descripcion: $("#destippdv").val()
                                    },
                                    success: function (data) {
                                        var ctos = $(data).find("msg").size();

                                        if (ctos > 0) {
                                            var msg = "<ul>";
                                            $(data).find("msg").each(function () {
                                                msg += "<li>" + $(this).text() + "</li>";
                                            });
                                            msg += "</ul>";

                                            $("#error_tippdv_upd").html(msg).show();

                                        } else {
                                            $("#dlg_tippdv_upd").dialog("close");
                                            tippdvQry();
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


// ==============================================================
// Scripts Ubigeo
// ==============================================================
function ubigeoQry() {
    $("#error_ubigeo_qry").html("").hide();
    // solicita data para grilla pacientes
    $.ajax({
        url: "empresa.txt",
        type: "post",
        datatype: "txt",
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

// ==============================================================
// Scripts Departamento
// ==============================================================

function departamentoQry() {
    $("#error_departamento_qry").html("").hide();
    // solicita data para grilla pacientes
    $.ajax({
        url: "empresa.txt",
        type: "post",
        datatype: "txt",
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
                    var iddepartamento = $(this).find('col:eq(0)').text();
                    var nombre = $(this).find('col:eq(1)').text();
                    var descripcion = $(this).find('col:eq(2)').text();

                    body += "<tr>"
                            + "<td id=\"nombre_" + iddepartamento + "\">" + nombre + "</td>"
                            + "<td colspan=\"2\" id=\"descripcion_" + iddepartamento + "\">" + descripcion + "</td>"
                            + "<td><input type=\"checkbox\" name=\"iddepartamento_del\" value=\"" + iddepartamento + "\"/></td>"
                            + "<td><input type=\"radio\" name=\"iddepartamento_upd\" value=\"" + iddepartamento + "\"/></td>"
                            + "</tr>";
                });

                // pinta data en grilla departamentos
                $("#body_departamento").html(body);

                // muestra diálogo con grilla
                $("#dlg_departamento_qry").dialog({
                    modal: true,
                    width: 500,
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

function departamentoIns(){
    $("#error_departamento_ins").html("").hide();
    //

    $("#dlg_departamento_ins").dialog({
        modal: true,
        width: 480,
        datatype: "xml",
        buttons: {
            "Cancelar": function () {
                $(this).dialog("close");
            },
            "Enviar Datos": function () {
                $.ajax({
                    url: "departamento",
                    type: "post",
                    datatype: "xml",
                    data: {
                        accion: "INS",
                        nombre: $("#nomdepartamento_ins").val(),
                        descripcion: $("#desdepartamento_ins").val()
                    },
                    success: function (data) {
                        var ctos = $(data).find("msg").size();

                        if (ctos > 0) {
                            var msg = "<ul>";
                            $(data).find("msg").each(function () {
                                msg += "<li>" + $(this).text() + "</li>";
                            });
                            msg += "</ul>";

                            $("#error_departamento_ins").html(msg).show();

                        } else {
                            $("#dlg_departamento_ins").dialog("close");
                            departamentoQry();
                        }
                    }
                });
            }
        }
    });
}

function departamentoDel(){
    var ids = [];
    $("input[name='iddepartamento_del']:checked").each(function () {
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
                        url: "departamento",
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

function departamentoUpd(){
    var id = $("input[name='iddepartamento_upd']:checked").val();
    if (isNaN(id)) {
        message("Advertencia", "Seleccione Fila para Actualizar Datos");
    } else {
        $.ajax({
            url: "get.txt",
            type: "post",
            datatype: "txt",
            data: {
                accion: "GET",
                iddepartamento: id
            },
            success: function (data) {
                var msg = $(data).find('msg').text();

                if ($.trim(msg).length !== 0) {
                    message("Data no Encontrada", msg);

                } else {
                    var iddepartamento = $(data).find('id').attr('val');
                    var nomdepartamento = $(data).find('nombre').attr('val');
                    var desdepartamento = $(data).find('descripcion').attr('val');


                    $("#nomdepartamento_upd").val(nomdepartamento);
                    $("#desdepartamento_upd").val(desdepartamento);

                    $("#error_departamento_upd").html("").hide();
                    
                    $("#dlg_departamento_upd").dialog({
                        modal: true,
                        width: 480,
                        datatype: "xml",
                        buttons: {
                            "Cancelar": function () {
                                $(this).dialog("close");
                            },
                            "Enviar Datos": function () {
                                $.ajax({
                                    url: "departamento",
                                    type: "post",
                                    datatype: "xml",
                                    data: {
                                        accion: "UPD",
                                        id: iddepartamento,
                                        nombre: $("#nomdepartamento_upd").val(),
                                        descripcion: $("#desdepartamento_upd").val()
                                    },
                                    success: function (data) {
                                        var ctos = $(data).find("msg").size();

                                        if (ctos > 0) {
                                            var msg = "<ul>";
                                            $(data).find("msg").each(function () {
                                                msg += "<li>" + $(this).text() + "</li>";
                                            });
                                            msg += "</ul>";

                                            $("#error_departamento_upd").html(msg).show();

                                        } else {
                                            $("#dlg_departamento_upd").dialog("close");
                                            departamentoQry();
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


// ==============================================================
// Scripts Provincia
// ==============================================================

function provinciaQry() {
    $("#error_provincia_qry").html("").hide();
    // solicita data para grilla pacientes
    $.ajax({
        url: "empresa.txt",
        type: "post",
        datatype: "txt",
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
                    var idprovincia = $(this).find('col:eq(0)').text();
                    var nomdepartamento = $(this).find('col:eq(1)').text();
                    var nombre = $(this).find('col:eq(2)').text();
                    var descripcion = $(this).find('col:eq(3)').text();

                    body += "<tr>"
                            + "<td colspan=\"2\" id=\"nomdepartamento_" + idprovincia + "\">" + nomdepartamento + "</td>"
                            + "<td id=\"nombre_" + idprovincia + "\">" + nombre + "</td>"
                            + "<td colspan=\"2\" id=\"descripcion_" + idprovincia + "\">" + descripcion + "</td>"
                            + "<td><input type=\"checkbox\" name=\"idprovincia_del\" value=\"" + idprovincia + "\"/></td>"
                            + "<td><input type=\"radio\" name=\"idprovincia_upd\" value=\"" + idprovincia + "\"/></td>"
                            + "</tr>";
                });

                // pinta data en grilla provincias
                $("#body_provincia").html(body);

                // muestra diálogo con grilla
                $("#dlg_provincia_qry").dialog({
                    modal: true,
                    width: 500,
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

function provinciaIns(){
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
                
                // ---
                // combos cargaron data
                $("#error_provincia_ins").html("").hide();

                $("#dlg_provincia_ins").dialog({
                    modal: true,
                    width: 480,
                    buttons: {
                        "Cancelar": function () {
                            $(this).dialog("close");
                        },
                        "Enviar Datos": function () {
                            $.ajax({
                                url: "provincia",
                                type: "post",
                                data: {
                                    accion: "INS",
                                    iddepartamento: $("#iddepartamento_ins").val(),
                                    nombre: $("#nomprovincia_ins").val(),
                                    descripcion: $("#desprovincia_ins").val()
                                },
                                success: function (error) {
                                    if (error.length !== 0) {
                                        $("#error_provincia_ins").html(error).show();

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

function provinciaDel(){
    var ids = [];
    $("input[name='idprovincia_del']:checked").each(function () {
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
                        url: "provincia",
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

function provinciaUpd(){
    var id = $("input[name='idprovincia_upd']:checked").val();
    if (isNaN(id)) {
        message("Advertencia", "Seleccione Fila para Actualizar Datos");
    } else {
        $.ajax({
            url: "get.txt",
            type: "post",
            datatype: "txt",
            data: {
                accion: "GET",
                idprovincia: id
            },
            success: function (data) {
                var msg = $(data).find('msg').text();

                if ($.trim(msg).length !== 0) {
                    message("Data no Encontrada", msg);

                } else {
                    var idprovincia = $(data).find('id').attr('val');
                    var nomprovincia = $(data).find('nombre').attr('val');
                    var desprovincia = $(data).find('descripcion').attr('val');
                    var iddepartamento = $(data).find('iddepartamento').attr('val');

                    $("#nomprovincia_upd").val(nomprovincia);
                    $("#desprovincia_upd").val(desprovincia);

                    // lectura para el combo Departamento
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
                                $("#iddepartamento_upd").val(iddepartamento);

                                // ----
                                $("#error_provincia_upd").html("").hide();
                                
                                $("#dlg_provincia_upd").dialog({
                                    modal: true,
                                    width: 480,
                                    datatype: "xml",
                                    buttons: {
                                        "Cancelar": function () {
                                            $(this).dialog("close");
                                        },
                                        "Enviar Datos": function () {
                                            $.ajax({
                                                url: "provincia",
                                                type: "post",
                                                datatype: "xml",
                                                data: {
                                                    accion: "UPD",
                                                    id: idprovincia,
                                                    iddepartamento: $("#iddepartamento_upd").val(),
                                                    nombre: $("#nomprovincia_upd").val(),
                                                    descripcion: $("#desprovincia_upd").val()
                                                },
                                                success: function (data) {
                                                    var ctos = $(data).find("msg").size();

                                                    if (ctos > 0) {
                                                        var msg = "<ul>";
                                                        $(data).find("msg").each(function () {
                                                            msg += "<li>" + $(this).text() + "</li>";
                                                        });
                                                        msg += "</ul>";

                                                        $("#error_provincia_upd").html(msg).show();

                                                    } else {
                                                        $("#dlg_provincia_upd").dialog("close");
                                                        provinciaQry();
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

// ==============================================================
// Scripts Distrito
// ==============================================================

function distritoQry() {
    $("#error_distrito_qry").html("").hide();
    // solicita data para grilla pacientes
    $.ajax({
        url: "empresa.txt",
        type: "post",
        datatype: "txt",
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
                    var iddistrito = $(this).find('col:eq(0)').text();
                    var nomdepartamento = $(this).find('col:eq(1)').text();
                    var nomprovincia = $(this).find('col:eq(2)').text();
                    var nombre = $(this).find('col:eq(3)').text();
                    var descripcion = $(this).find('col:eq(4)').text();

                    body += "<tr>"
                            + "<td colspan=\"2\" id=\"nomdepartamento_" + iddistrito + "\">" + nomdepartamento + "</td>"
                            + "<td colspan=\"2\" id=\"nomprovincia_" + iddistrito + "\">" + nomprovincia + "</td>"
                            + "<td id=\"nombre_" + iddistrito + "\">" + nombre + "</td>"
                            + "<td colspan=\"2\" id=\"descripcion_" + iddistrito + "\">" + descripcion + "</td>"
                            + "<td><input type=\"checkbox\" name=\"iddistrito_del\" value=\"" + iddistrito + "\"/></td>"
                            + "<td><input type=\"radio\" name=\"iddistrito_upd\" value=\"" + iddistrito + "\"/></td>"
                            + "</tr>";
                });

                // pinta data en grilla distritos
                $("#body_distrito").html(body);

                // muestra diálogo con grilla
                $("#dlg_distrito_qry").dialog({
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

function distritoIns(){
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
                
                // lectura para el combo Provincias
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

                            $("#idprovincia_ins").html(option);
                            
                            // ---
                            // combos cargaron data
                            $("#error_distrito_ins").html("").hide();

                            $("#dlg_distrito_ins").dialog({
                                modal: true,
                                width: 480,
                                buttons: {
                                    "Cancelar": function () {
                                        $(this).dialog("close");
                                    },
                                    "Enviar Datos": function () {
                                        $.ajax({
                                            url: "distrito",
                                            type: "post",
                                            data: {
                                                accion: "INS",
                                                iddepartamento: $("#iddepartamento_ins").val(),
                                                idprovincia: $("#idprovincia_ins").val(),
                                                nombre: $("#nomdistrito_ins").val(),
                                                descripcion: $("#desdistrito_ins").val()
                                            },
                                            success: function (error) {
                                                if (error.length !== 0) {
                                                    $("#error_distrito_ins").html(error).show();

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

function distritoDel(){
    var ids = [];
    $("input[name='iddistrito_del']:checked").each(function () {
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
                        url: "distrito",
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

function distritoUpd(){
    var id = $("input[name='iddistrito_upd']:checked").val();
    if (isNaN(id)) {
        message("Advertencia", "Seleccione Fila para Actualizar Datos");
    } else {
        $.ajax({
            url: "get.txt",
            type: "post",
            datatype: "txt",
            data: {
                accion: "GET",
                iddistrito: id
            },
            success: function (data) {
                var msg = $(data).find('msg').text();

                if ($.trim(msg).length !== 0) {
                    message("Data no Encontrada", msg);

                } else {
                    var iddistrito = $(data).find('id').attr('val');
                    var nomdistrito = $(data).find('nombre').attr('val');
                    var desdistrito = $(data).find('descripcion').attr('val');
                    var iddepartamento = $(data).find('iddepartamento').attr('val');
                    var idprovincia = $(data).find('idprovincia').attr('val');

                    $("#nomdistrito_upd").val(nomdistrito);
                    $("#desdistrito_upd").val(desdistrito);

                    // lectura para el combo Departamento
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
                                $("#iddepartamento_upd").val(iddepartamento);

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

                                            $("#idprovincia_upd").html(option);
                                            $("#idprovincia_upd").val(idprovincia);

                                            // Combos Ok
                                            // ----
                                            $("#error_distrito_upd").html("").hide();
                                            
                                            $("#dlg_distrito_upd").dialog({
                                                modal: true,
                                                width: 480,
                                                datatype: "xml",
                                                buttons: {
                                                    "Cancelar": function () {
                                                        $(this).dialog("close");
                                                    },
                                                    "Enviar Datos": function () {
                                                        $.ajax({
                                                            url: "distrito",
                                                            type: "post",
                                                            datatype: "xml",
                                                            data: {
                                                                accion: "UPD",
                                                                id: iddistrito,
                                                                iddepartamento: $("#iddepartamento_upd").val(),
                                                                idprovincia: $("#idprovincia_upd").val(),
                                                                nombre: $("#nomdistrito_upd").val(),
                                                                descripcion: $("#desdistrito_upd").val()
                                                            },
                                                            success: function (data) {
                                                                var ctos = $(data).find("msg").size();

                                                                if (ctos > 0) {
                                                                    var msg = "<ul>";
                                                                    $(data).find("msg").each(function () {
                                                                        msg += "<li>" + $(this).text() + "</li>";
                                                                    });
                                                                    msg += "</ul>";

                                                                    $("#error_distrito_upd").html(msg).show();

                                                                } else {
                                                                    $("#dlg_distrito_upd").dialog("close");
                                                                    distritoQry();
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


// ==============================================================
// Scripts Material (material)
// ==============================================================


function materialIns(){
    // Cargar Combo de 'Tipo de Material'
    $.ajax({
        url: "Persona",
        type: "post",
        datatype: "xml",
        data : {
            accion: "CBO"
        },
        success: function(data){
            var msg = $(data).find('msg').text();
            if ($.trim(msg).length !== 0) {
                message("Data no Encontrada", msg);
            }else{
                var option = "";
                $(data).find('op').each(function(){
                    option += "<option value=\""
                        + $(this).attr('id') + "\">"
                        + $(this).text() + "</option>";
                });
                //Llenar combo tipo
                $("#idtipmaterial_ins").html(option);
                
                $("#dlg_material_ins").dialog({
                    modal: true,
                    width: 480,
                    buttons: {
                        "Cancelar": function () {
                            $(this).dialog("close");
                        },
                        "Enviar Datos": function () {
                            /*$.ajax({
                                url: "Citas",
                                type: "post",
                                data: {
                                    accion: "INS",
                                    idpaciente: $("#idpaciente_ins").val(),
                                    idespecialidad: $("#idespecialidad_ins").val(),
                                    idmedico: $("#idmedico_ins").val(),
                                    diahora: $("#diahora_ins").val()
                                },
                                success: function (error) {
                                    if (error.length !== 0) {
                                        $("#error_citas_ins").html(error).show();

                                    } else {
                                        window.location = "Citas?accion=QRY";
                                    }
                                }
                            });*/
                        }
                    }
                });
            }
        }
    });
}

function materialDel(){
    var ids = [];
    $("input[name='idmaterial_del']:checked").each(function () {
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
                        url: "material",
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

function materialUpd(){
    var id = $("input[name='idmaterial_upd']:checked").val();
    if (isNaN(id)) {
        message("Advertencia", "Seleccione Fila para Actualizar Datos");
        }else{
        // Obtener Datos del Material por 'Id'
        $.ajax({
            url: "combo.txt",
            type: "post",
            datatype: "txt",
            data: {
                accion: "POST",
                idcita: id
            },
            success: function (data) {
                var msg = $(data).find('msg').text();

                if ($.trim(msg).length !== 0) {
                    message("Data no Encontrada", msg);

                } else {
                    var idtipmaterial = $(data).find('idtipmaterial').attr('val');
                    var idclasificacion = $(data).find('idclasificacion').attr('val');

                    $("#idmaterial_upd").val(idcampana);
                    $("#idmaterial_del").val(nomcampana);

                    // lectura para el combo 'Tipo de Material'
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

                                $("#idtipmaterial_upd").html(option);
                                $("#idtipmaterial_upd").val(idtipmaterial);
                                // ---
                                // Lectura para el combo 'Clasificaion'
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

                                            $("#idclasificacion_upd").html(option);
                                            $("#idclasificacion_upd").val(idcanal);
                                            // ---
                                            // todo Ok
                                            $("#error_material_upd").html("").hide();

                                            $("#dlg_material_upd").dialog({
                                                modal: true,
                                                width: 480,
                                                buttons: {
                                                    "Cancelar": function () {
                                                        $(this).dialog("close");
                                                    },
                                                    "Enviar Datos": function () {
                                                        $.ajax({
                                                            url: "material",
                                                            type: "post",
                                                            data: {
                                                                accion: "UPD",
                                                                idcita: idcita,
                                                                idpaciente: $("#idpaciente_upd").val(),
                                                                idmedico: $("#idmedico_upd").val(),
                                                                diahora: $("#diahora_upd").val()
                                                            },
                                                            success: function (error) {
                                                                if (error.length !== 0) {
                                                                    $("#error_material_upd").html(error).show();

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


// ==============================================================
// Scripts Tipo de Material (tipmaterial)
// ==============================================================

function tipmaterialQry() {
    $("#error_tipmaterial_qry").html("").hide();
    // solicita data para grilla pacientes
    $.ajax({
        url: "empresa.txt",
        type: "post",
        datatype: "txt",
        data: {
            accion: "QRY"
        },
        success: function (data) {
            var msg = $(data).find('msg').text();

            if ($.trim(msg).length !== 0) {
                message("Data no Encontrada", msg);

            } else {
                var body = "";
                console.log(data);
                $(data).find('fil').each(function () {
                    var idtipmaterial = $(this).find('col:eq(0)').text();
                    var nombre = $(this).find('col:eq(1)').text();
                    var descripcion = $(this).find('col:eq(2)').text();

                    body += "<tr>"
                            + "<td id=\"tipmaterial_" + idtipmaterial + "\">" + nombre + "</td>"
                            + "<td colspan=\"2\" id=\"nacimiento_" + idtipmaterial + "\">" + descripcion + "</td>"
                            + "<td><input type=\"checkbox\" name=\"idtipmaterial_del\" value=\"" + idtipmaterial + "\"/></td>"
                            + "<td><input type=\"radio\" name=\"idtipmaterial_upd\" value=\"" + idtipmaterial + "\"/></td>"
                            + "</tr>";
                });

                // pinta data en grilla tipmaterials
                $("#body_tipmaterial").html(body);

                // muestra diálogo con grilla
                $("#dlg_tipmaterial_qry").dialog({
                    modal: true,
                    width: 500,
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

function tipmaterialIns(){
    $("#error_tipmaterial_ins").html("").hide();
    //

    $("#dlg_tipmaterial_ins").dialog({
        modal: true,
        width: 480,
        datatype: "xml",
        buttons: {
            "Cancelar": function () {
                $(this).dialog("close");
            },
            "Enviar Datos": function () {
                $.ajax({
                    url: "Empresa",
                    type: "post",
                    datatype: "xml",
                    data: {
                        accion: "INS",
                        idespecialidad: $("#medico_idespecialidad_ins").val(),
                        nombre: $("#medico_ins").val()
                    },
                    success: function (data) {
                        var ctos = $(data).find("msg").size();

                        if (ctos > 0) {
                            var msg = "<ul>";
                            $(data).find("msg").each(function () {
                                msg += "<li>" + $(this).text() + "</li>";
                            });
                            msg += "</ul>";

                            $("#error_tipmaterial_ins").html(msg).show();

                        } else {
                            $("#dlg_tipmaterial_ins").dialog("close");
                            tipmaterialQry();
                        }
                    }
                });
            }
        }
    });
}

function tipmaterialDel(){
    var ids = [];
    $("input[name='idtipmaterial_del']:checked").each(function () {
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
                        url: "empresa",
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

function tipmaterialUpd(){
    var id = $("input[name='idtipmaterial_upd']:checked").val();
    if (isNaN(id)) {
        message("Advertencia", "Seleccione Fila para Actualizar Datos");
    } else {
        $.ajax({
            url: "get.txt",
            type: "post",
            datatype: "txt",
            data: {
                accion: "GET",
                idcita: id
            },
            success: function (data) {
                var msg = $(data).find('msg').text();

                if ($.trim(msg).length !== 0) {
                    message("Data no Encontrada", msg);

                } else {
                    var idtipmaterial = $(data).find('idtipmaterial').attr('val');
                    var nomtipmaterial = $(data).find('nombre').attr('val');
                    var destipmaterial = $(data).find('descripcion').attr('val');


                    $("#nomtipmaterial_upd").val(nomtipmaterial);
                    $("#destipmaterial_upd").val(destipmaterial);

                    $("#error_tipmaterial_upd").html("").hide();
                    
                    $("#dlg_tipmaterial_upd").dialog({
                        modal: true,
                        width: 480,
                        datatype: "xml",
                        buttons: {
                            "Cancelar": function () {
                                $(this).dialog("close");
                            },
                            "Enviar Datos": function () {
                                $.ajax({
                                    url: "Empresa",
                                    type: "post",
                                    datatype: "xml",
                                    data: {
                                        accion: "UPD",
                                        idmedico: id,
                                        idespecialidad: $("#medico_idespecialidad_upd").val(),
                                        nombre: $("#medico_upd").val()
                                    },
                                    success: function (data) {
                                        var ctos = $(data).find("msg").size();

                                        if (ctos > 0) {
                                            var msg = "<ul>";
                                            $(data).find("msg").each(function () {
                                                msg += "<li>" + $(this).text() + "</li>";
                                            });
                                            msg += "</ul>";

                                            $("#error_tipmaterial_upd").html(msg).show();

                                        } else {
                                            $("#dlg_tipmaterial_upd").dialog("close");
                                            tipmaterialQry();
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

// ==============================================================
// Scripts Elementos (Cuestionarios)
// ==============================================================


function elementoIns(){
    // Cargar Combo de 'Cuestionario'
    $.ajax({
        url: "Persona",
        type: "post",
        datatype: "xml",
        data : {
            accion: "CBO"
        },
        success: function(data){
            var msg = $(data).find('msg').text();
            if ($.trim(msg).length !== 0) {
                message("Data no Encontrada", msg);
            }else{
                var option = "";
                $(data).find('op').each(function(){
                    option += "<option value=\""
                        + $(this).attr('id') + "\">"
                        + $(this).text() + "</option>";
                });
                //Llenar combo tipo
                $("#idcuestionario_ins").html(option);
                
                $("#dlg_elemento_ins").dialog({
                    modal: true,
                    width: 480,
                    buttons: {
                        "Cancelar": function () {
                            $(this).dialog("close");
                        },
                        "Enviar Datos": function () {
                            /*$.ajax({
                                url: "Citas",
                                type: "post",
                                data: {
                                    accion: "INS",
                                    idpaciente: $("#idpaciente_ins").val(),
                                    idespecialidad: $("#idespecialidad_ins").val(),
                                    idmedico: $("#idmedico_ins").val(),
                                    diahora: $("#diahora_ins").val()
                                },
                                success: function (error) {
                                    if (error.length !== 0) {
                                        $("#error_citas_ins").html(error).show();

                                    } else {
                                        window.location = "Citas?accion=QRY";
                                    }
                                }
                            });*/
                        }
                    }
                });
            }
        }
    });
}

function elementoDel(){
    var ids = [];
    $("input[name='idelemento_del']:checked").each(function () {
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
                        url: "elemento",
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

function elementoUpd(){
    var id = $("input[name='idelemento_upd']:checked").val();
    if (isNaN(id)) {
        message("Advertencia", "Seleccione Fila para Actualizar Datos");
        }else{
        // Obtener Datos del Elemento
        $.ajax({
            url: "combo.txt",
            type: "post",
            datatype: "txt",
            data: {
                accion: "POST",
                idcita: id
            },
            success: function (data) {
                var msg = $(data).find('msg').text();

                if ($.trim(msg).length !== 0) {
                    message("Data no Encontrada", msg);

                } else {
                    var idcuestionario = $(data).find('idcuestionario').attr('val');
                    var nomelemento = $(data).find('nomelemento').attr('val');
                    var deselemento = $(data).find('deselemento').attr('val');

                // Obtener el listado de 'Cuestionario'
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

                            $("#idcuestionario_upd").html(option);
                            $("#idcuestionario_upd").val(idcuestionario);
                            // ---
                            // todo Ok
                            $("#error_elemento_upd").html("").hide();
                            
                            $("#dlg_elemento_upd").dialog({
                                modal: true,
                                width: 480,
                                buttons: {
                                    "Cancelar": function () {
                                        $(this).dialog("close");
                                    },
                                    "Enviar Datos": function () {
                                        $.ajax({
                                            url: "elemento",
                                            type: "post",
                                            data: {
                                                accion: "UPD",
                                                idcita: idcita,
                                                idpaciente: $("#idpaciente_upd").val(),
                                                idmedico: $("#idmedico_upd").val(),
                                                diahora: $("#diahora_upd").val()
                                            },
                                            success: function (error) {
                                                if (error.length !== 0) {
                                                    $("#error_elemento_upd").html(error).show();

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

// ==============================================================
// Scripts Cuestionario
// ==============================================================

function cuestionarioQry() {
    $("#error_cuestionario_qry").html("").hide();
    // solicita data para grilla pacientes
    $.ajax({
        url: "empresa.txt",
        type: "post",
        datatype: "txt",
        data: {
            accion: "QRY"
        },
        success: function (data) {
            var msg = $(data).find('msg').text();

            if ($.trim(msg).length !== 0) {
                message("Data no Encontrada", msg);

            } else {
                var body = "";
                console.log(data);
                $(data).find('fil').each(function () {
                    var idcuestionario = $(this).find('col:eq(0)').text();
                    var nombre = $(this).find('col:eq(1)').text();
                    var descripcion = $(this).find('col:eq(2)').text();

                    body += "<tr>"
                            + "<td id=\"cuestionario_" + idcuestionario + "\">" + nombre + "</td>"
                            + "<td colspan=\"2\" id=\"nacimiento_" + idcuestionario + "\">" + descripcion + "</td>"
                            + "<td><input type=\"checkbox\" name=\"idcuestionario_del\" value=\"" + idcuestionario + "\"/></td>"
                            + "<td><input type=\"radio\" name=\"idcuestionario_upd\" value=\"" + idcuestionario + "\"/></td>"
                            + "</tr>";
                });

                // pinta data en grilla empresas
                $("#body_cuestionario").html(body);

                // muestra diálogo con grilla
                $("#dlg_cuestionario_qry").dialog({
                    modal: true,
                    width: 500,
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

function cuestionarioIns(){
    $("#error_cuestionario_ins").html("").hide();
    //

    $("#dlg_cuestionario_ins").dialog({
        modal: true,
        width: 480,
        datatype: "xml",
        buttons: {
            "Cancelar": function () {
                $(this).dialog("close");
            },
            "Enviar Datos": function () {
                $.ajax({
                    url: "Empresa",
                    type: "post",
                    datatype: "xml",
                    data: {
                        accion: "INS",
                        idespecialidad: $("#medico_idespecialidad_ins").val(),
                        nombre: $("#medico_ins").val()
                    },
                    success: function (data) {
                        var ctos = $(data).find("msg").size();

                        if (ctos > 0) {
                            var msg = "<ul>";
                            $(data).find("msg").each(function () {
                                msg += "<li>" + $(this).text() + "</li>";
                            });
                            msg += "</ul>";

                            $("#error_cuestionario_ins").html(msg).show();

                        } else {
                            $("#dlg_cuestionario_ins").dialog("close");
                            cuestionarioQry();
                        }
                    }
                });
            }
        }
    });
}

function cuestionarioDel(){
    var ids = [];
    $("input[name='idcuestionario_del']:checked").each(function () {
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
                        url: "empresa",
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

function cuestionarioUpd(){
    var id = $("input[name='idcuestionario_upd']:checked").val();
    if (isNaN(id)) {
        message("Advertencia", "Seleccione Fila para Actualizar Datos");
    } else {
        $.ajax({
            url: "get.txt",
            type: "post",
            datatype: "txt",
            data: {
                accion: "GET",
                idcita: id
            },
            success: function (data) {
                var msg = $(data).find('msg').text();

                if ($.trim(msg).length !== 0) {
                    message("Data no Encontrada", msg);

                } else {
                    var idcuestionario = $(data).find('idcuestionario').attr('val');
                    var nomcuestionario = $(data).find('nombre').attr('val');
                    var descuestionario = $(data).find('descripcion').attr('val');


                    $("#nomcuestionario_upd").val(nomcuestionario);
                    $("#descuestionario_upd").val(descuestionario);

                    $("#error_cuestionario_upd").html("").hide();
                    
                    $("#dlg_cuestionario_upd").dialog({
                        modal: true,
                        width: 480,
                        datatype: "xml",
                        buttons: {
                            "Cancelar": function () {
                                $(this).dialog("close");
                            },
                            "Enviar Datos": function () {
                                $.ajax({
                                    url: "Empresa",
                                    type: "post",
                                    datatype: "xml",
                                    data: {
                                        accion: "UPD",
                                        idmedico: id,
                                        idespecialidad: $("#medico_idespecialidad_upd").val(),
                                        nombre: $("#medico_upd").val()
                                    },
                                    success: function (data) {
                                        var ctos = $(data).find("msg").size();

                                        if (ctos > 0) {
                                            var msg = "<ul>";
                                            $(data).find("msg").each(function () {
                                                msg += "<li>" + $(this).text() + "</li>";
                                            });
                                            msg += "</ul>";

                                            $("#error_cuestionario_upd").html(msg).show();

                                        } else {
                                            $("#dlg_cuestionario_upd").dialog("close");
                                            cuestionarioQry();
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