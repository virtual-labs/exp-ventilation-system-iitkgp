$(document).ready(function() {
				
	var top = 130;
	var left =78;
	var temp = top;
	var temp1 = left;
	var goUp = true;
	var goDown = false;
	var goLeft = false;
	var goRight = true;
	setInterval(function(){ 
		if(goUp) {
			temp--;
			if(temp == 60) {
				goUp = false;
				goDown = true;
			}
		} else if(goDown) {
			temp++;
			if(temp == 130) {
				goDown = false;
				goUp = true;
			}
		}
		$("#anemometer").css("top",temp);
		
		if(goRight) {
			temp1++;
			if(temp1 == 95) {
				goRight = false;
				goLeft = true;
			}
		} else if(goLeft) {
			temp1--;
			if(temp1 == 78) {
				goLeft = false;
				goRight = true;
			}
		}
		$("#anemometer").css("left",temp1);
	}, 50);

					
	var duct_diam = 0;				
	var reading = 1;
	$(document).on("click", "#duct_diam_bttn", function() {
		duct_diam = $.trim($("#duct_diameter").val());
		if(duct_diam == "") {
			alert("Please enter the diameter of the duct!");
		} else {
			duct_diam = parseFloat(duct_diam);
			if(duct_diam >= 0.5 && duct_diam <= 0.6) {
				$(".ME_wo_evasee").css("display","block");
				$(".ME_start").html("");
			} else {
				alert("Diameter of the duct must be withing 0.5 to 0.6");	
			}
		}
	});
	
	
	
	$(document).on("click", ".ME_bttns", function() {
		var for_text = $(this).attr("for");
		var id = $(this).attr("id");
		var val = $(this).val();
		
		if(val == "Anemometer Traversing") {
			$(this).val("Velocity Reading "+reading);
			$('.ME_divLeft').css("display","block");
		} else {
			if(for_text == "without") {
				var vel_red = ((10 + ((10.9 - 10) * Math.random()))).toFixed(2);
				$(".ME_wo_evasee .vr_"+reading).css("display","block");
				$(".ME_wo_evasee .vr_"+reading+" #vr"+reading).val(vel_red);
				reading++;
				if(reading <= 3) {
					$(this).val("Velocity Reading "+(reading));
				} else {
					$(this).css("display","none");
					$("#ME_wo_measure").css("display","inline-block");
					reading = 1;
				}
			} else if(for_text == "with") {
				var vel_red = ((12 + ((12.9 - 12) * Math.random()))).toFixed(2);
				$(".ME_w_evasee .vr_"+reading).css("display","block");
				$(".ME_w_evasee .vr_"+reading+" #vr"+reading).val(vel_red);
				reading++;
				if(reading <= 3) $(this).val("Velocity Reading "+(reading));
				else {
					$(this).css("display","none");
					$("#ME_w_measure").css("display","inline-block");
				}
			}
		}
	});
	
	
	$(document).on("click", "#ME_wo_measure", function() {
		$(this).css("display","none");
		$('.ME_divLeft').css("display","none");
		var stat_press = (120 + ((130 - 120) * Math.random())).toFixed(2);
		var avg_veloci = ((parseFloat($(".ME_wo_evasee #vr1").val()) + parseFloat($(".ME_wo_evasee #vr2").val()) + parseFloat($(".ME_wo_evasee #vr3").val())) / 3).toFixed(2);
		var quanty_air = ((((3.14 * duct_diam) * duct_diam) / 4) * avg_veloci).toFixed(2);
		$(".ME_wo_evasee .remn_div #sp").val(stat_press);
		$(".ME_wo_evasee .remn_div #av").val(avg_veloci);
		$(".ME_wo_evasee .remn_div #qof").val(quanty_air);
		$(".ME_wo_evasee .remn_div").css("display","block");
		
		$(".ME_w_evasee").css("display","block");
		
		/*var txt1= (118.33+(122.55-118.33)* Math.random());
		var lineTo1x = (364 + (txt1 - 80)); var lineTo1y = (492 - (txt1 - 80));
		var lineTo2x = (366 + (txt1 - 80)); var lineTo2y = (493 - (txt1 - 80));
		
		alert(txt1+" ---- "+ lineTo1x+","+lineTo1y+" ---- "+ lineTo2x+","+lineTo2y);*/
		$(".dynm_red_div").css("width","60px").addClass("red_tube_class");
	});
	
	
	
	$(document).on("click", "#ME_w_measure", function() {
		$(this).css("display","none");
		$('.ME_divLeft').css("display","none");
		var stat_press = (150 + ((155 - 150) * Math.random())).toFixed(2);
		var avg_veloci = ((parseFloat($(".ME_w_evasee #vr1").val()) + parseFloat($(".ME_w_evasee #vr2").val()) + parseFloat($(".ME_w_evasee #vr3").val())) / 3).toFixed(2);
		//var quanty_air = ((((3.14 * duct_diam) * duct_diam) / 4) * avg_veloci).toFixed(2);
		var quanty_air = (avg_veloci * duct_diam).toFixed(2);
		$(".ME_w_evasee .remn_div #sp").val(stat_press);
		$(".ME_w_evasee .remn_div #av").val(avg_veloci);
		$(".ME_w_evasee .remn_div #qof").val(quanty_air);
		$(".ME_w_evasee .remn_div").css("display","block");
		$(".ME_w_evasee, .ME_calc_evasee").css("display","block");
		$(".dynm_red_div").css("width","120px").addClass("red_tube_class");
	});
	
	
	
	
	$(document).on("click", "#ME_w_ev_btn", function() {
		$(".ME_optionsDiv").css("display","none");	
		$(".ME_actualDiv").css("display","block");	
		$(".ME_imgDiv").css("background", "url(../simulation/images/mine-evasee-3.png) no-repeat center");
	});
	
	
	
	$(document).on("click", "#ME_w_calc_btn", function() {
		/*var wo_av = parseFloat($(".ME_wo_evasee .remn_div #av").val());
		var w_av  = parseFloat($(".ME_w_evasee .remn_div #av").val());
		var eff_of_evasee = (((wo_av - w_av) * 100) / w_av).toFixed(2); */
		
		var local2 = parseFloat($(".ME_wo_evasee .remn_div #sp").val());
		var local3 = parseFloat($(".ME_wo_evasee .remn_div #av").val());
		var local4 = parseFloat($(".ME_w_evasee .remn_div #sp").val());
		var local5 = parseFloat($(".ME_w_evasee .remn_div #av").val());
		var local6 = (local4 - local2);
		var local7 = 1.3;
		var local8 = ((((15 * local7) * local3) * local3) / 32).toFixed(2);
		var local9 = ((local6 / local8) * 100).toFixed(2);
		$("#eoe").val(local9);
		
		var local13 = (((local5 - local3) * 100) / local3).toFixed(2);
		$("#iaq").val(local13);
		
		
		
		
		
		$(".ME_calcDiv").css("display","none");	
		$(".ME_resultDiv").css("display","block");	
	});
	
	
});
