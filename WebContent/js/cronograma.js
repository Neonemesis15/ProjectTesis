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
				}
			}
	});
}