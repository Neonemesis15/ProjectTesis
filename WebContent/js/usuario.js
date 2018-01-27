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

// ==============================================================
// Scripts Campaña
// ==============================================================

$(function () {
    // datepicker
    $("#fechaini_ins, #fechafin_ins").datepicker({
        showOn: "button",
        buttonImage: "images/calendar.gif",
        buttonImageOnly: true,
        showAnim: 'slideDown',
        changeMonth: true,
        changeYear: true,
        yearRange: "1940:2020"
    });

    $("#fechaini_ins").datepicker('setDate', new Date());
    $("#fechafin_ins").datepicker('setDate', new Date());
    
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
    $("#fechaini_ins, #fechafin_ins").datetimepicker({
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
                                            url: "Empresas",
                                            type: "post",
                                            data: {
                                                accion: "INS",
                                                nomempresa: $("#nombre_ins").val(),
                                                desempresa: $("#descripcion_ins").val(),
                                                feciniempresa: $("#fechaini_ins").val(),
                                                fecfinempresa: $("#fechafin_ins").val(),
                                                idempresa: $("#idempresa_ins").val(),
                                                idcanal: $("#idcanal_ins").val()
                                            },
                                            success: function (error) {
                                                if (error.length !== 0) {
                                                    $("#error_campana_ins").html(error).show();

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

function campanaDel(){
    var ids = [];
    $("input[name='idcampana_del']:checked").each(function () {
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
                        url: "Campana",
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

function campanaUpd(){
    var id = $("input[name='idcampana_upd']:checked").val();
    if (isNaN(id)) {
        message("Advertencia", "Seleccione Fila para Actualizar Datos");
        }else{
        // pidiendo datos de campana
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
                                                            url: "Campana",
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
// Scripts Empresa
// ==============================================================

function empresaQry() {
	$("#error_empresa_qry").html("").hide();
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

                            $("#error_medicos_ins").html(msg).show();

                        } else {
                            $("#dlg_medicos_ins").dialog("close");
                            medicosQry();
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
// Scripts Canal
// ==============================================================

function canalQry(){
    $("#error_canal_qry").html("").hide();
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
                    var idcanal = $(this).find('col:eq(0)').text();
                    var nombre = $(this).find('col:eq(1)').text();
                    var descripcion = $(this).find('col:eq(2)').text();

                    body += "<tr>"
                            + "<td id=\"canal_" + idcanal + "\">" + nombre + "</td>"
                            + "<td colspan=\"2\" id=\"nacimiento_" + idcanal + "\">" + descripcion + "</td>"
                            + "<td><input type=\"checkbox\" name=\"idcanal_del\" value=\"" + idcanal + "\"/></td>"
                            + "<td><input type=\"radio\" name=\"idcanal_upd\" value=\"" + idcanal + "\"/></td>"
                            + "</tr>";
                });

                // pinta data en grilla canal
                $("#body_canal").html(body);

                // muestra diálogo con grilla
                $("#dlg_canal_qry").dialog({
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


function canalIns(){
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

                            $("#error_medicos_ins").html(msg).show();

                        } else {
                            $("#dlg_medicos_ins").dialog("close");
                            medicosQry();
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
                    var idcanal = $(data).find('idcanal').attr('val');
                    var nomcanal = $(data).find('nombre').attr('val');
                    var descanal = $(data).find('descripcion').attr('val');


                    $("#nomcanal_upd").val(nomcanal);
                    $("#descanal_upd").val(descanal);

                    $("#error_canal_upd").html("").hide();
                    
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
                        url: "Canal",
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

