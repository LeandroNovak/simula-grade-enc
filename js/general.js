jQuery.noConflict();

var obgt = 0;
var humcomp = 0; 
var profis = 0;
var total = 0;
jQuery(document).ready(function(){
	
	jQuery("#obrigatorias").attr("checked",true);
	jQuery("#optativas").attr("checked",true);
	
	addOnChange();
	mostraTodos();
	atualizaDisciplinas();
	atualizaHtmlCreditos();
	
});
 
 function mostraTodos(){
	jQuery("#perfil1").show();
	jQuery("#perfil2").show();
	jQuery("#perfil3").show();
	jQuery("#perfil4").show();
	jQuery("#perfil5").show();
	jQuery("#perfil6").show();
	jQuery("#perfil7").show();
	jQuery("#perfil8").show();
	jQuery("#perfil9").show();
	jQuery("#perfil10").show();
	jQuery("#boxOptProfis").show();
}

 function escondeTodos(){
	jQuery("#perfil1").hide();
	jQuery("#perfil2").hide();
	jQuery("#perfil3").hide();
	jQuery("#perfil4").hide();
	jQuery("#perfil5").hide();
	jQuery("#perfil6").hide();
	jQuery("#perfil7").hide();
	jQuery("#perfil8").hide();
	jQuery("#perfil9").hide();
	jQuery("#perfil10").hide();
	jQuery("#boxOptProfis").hide();
}

function atualizaCreditos(e){
	var x = jQuery(e).attr("class");
	var q = x.split(' ')[0];
	var n = parseInt(x.split(' ')[1]);
	if(jQuery(e).attr("checked") == "checked"){
		jQuery(e).parent().addClass("ok");
		if (q == 'obrigatorias')
			obgt += n;
		if (q == 'optHumComp')
			humcomp += n;
		if (q == "optProfis")
			profis += n;
	}
	else{
		jQuery(e).parent().removeClass("ok");
		if (q == 'obrigatorias'){
			obgt -= n;
			var cb_all = jQuery(e).parent().parent().attr("id");
			jQuery("#" + cb_all + "_all").attr("checked",false);
		}
		if (q == 'optHumComp')
			humcomp -= n;
		if (q == "optProfis")
			profis -= n;
	}
	total = obgt + humcomp + profis;
	if(total >= 140){
		jQuery("#026182").parent().removeClass("blocked");
		jQuery("#026182").attr("disabled",false);
	}
	else{
		jQuery("#026182").parent().addClass("blocked");
		jQuery("#026182").attr("disabled",true);
	}
	if(total >= 160){
		jQuery("#026190").parent().removeClass("blocked");
		jQuery("#026190").attr("disabled",false);
		jQuery("#026239").parent().removeClass("blocked");
		jQuery("#026239").attr("disabled",false);		
	}
	else{
		jQuery("#026190").parent().addClass("blocked");
		jQuery("#026190").attr("disabled",true);
		jQuery("#026239").parent().addClass("blocked");
		jQuery("#026239").attr("disabled",true);
	}
}
 
 function atualizaDisciplinas(){
	var all = new Array();
	var pre = new Array();
	var pre2 = new Array();
	var co = new Array();
	
	jQuery(".obrigatorias input:checkbox").each(function() {
		all.push(jQuery(this));
	});
	jQuery(".optProfis input:checkbox").each(function() {
		all.push(jQuery(this));
	});
	jQuery(".optHumComp input:checkbox").each(function() {
		all.push(jQuery(this));
	});
	for(var i in all){		
		if(jQuery(all[i]).attr("pre")){
			var ok = true;
			pre = jQuery(all[i]).attr("pre").split(' ');			
			for(var p in pre){
				if(pre[p].indexOf("_") > -1){
					ok = false;
					pre2 = pre[p].split("_");
					for(var p2 in pre2){
						var pr2 = "#" + pre2[p2];
						if (jQuery(pr2).attr("checked") == "checked"){
							ok = true;
							jQuery(all[i]).parent().removeClass("blocked");
							jQuery(all[i]).attr("disabled",false)
						}
					}
				}
				else{
					for(var p in pre)
					{
						var pr = "#" + pre[p];
						if (jQuery(pr).attr("checked") != "checked"){
							ok = false;
							jQuery(all[i]).parent().addClass("blocked");
							jQuery(all[i]).attr("disabled",true);
							if (jQuery(all[i]).attr("checked") == "checked"){
								jQuery(all[i]).attr("checked",false);	
								atualizaCreditos(all[i]);
							}
						}
					}
				}
			}
			if(ok)
			{
				jQuery(all[i]).parent().removeClass("blocked");
				jQuery(all[i]).attr("disabled",false);				
			}
			else{
				jQuery(all[i]).parent().addClass("blocked");
				jQuery(all[i]).attr("disabled",true);				
			}
		}
	}
 }
 
 function atualizaHtmlCreditos(){
	jQuery("#creditos").html("OBRIGATORIAS: "+ obgt +"/260("+ Math.round((obgt/260)*10000)/100 +"%)<br/>" +"OPTATIVAS: "+ profis + "/12("+ Math.round((profis/12)*10000)/100 +"%)<br/>TOTAL: "+ (total) +"/272("+ Math.round(((total)/272)*10000)/100 +"%)");
 }
 
 function togglePerfil(e){
	if(e.is(":visible"))
		e.hide();
	else
		e.show();
 }
 
 function addOnChange(){
	jQuery(".obrigatorias input:checkbox").each(function() {
		jQuery(this).attr("onchange","atualizaDisciplinas();atualizaCreditos(this);atualizaHtmlCreditos();");
	});
	jQuery(".optHumComp input:checkbox").each(function() {
		jQuery(this).attr("onchange","atualizaDisciplinas();atualizaCreditos(this);atualizaHtmlCreditos();");
	});
	jQuery(".optProfis input:checkbox").each(function() {
		jQuery(this).attr("onchange","atualizaDisciplinas();atualizaCreditos(this);atualizaHtmlCreditos();");
	});
 }
 
 function check_all(x,e){
	jQuery(e + " input:checkbox").each(function(){
		if(jQuery(x).attr("checked") == "checked"){
			if((jQuery(this).attr("checked") != "checked")&&(jQuery(this).attr("disabled") != "disabled")){
				jQuery(this).attr("checked",true);
				atualizaDisciplinas();
				atualizaCreditos(this);
			}
		}
		else{
			if(jQuery(this).attr("checked") == "checked"){
				jQuery(this).attr("checked",false);
				atualizaDisciplinas();
				atualizaCreditos(this);
			}
		}		
		atualizaHtmlCreditos();
	});
 }
