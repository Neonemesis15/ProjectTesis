$(function() {
	
	//$("table.parainfo thead").addClass("ui-widget ui-state-default");
	$("table.parainfo thead").addClass("ui-widget-header");
    $("table.parainfo tfoot").addClass("ui-widget ui-state-default");
    $("table.parainfo caption").addClass("ui-widget-header");
    $("table.parainfo caption").addClass("ui-corner-top");

    $("table.parainfo .crud .ins span").addClass("ui-icon ui-icon-plus");
    $("table.parainfo .crud .del span").addClass("ui-icon ui-icon-trash");
    $("table.parainfo .crud .upd span").addClass("ui-icon ui-icon-pencil");
    $("table.parainfo .crud .qry span").addClass("ui-icon ui-icon-folder-open");
    
    //Fechas <, <<, >, >>
    $("table.parainfo .crud .der span").addClass("ui-icon ui-icon-carat-1-e");
    $("table.parainfo .crud .ader span").addClass("ui-icon ui-icon-seek-next");
    $("table.parainfo .crud .izq span").addClass("ui-icon ui-icon-carat-1-w");
    $("table.parainfo .crud .aizq span").addClass("ui-icon ui-icon-seek-prev");

    $("table.tabla .crud .find span").addClass("ui-icon ui-icon-search");
    $("table.tabla .crud .ins span").addClass("ui-icon ui-icon-plus");

    $("table.parainfo .crud").mouseover(function() {
        $(this).addClass("ui-state-hover");
    }).mouseout(function() {
        $(this).removeClass("ui-state-hover");
    });

    $("table.tabla .crud").mouseover(function() {
        $(this).addClass("ui-state-hover");
    }).mouseout(function() {
        $(this).removeClass("ui-state-hover");
    });
    
    $("ol.parainfo li").addClass("ui-widget-content")
});

