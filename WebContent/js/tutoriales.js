function tutorialesIns() {
    $("#titulo_ins").val("");
    $("#tipo_ins").val("Separata");
    $("#precio_ins").val("");
    $("#error_ins").html("");

    $("#dins").dialog({
        modal: true,
        width: 420,
        buttons: {
            "Cancelar": function () {
                $(this).dialog("close");
            },
            "Enviar Datos": function () {
                $.ajax({
                    url: "Tutoriales",
                    type: "post",
                    data: {
                        accion: "INS",
                        titulo: $("#titulo_ins").val(),
                        tipo: $("#tipo_ins").val(),
                        precio: $("#precio_ins").val()
                    },
                    success: function (error) {
                        if (error.length !== 0) {
                            $("#error_ins").html(error);
                        } else {
                            window.location = "Tutoriales?accion=QRY";
                        }
                    }
                });
            }
        }
    });
}

function tutorialesDel() {
    var ids = [];

    $("input[name='idtutorial_check']:checked").each(function () {
        ids.push($(this).val());
    });

    if (ids.length === 0) {
        mensaje("Advertencia", "Seleccione fila(s) a Retirar");
    } else {
        $("#p_msg").html("¿Retirar registro(s)?");
        $("#dlg_msg").dialog({
            modal: true,
            width: 440,
            buttons: {
                "No": function () {
                    $(this).dialog("close");
                },
                "Si": function () {
                    $(this).dialog("close");

                    $.ajax({
                        url: "Tutoriales",
                        type: "post",
                        data: {
                            accion: "DEL",
                            ids: ids.toString()
                        },
                        success: function (error) {
                            if (error.length !== 0) {
                                mensaje("Error", error);
                            } else {
                                window.location = "Tutoriales?accion=QRY";
                            }
                        }
                    });
                }
            }
        });
    }
}

function tutorialesUpd() {
    var id = $("input[name='idtutorial_radio']:checked").val();

    if (isNaN(id)) {
        mensaje("Advertencia", "Seleccione Fila para Actualizar Datos");
    } else {
        $.ajax({
            url: "Tutoriales",
            type: "post",
            data: {
                accion: "GET",
                idtutorial: id
            },
            success: function (bean) {
                //alert((new XMLSerializer()).serializeToString(bean));
                if (bean.length !== 0) {
                    $(bean).find('nodo').each(function () {
                        $("#" + $(this).attr('id')).val($(this).text());
                    });

                    $("#error_upd").html("");
                    $("#dupd").dialog({
                        modal: true,
                        width: 440,
                        buttons: {
                            "Cancelar": function () {
                                $(this).dialog("close");
                            },
                            "Enviar Datos": function () {
                                $.ajax({
                                    url: "Tutoriales",
                                    type: "POST",
                                    data: {
                                        accion: "UPD",
                                        idtutorial: $("#idtutorial_upd").val(),
                                        titulo: $("#titulo_upd").val(),
                                        tipo: $("#tipo_upd").val(),
                                        precio: $("#precio_upd").val()
                                    },
                                    success: function (error) {
                                        if (error.length !== 0) {
                                            $("#error_upd").html(error);
                                        } else {
                                            window.location = "Tutoriales?accion=QRY";
                                        }
                                    }
                                });
                            }
                        }
                    });
                } else {
                    mensaje("Error", "ID de Tutorial incorrecto");
                }
            }
        });
    }
}

function mensaje(titulo, msg) {
    $("#p_msg").html(msg);
    $("#dlg_msg").dialog({
        title: titulo,
        modal: true,
        width: 400,
        buttons: {
            "Cerrar Ventana": function () {
                $(this).dialog("close");
            }
        }
    });
}
