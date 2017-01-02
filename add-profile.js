// JavaScript Document
//https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform
$(document).ready(function(){
	$(".flip").click(function(){
		$(".panel").slideToggle("slow");
	});
});

/********************************* EDUCATION SECTION ********************************/

function fillit(va,id){
	$("#school").val(va);
	$("#school_hidden").val(id);
	document.getElementById('mysearch').style.display	=	'none';
}

function showEducation(){
	
	$('#education_fill').fadeOut(500);
	$('#eduformfill').fadeIn(500);
	$('#education').show();
	$('html, body').animate({scrollTop: $("#education").offset().top}, 200);	}
	
function ShowHideEdu(){
	
	$('#education').fadeOut(500);
	$('#edu_open').fadeIn(500);}
	
function hideEdu(eduID){
	
	$('#education_fill'+eduID).fadeOut(500);
	$('#eduformfill'+eduID).fadeIn(500);
	$('html, body').animate({scrollTop: $("#edu_open").offset().top}, 200);}
	
function educationForm(eduid,userid){
	
		
		var school 		= $('#school_hidden'+eduid).val();
		var school_field= $('#school'+eduid).val();
		var startYear 	= $('#startyear'+eduid).val();
		var endYear 	= $('#endyear'+eduid).val();
		var schoolDegree= $('#schooldegree'+eduid).val();
		var schoolFOS	= $('#schoolFieldOfStudy'+eduid).val();
		var schoolGrade = $('#schoolGrade'+eduid).val();
		var schoolActiv = $('#schoolActivities'+eduid).val();
		var schoolNotes = $('#schoolNotes'+eduid).val();

	if(eduid != ''){
		if(school == ''  || school_field == ''){
			$('#school'+eduid).css('border-color','red');
			$('html, body').animate({scrollTop: $("#school-section"+eduid).offset().top}, 200);
			return false;	
		}
		if(startYear > endYear){
			$('.error_message'+eduid).html('Please be sure the start year is not after the end year.');
			$('html, body').animate({scrollTop: $(".error_message"+eduid).offset().top}, 200);
			return false;
		} 
	}else{
		if(school == 0  || school_field == ''){
			$('#school').css('border-color','red');
			$('html, body').animate({scrollTop: $("#school-section").offset().top}, 200);
			return false;	
		}
		if(startYear > endYear){
			$('.error_message').html('Please be sure the start year is not after the end year.');
			$('html, body').animate({scrollTop: $(".error_message").offset().top}, 200);
			return false;
		}
		
	}
	$('#loading-section').show();
	$.ajax({	  
		url: base_path+'ajax/section_ajax.php',
		
		data: "post_url=education&eduid="+eduid+"&userid="+userid+"&school="+school+"&startYear="+startYear+"&endYear="+endYear+"&schoolDegree="+schoolDegree+"&schoolFOS="+schoolFOS+"&schoolGrade="+schoolGrade+"&schoolActiv="+schoolActiv+"&schoolNotes="+schoolNotes,
		
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
			$('#loading-section').hide();
			window.location.href = base_path+"profile/";
		}
	});
	
	}

function showFillform(educationID){
	
	$('#eduformfill'+educationID).fadeOut(500);
	$('#education_fill'+educationID).fadeIn(500);
}

$('#school').keyup(function(){
try{
		var maindiv 		= 	document.getElementById('mysearch');
		var tx				=	$("#school").val().trim();
		var ar				=	new Array();
		var divname;

		maindiv.innerHTML	=	'';
			
}catch(e)
{}
	$.ajax({
		
		   url:	base_path+'ajax/schools.php',
		   data:'name='+tx,
		   dataType:'json',
		   type:'post',
		   success:function(j){
			  
			  if(j.action=='yes'){

				  maindiv.innerHTML	=	'';
				  ar	=	j.data;

				   for(var i=0;i<ar.length;i++)
				   {	
						var obj	=	ar[i];
	
						divname		= 	document.createElement('label');
	
						divname.setAttribute('onclick' , 'fillit(\"'+obj.name+'\",\"'+obj.id+'\")');
										
						divname.innerHTML	=	obj.name+' ( '+obj.state+','+obj.country+' )';
	
						maindiv.appendChild(divname); 
	
						
						document.getElementById('mysearch').style.display	=	'block'; 
				 }	
			  }else{
				  document.getElementById('mysearch').style.display	=	'none'; 
				  }
			  
		   }
		});
		

	
	});
	
function removeEdu(eduId){
	
	$('#eduformfill'+eduId).html('');
	$('#education_fill'+eduId).fadeOut(500);
	$('#education_fill'+eduId).html('');
	
	$('#loading-section').show();
	$.ajax({
		url: base_path+'ajax/section_ajax.php',
		data: "post_url=edudelete&eduId="+eduId,	
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
			$('#loading-section').hide();
			
		}
		
	});
	
}	

/********************************* Experience SECTION ********************************/

function fillitcompanyexp(va,id){
	$("#company_name").val(va);
	$("#company_id").val(id);
	document.getElementById('companysearch').style.display	=	'none';
}

function showExperience(){

	$('#experience').show();
	$('html, body').animate({scrollTop: $("#experience").offset().top}, 200);	
	initialize();
}
function experienceForms(expID,userID){
	
		var currentmonth = $('#currentmonth').val();
		var currentyear = $('#currentyear').val();
				
		var company		= $('#company_id'+expID).val();
		var title	 	= $('#title'+expID).val();
		var country 	= $('#autocomplete'+expID).val();
		var startdate	= $('#startdate'+expID).val();
		var yearstartdate= $('#yearstartdate'+expID).val();
		
		var enddate 	= $('#enddate'+expID).val();
		var yearenddate = $('#endexpyear'+expID).val();
		var expdesc 	= $('#expdesc'+expID).val();

		
		
	if(company == ''){
		$('#company_name'+expID).css('border-color','red');
		$('html, body').animate({scrollTop: $("#company-section"+expID).offset().top}, 200);
		return false;	
	}
	
	if(title == ''){
		$('#title'+expID).css('border-color','red');
		$('html, body').animate({scrollTop: $("#title-section"+expID).offset().top}, 200);
		return false;	
	}
	
	if($('#exppresent'+expID).prop('checked')){
		
			exppresent = 'on';
			if(startdate == ''){
				$('#startdate'+expID).css('border-color','red');
				$('html, body').animate({scrollTop: $("#date_section").offset().top}, 200);
				return false;	
			}
			if(yearstartdate == ''){
				$('#yearstartdate'+expID).css('border-color','red');
				$('html, body').animate({scrollTop: $("#date_section").offset().top}, 200);
				return false;	
			}
			
		}else{
			
			exppresent = 'off';
			
			if(startdate == ''){
				$('#startdate'+expID).css('border-color','red');
				$('html, body').animate({scrollTop: $("#date_section").offset().top}, 200);
				return false;	
			}
			if(yearstartdate == ''){
				$('#yearstartdate'+expID).css('border-color','red');
				$('html, body').animate({scrollTop: $("#date_section").offset().top}, 200);
				return false;	
			}
			
			if(enddate == ''){
				$('#enddate'+expID).css('border-color','red');
				$('html, body').animate({scrollTop: $("#date_section"+expID).offset().top}, 200);
				return false;	
			}
			if(yearenddate == ''){
				$('#endexpyear'+expID).css('border-color','red');
				$('html, body').animate({scrollTop: $("#date_section"+expID).offset().top}, 200);
				return false;	
			}
		}

	if(yearstartdate > yearenddate){
		$('.error_message'+expID).html('Please be sure the start date is not after the end date.');
		$('html, body').animate({scrollTop: $(".error_message"+expID).offset().top}, 200);
		return false;
	} else {
		if(yearstartdate == yearenddate){
			if(startdate > enddate){
				$('.error_message'+expID).html('Please be sure the start date is not after the end date.');
				$('html, body').animate({scrollTop: $(".error_message"+expID).offset().top}, 200);
				return false;
			}
		}
	}
	
	
	if(currentyear == yearenddate && enddate > currentmonth ){
		
		//alert("Please don't select future date");
		$('.error_message'+expID).html('Please be sure the end date is not after the currnt date.');
		$('html, body').animate({scrollTop: $(".error_message"+expID).offset().top}, 200);
		return false;
	} else {

		$('#loading-section').show();
		$.ajax({	  
			url: base_path+'ajax/section_ajax.php',


			data: "post_url=experienceupdate&expID="+expID+"&userid="+userID+"&company="+company+"&title="+title+"&country="+country+"&startdate="+startdate+"&yearstartdate="+yearstartdate+"&enddate="+enddate+"&yearenddate="+yearenddate+"&expdesc="+expdesc+"&exppresent="+exppresent,	



			dataType:"json",
			cache: false,
			type: "POST",		
			success: function (dataform)
			{	
				$('#loading-section').hide();
				window.location.href = base_path+"profile/";
			}
		}); 

	}	
	
}

function showexpForm(expID){
	
	//$('#experience').html('');
	$('#showexpform'+expID).fadeOut(500);
	$('#experience_fill'+expID).fadeIn(500);
	initialize(expID);
}
function ShowHideExp(){
	
	$('#experience').fadeOut(500);
}
function hideExp(expID){
	
	$('#experience_fill'+expID).fadeOut(500);
	$('#showexpform'+expID).fadeIn(500);
	$('html, body').animate({scrollTop: $("#exp_open").offset().top}, 200);
}


function getPresent(id){
	
	if($("#exppresent"+id).prop('checked')){
		$('#daterange'+id).hide();
		$('#enddate'+id).val('');
		$('#year-enddate'+id).val('');
		$('#present_iv'+id).show();
		//$('#exppresent'+id).val('1')
	}else{
		$('#present_iv'+id).hide();
		$('#daterange'+id).show();
		//$('#exppresent'+id).val('0')
	}
}

$('#company_name').keyup(function(){
try{
		var maindiv 		= 	document.getElementById('companysearch');
		var tx				=	$("#company_name").val().trim();
		var ar				=	new Array();
		var divname;

		maindiv.innerHTML	=	'';
			
}catch(e)
{}
	$.ajax({
		
		   url:	base_path+'ajax/company.php',
		   data:'name='+tx,
		   dataType:'json',
		   type:'post',
		   success:function(j){
			  if(j.action=='yes'){
				  maindiv.innerHTML	=	'';
				  ar	=	j.data;

				   for(var i=0;i<ar.length;i++)
				   {	
						var obj	=	ar[i];
	
						divname		= 	document.createElement('label');
						divname.setAttribute('onclick' , 'fillitcompanyexp(\"'+obj.name+'\",\"'+obj.id+'\")');
						if(obj.city == null && obj.state == null){				
						
							divname.innerHTML	=	obj.name;
						
						}else{
						
							divname.innerHTML	=	obj.name+' ( '+obj.city+','+obj.state+' )';
						
						}
						maindiv.appendChild(divname); 
						document.getElementById('companysearch').style.display	=	'block'; 
				 }	
			  }else{
				  document.getElementById('companysearch').style.display	=	'none'; 
				  }
			  
		   }
		});
		

	
	});
	
function removePosition(expId){
	
	$('#showexpform'+expId).html('');
	$('#experience_fill'+expId).fadeOut(500);
	$('#experience_fill'+expId).html('');
	
	$('#loading-section').show();
	$.ajax({
		url: base_path+'ajax/section_ajax.php',
		data: "post_url=experiencedelete&expID="+expId,	
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
			$('#loading-section').hide();
			
		}
		
	});
	
}	
	
	
/********************************* Summary SECTION ********************************/

function showSummary(){
	$('#summary-form').fadeIn();
	$('html, body').animate({scrollTop: $("#summary-form").offset().top}, 200);
}
function showSummaryFillform(){
	
	$('#summary-section').fadeOut(500);
	$('#summary-form').fadeIn(500);
}
function hideSummary(){
	
	$('#summary-form').fadeOut(500);
	$('#summary-section').fadeIn(500);
	
}
function saveSummary(){
	
		var userID 		= $('#userid').val();
		var summary 	= $('#summary').val();
		
		$('#loading-section').show();
		$.ajax({	  
			url: base_path+'ajax/ajax_file.php',
			
			data: "post_url=summary&userid="+userID+"&summary="+summary,
			
			dataType:"json",
			cache: false,
			type: "POST",		
			success: function (dataform)
			{	
				$('#loading-section').hide();
				window.location.href = base_path+"profile/";
			}
		});
}

/********************************* Skills SECTION ********************************/

function showSkills(){
	
	$('#skills').show();
	$('html, body').animate({scrollTop: $("#skills").offset().top}, 200);
}

var limitsklls = 49;
var totalval = 0;
function addSkills(){
	
	var skills 		= $.trim($('#skillsvalue').val().toUpperCase());
	var optonval	=	parseInt($('#skills-editor').length);
	
	var data_save = $("#skills-editor .skills-text .value").map(function() { return $(this).text(); }).get().join();
		
	//totalval		=	optonval+0;
	totalval++;
	
	remaining = limitsklls - parseInt($('.skills-text').length);
	
	if(data_save.indexOf( skills ) != -1 && skills != ''){
		alert('already added this skills');
		
	}else{
	if($('.skills-text').length <= limitsklls){
		
		if(skills != ''){
		
			$("#skills-editor").append("<li class='skills_"+totalval+"_skill skills-text' ><input type='hidden' name='skill_value' id='skill_value' value='"+skills+"' /><span class='value'>"+skills+"</span><span class='remove' onclick='removeskills("+totalval+")'>x</span></li>");
		
			$('#skillsvalue').val('');	
			
			$('.remainskills').val(remaining);
		
		}
	}else{
		$('#saveskills').attr('disabled', true);	
		
		$('.error_message').html('');
		
	}
	}
}
		

function saveSkills(userid){
		
		radio1	= $('#RadioGroup2_0').val();
		radio2	= $('#RadioGroup2_1').val();
		
		if(radio1 != ''){
			endrosed =	radio1;
		}else {
			endrosed =	radio2;
		}

		//data_save 	= $('#skillsform').serializeArray();
		//data_save	= JSON.stringify(data_save);
		//var skills 		= $.trim($('#skillsvalue').val().toUpperCase());
		var data_save = $('input[name*=skill_value]').serialize();
	if(data_save)	{
		$.ajax({	  
		url: base_path+'ajax/section_ajax.php',
		data: { 
		  skill_value : data_save,
		  userid : userid,
		  endrosed: endrosed,
		  post_url : 'userskills'
	  	},
		//data: "post_url=userskills&userid="+userid+"&endrosed="+endrosed+"&skill_value="+data_save,	
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
			$('#loading-section').hide();
			window.location.href = base_path+"profile/";
			location.reload();
		}
		}); 
	} else{
		alert('Please add skill');
	
	}
}
function hideSkills(){
	
	$('#skills').fadeOut(500);
	$('#skills-fill').fadeIn(500);
	
}
function removeskills(totalval){
	
	$('.skills_'+totalval+'_skill').remove();
}
function removeEditskills(skillsid){
	
	$('#skills_'+skillsid+'_skill').remove();
	
	$.ajax({	  
		url: base_path+'ajax/section_ajax.php',
		data: "post_url=removeskills&skillsid="+skillsid,	
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
			$('#loading-section').hide();
			//window.location.href = base_path+"profile/";
		}
	});
	
}
function getEditskill(){
	
	$('#skills-fill').fadeOut(500);
	$('#skills').fadeIn(500);
}

/********************************* Language SECTION ********************************/

function showLanguage(){
	
	$('#languages').show();
	$('html, body').animate({scrollTop: $("#languages").offset().top}, 200);
}

var count = 0;
var limit = 25;

$(function () {
	$('.add_language').click(function () {
		
		var optonval	=	parseInt($('.add_mores').length);
		totalval		=	optonval+0;

	count += 1;
	if ($('.add_mores').length <= limit) {
		var str	  =	'';
		str		+=  '<div class="morelanguage add_mores"  id="opt'+totalval+'">';
		str		+=  '<div class="col-sm-5"><div class="form-group">';
		str		+=	'<label>Language <abbr title="Required" class="required">*</abbr></label>';
		str		+=	'<input type="text" name="language_name'+totalval+'" id="languagename_'+totalval+'" autocomplete="off" class="form-control">';
		str		+=	'</div></div>';
		
		str		+=  '<div class="col-sm-5"><div class="form-group">';
		str		+=	'<label for="">Proficiency</label>';
		str		+=	'<select name="proficiency'+totalval+'" id="proficiency_'+totalval+'" class="form-control">';
        str		+=	'<option value="">Proficiency...</option>';
        str		+=	'<option value="elementary">Elementary proficiency</option>';
        str		+=	'<option value="limited working">Limited working proficiency</option>';
        str		+=	'<option value="professional working">Professional working proficiency</option>';
        str		+=	'<option value="full professional">Full professional proficiency</option>';
        str		+=	'<option value="native or bilingual">Native or bilingual proficiency</option>';
        str		+=	'</select>';
		str		+=	'<div class="posi">';
        str		+=	'<span class="close abs" onclick="removeOption('+totalval+')"><span class=""><i class="fa fa-close"></i></span></span>';
        str		+=	'</div>';
		str		+=	'</div></div>';
		str		+=	'<div class="col-sm-2"> &nbsp; </div>';
		str		+=	'</div>';
		$('#add_mores').append(str);
	}else {
			$('#add_more').hide();
		}
	});
});
function removeOption(id){

		var optionId	=	'opt'+id;
		$('#'+optionId).remove();
		$('#add_more').show();
}
function saveLanguage(userid){
	
	 var language_name = $('input[name*=language_name]').serialize();
	 var proficiency = $('select[name*=proficiency]').serialize();
		
	
		$('#loading-section').show();
		$.ajax({	  
		
		url: base_path+'ajax/section_ajax.php',
		data: { 
		  language : language_name,
		  proficiency : proficiency,
		  userid : userid,
		  post_url : 'userlanguage'
	  },
//		data: "post_url=userlanguage&userid="+userid+"&language="+language_name+"&proficiency="+proficiency,	
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
			$('#loading-section').hide();
			window.location.href = base_path+"profile/";
		}
	});
	
}

function editeLanguage(userid){
	
	$('#languages-view').fadeOut(500);
	$('#languages-edit').fadeIn(500);
	$('html, body').animate({scrollTop: $("#languages_section").offset().top}, 200);
}
function hideLanguage(id){
	if(id == ''){
		$('#languages').fadeOut(500);
	}else{
		$('#languages-edit').fadeOut(500);
		$('#languages-view').fadeIn(500);	
	}
	
}

/********************************* PersonalDetail SECTION ********************************/

function showPersonalDetail(){
	
	$('#additional_info').show();
	$('#personal_details').show();
	$('html, body').animate({scrollTop: $("#personal_details").offset().top}, 200);	
}

function savePersonalDetail(userid){

	var dobmonth=	$('#dobmonth').val();
	var dobday	=	$('#dobday').val();
	var dobyear	=	$('#dobyear').val();
	var marital	=	$('#maritalstatus').val();	
		
	$('#loading-section').show();
	$.ajax({	  
		
		url: base_path+'ajax/section_ajax.php',

		data: "post_url=userdetail&userid="+userid+"&dobmonth="+dobmonth+"&dobday="+dobday+"&dobyear="+dobyear+"&marital="+marital,	
		
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
			$('#loading-section').hide();
			window.location.href = base_path+"profile/";
		}
	});
		
			
}

function hideperdetail(){
	
	$('#personal_detail').fadeIn(500);
	$('#additional_info').fadeOut(500);
	$('#personal_details').fadeOut(500);
	
	
}
function editPersonalDetail(){
	
	$('#additional_info').fadeIn(500);
	$('#personal_details').fadeIn(500);
	$('#personal_detail').fadeOut(500);	
	$('html, body').animate({scrollTop: $("#personal_details").offset().top}, 200);
}

/********************************* Interests SECTION ********************************/

function showInterests(){
	
	$('#additional_info').show();
	$('#interest').show();
	$('html, body').animate({scrollTop: $("#interest").offset().top}, 200);	
}

function saveInterest(userid){

	var interests =	$('#interests').val();
	
	$('#loading-section').show();
	$.ajax({	  
		
		url: base_path+'ajax/section_ajax.php',

		data: "post_url=userinterest&userid="+userid+"&interests="+interests,	
		
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
			$('#loading-section').hide();
			window.location.href = base_path+"profile/";
		}
	});
	
}

function hideInterest(){
	
	$('#interest_detail').fadeIn(500);
	$('#interest').fadeOut(500);
	$('#additional_info').fadeOut(500);	
}
function editInterest(){
	
	$('#additional_info').fadeIn(500);
	$('#interest').fadeIn(500);
	$('#interest_detail').fadeOut(500);	
	$('html, body').animate({scrollTop: $("#interest").offset().top}, 200);
}

/********************************* Advice SECTION ********************************/

function showAdvice(){
	
	$('#additional_info').show();
	$('#advice_for_contacting').show();
	$('html, body').animate({scrollTop: $("#advice_for_contacting").offset().top}, 200);	
}

function saveAdvice(userid){
	
	var useradvice =	$('#useradvice').val();
	
	$('#loading-section').show();
	$.ajax({	  
		
		url: base_path+'ajax/section_ajax.php',

		data: "post_url=useradvice&userid="+userid+"&useradvice="+useradvice,	
		
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
			$('#loading-section').hide();
			window.location.href = base_path+"profile/";
		}
	});
	
}

function hideAdvice(){
	
	$('#advice_detail').fadeIn(500);
	$('#advice_for_contacting').fadeOut(500);
	$('#additional_info').fadeOut(500);		
}



function editUserAdvice(){
	$('#additional_info').fadeIn(500);
	$('#advice_for_contacting').fadeIn(500);
	$('#advice_detail').fadeOut(500);
	$('html, body').animate({scrollTop: $("#advice_for_contacting").offset().top}, 200);
		
}

/********************************* Project SECTION ********************************/

function showProject(){
		
	$('#projects').show();
	$('html, body').animate({scrollTop: $("#projects").offset().top}, 200);
}

function saveProject(proid,userid){
	
		var procurrentmonth = $('#procurrentmonth').val();
		var procurrentyear = $('#procurrentyear').val();
		
		var proname			=	$('#proname'+proid).val();
		var proccupation	=	$('#prooccupation'+proid).val();
		var prostartdate	=	$('#projectmnth'+proid).val();
		var prostartYear	=	$('#prostartyears'+proid).val();
		var proenddate		=	$('#projectendmnth'+proid).val();
		var proendyear		=	$('#proendyears'+proid).val();	
		var projecturl		=	$('#projecturl'+proid).val();
		var data_save 		=   $('input[name*=members'+proid+']').serializeArray();
		var	member			=	JSON.stringify(data_save);
		var projectdesc		=	$('#projectdesc'+proid).val();
		

		if(proid > 0) {	
	
			if(proname == ''){
				
				$('#proname'+proid).css('border-color','red');
				$('html, body').animate({scrollTop: $("#proname"+proid).offset().top}, 200);
				return false;	
			}
			
			if(proccupation == ''){
				
				$('#prooccupation'+proid).css('border-color','red');
				$('html, body').animate({scrollTop: $("#prooccupation"+proid).offset().top}, 200);
				return false;	
			}
			if($('#ongoingproject'+proid).prop('checked')){
				propresent = 'on';
			}else{
				propresent = 'off';
			}
			
			if(prostartYear > proendyear){
				$('.error_message'+proid).html('Please be sure the start date is not after the end date.');
				$('html, body').animate({scrollTop: $(".error_message"+proid).offset().top}, 200);
				return false;
			} else {
				if(prostartYear == proendyear){
					if(prostartdate > proenddate){
						$('.error_message'+proid).html('Please be sure the start date is not after the end date.');
						$('html, body').animate({scrollTop: $(".error_message"+proid).offset().top}, 200);
						return false;
					}
				}
			}
			if(projecturl == ''){
				
				$('#projecturl'+proid).css('border-color','red');
				$('html, body').animate({scrollTop: $("#projecturl"+proid).offset().top}, 200);
				return false;	
			}
		}else{
		
			if(proname == ''){
			
				$('#proname').css('border-color','red');
				$('html, body').animate({scrollTop: $("#proname").offset().top}, 200);
				return false;	
			}
		
			if(proccupation == ''){
			
				$('#prooccupation').css('border-color','red');
				$('html, body').animate({scrollTop: $("#prooccupation").offset().top}, 200);
				return false;	
			}
			
			if($('#ongoingproject').prop('checked')){
				propresent = 'on';
			}else{
				propresent = 'off';
			}
			
			if(prostartYear > proendyear){
				$('.error_message').html('Please be sure the start date is not after the end date.');
				$('html, body').animate({scrollTop: $(".error_message").offset().top}, 200);
				return false;
			} else {
				if(prostartYear == proendyear){
					if(prostartdate > proenddate){
						$('.error_message').html('Please be sure the start date is not after the end date.');
						$('html, body').animate({scrollTop: $(".error_message").offset().top}, 200);
						return false;
					}
				}
			}
			if(projecturl == ''){
			
				$('#projecturl').css('border-color','red');
				$('html, body').animate({scrollTop: $("#projecturl").offset().top}, 200);
				return false;	
			}
	
		}
	
	$('#loading-section').show(); 
	
	if(procurrentyear == proendyear && proenddate > procurrentmonth ){
		
		$('.error_message'+proid).html('Please be sure the end date is not after the currnt date.');
		$('html, body').animate({scrollTop: $(".error_message"+proid).offset().top}, 200);
		return false;
	
	} else {  
		
		$.ajax({	  
		
		url: base_path+'ajax/section_ajax.php',

		data: "post_url=userproject&proid="+proid+"&userid="+userid+"&proname="+proname+"&proccupation="+proccupation+"&prostartdate="+prostartdate+"&prostartYear="+prostartYear+"&proenddate="+proenddate+"&proendyear="+proendyear+"&option="+propresent+"&projecturl="+projecturl+"&projectdesc="+projectdesc+"&member_value="+member,	
		
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
			$('#loading-section').hide();
			window.location.href = base_path+"profile/";
		}
	});   
	
	}
	
}
function showproForm(proID){
	
	$('#showproForm'+proID).fadeOut(500);
	$('#project_fill'+proID).fadeIn(500);
	
}

function projecthide(proId){
	
	$('#project_fill'+proId).fadeOut(500);
	$('#showproForm'+proId).fadeIn(500);
	$('html, body').animate({scrollTop: $("#project_section").offset().top}, 200);
	
	
}
function hideProject(){
	
	$('#projects').fadeOut(500);
	$('#project_section').fadeIn(500);
	
}



function ongoingProject(id){
	
if(id == ''){
	if($("#ongoingproject").prop('checked')){
		
		$('#projectdaterange').hide();
		$('#project_iv').show();
		$('#projectendmnth'+id).val('');
		$('#proendyears'+id).val('');
	}else{
		$('#project_iv').hide();
		$('#projectdaterange').show();
	}
}else{
	
	if($("#ongoingproject"+id).prop('checked')){
		
		$('#projectdaterange'+id).hide();
		$('#project_iv'+id).show();
		$('#projectendmnth'+id).val('');
		$('#proendyears'+id).val('');
	}else{
		$('#project_iv'+id).hide();
		$('#projectdaterange'+id).show();
	}
}
	
}

$('#addmember').keyup(function(){
try{
		var maindiv 		= 	document.getElementById('membersearch');
		var tx				=	$("#addmember").val().trim();
		var ar				=	new Array();
		var divname;

		maindiv.innerHTML	=	'';
			
}catch(e)
{}
	$.ajax({
		
		   url:	base_path+'ajax/member.php',
		   data:'name='+tx,
		   dataType:'json',
		   type:'post',
		   success:function(j){
			  if(j.action=='yes'){
				  maindiv.innerHTML	=	'';
				  ar	=	j.data;

				   for(var i=0;i<ar.length;i++)
				   {	
						var obj	=	ar[i];
	
						divname		= 	document.createElement('label');
						divname.setAttribute('onclick' , 'fillitmember(\"'+obj.image+'\",\"'+obj.name+'\",\"'+obj.id+'\")');
						if(obj.jobtitle == null){				
						
							divname.innerHTML	=	obj.name;
						
						}else{
						
							divname.innerHTML	= '<img width="40" src="'+base_path+obj.image+'"> '+obj.name+' </br>'+obj.jobtitle+'';
						
						}
						maindiv.appendChild(divname); 
						document.getElementById('membersearch').style.display	=	'block'; 
				 }	
			  }else{
				  document.getElementById('membersearch').style.display	=	'none'; 
				  }
			  
		   }
		});
		

	
	});
	
function fillitmember(img,va,id){
	
	$("#user_section").append("<div class='col-sm-4' id='user_section"+id+"' ><input type='hidden' name='members[]' id='members' value='"+id+"' /><div class='xs_cont'><div class='xs_pic'><img src='"+base_path+img+"' width='20' ></div><div class='xs_name'>"+va+"</div><span class='xs_remove' onclick='removemember("+id+")'>x</span><div class='clr'></div></div></div>");
	$('#addmember').val('');
	document.getElementById('membersearch').style.display	=	'none';
}
function removemember(userid){
		
	$('#user_section'+userid).remove();	
}

function removeProject(proId){
	
	$('#showproForm'+proId).html('');
	$('#project_fill'+proId).fadeOut(500);
	$('#project_fill'+proId).html('');
	
	$('#loading-section').show();
	$.ajax({
		url: base_path+'ajax/section_ajax.php',
		data: "post_url=prodelete&proId="+proId,	
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
			$('#loading-section').hide();
			
		}
		
	});
	
}	
/********************************* Volunteer SECTION ********************************/

function showVolunteerExp(){
	
	$('#volunteer').show();
	$('#volunteerexp').show();
	$('html, body').animate({scrollTop: $("#volunteer").offset().top}, 200);
	
}
function showVolunteerOpp(){
	
	$('#volunteer').show();
	$('#volunteerexp').hide();
	$('#volunteeropp').show();
	$('html, body').animate({scrollTop: $("#volunteeropp").offset().top}, 200);
}

function hideVolunteerExp(id){
	if(id == ''){
		$('#volunteer').fadeOut(500);
	}else{
		$('#volunteer_fill'+id).fadeOut(500);
		$('#volunteer'+id).hide();
		$('#showvolForm'+id).show();
		$('html, body').animate({scrollTop: $("#volunteer_section").offset().top}, 200);
		
	}
}

$('#organization').keyup(function(){
try{
		var maindiv 		= 	document.getElementById('organizationsearch');
		var tx				=	$("#organization").val().trim();
		var ar				=	new Array();
		var divname;

		maindiv.innerHTML	=	'';
			
}catch(e)
{}
	$.ajax({
		
		   url:	base_path+'ajax/company.php',
		   data:'name='+tx,
		   dataType:'json',
		   type:'post',
		   success:function(j){
			  
			  if(j.action=='yes'){

				  maindiv.innerHTML	=	'';
				  ar	=	j.data;

				   for(var i=0;i<ar.length;i++)
				   {	
						var obj	=	ar[i];
	
						divname		= 	document.createElement('label');
	
						divname.setAttribute('onclick' , 'fillitcompany(\"'+obj.name+'\",\"'+obj.id+'\")');
						
						if(obj.city == null && obj.state == null){				
						
							divname.innerHTML	=	obj.name;
						
						}else{
						
							divname.innerHTML	=	obj.name+' ( '+obj.city+','+obj.state+' )';
						
						}

						maindiv.appendChild(divname); 
	
						
						document.getElementById('organizationsearch').style.display	=	'block'; 
				 }	
			  }else{
				  document.getElementById('organizationsearch').style.display	=	'none'; 
				  }
			  
		   }
		});
		

	
	});
	
function fillitcompany(va,id)
{
	$("#organization").val(va);
	$("#organization_id").val(id);
	document.getElementById('organizationsearch').style.display	=	'none';

}

function saveVolunteerExp(volID,userid){
	
	var volunteer	 = $('#volunteer_id'+volID).val();
	var organization = $('#organization_id'+volID).val();
	var role 		 = $('#role'+volID).val();
	var causeParam	 = $('#causeparam'+volID).val();
	var volstartdate = $('#volstartdate'+volID).val();
	var volstartyear = $('#volstartyears'+volID).val();
	var volenddate 	 = $('#volenddate'+volID).val();
	var volendyear 	 = $('#volendyears'+volID).val();
	var description  = $('#description'+volID).val();
		
	if(organization == ''){

		$('#organization'+volID).css('border-color','red');
		$('html, body').animate({scrollTop: $("#organization"+volID).offset().top}, 200);
		return false;	
	}
	if(role == ''){

		$('#role'+volID).css('border-color','red');
		$('html, body').animate({scrollTop: $("#role"+volID).offset().top}, 200);
		return false;	
	}
	
	if($('#volpresent'+volID).prop('checked')){
   		volpresent = 'on';
	}else{
		volpresent = 'off';
	}
	
	if(volstartyear > volendyear){
		$('.error_message'+volID).html('Please be sure the start date is not after the end date.');
		$('html, body').animate({scrollTop: $(".error_message"+volID).offset().top}, 200);
		return false;
	} else {
		if(volstartyear == volendyear){
			if(volstartdate > volenddate){
				$('.error_message'+volID).html('Please be sure the start date is not after the end date.');
				$('html, body').animate({scrollTop: $(".error_message"+volID).offset().top}, 200);
				return false;
			}
		}
	}
			
	
	$('#loading-section').show();
	$.ajax({	  
		
		url: base_path+'ajax/section_ajax.php',

		data: "post_url=uservolunteer&volunteer_id="+volunteer+"&userid="+userid+"&organization_id="+organization+"&role="+role+"&causeParam="+causeParam+"&volstartdate="+volstartdate+"&volstartyear="+volstartyear+"&volenddate="+volenddate+"&volendyear="+volendyear+"&volpresent="+volpresent+"&description="+description,	
		
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
		
			$('#loading-section').hide();
			window.location.href = base_path+"profile/";
		}
	});
	
	
}

function getPresentvol(id){
	
	if($("#volpresent"+id).prop('checked')){

		$('#voldaterange'+id).hide();
		$('#volenddate'+id).val('');
		$('#volendyear'+id).val('');
		$('#volunteer_iv'+id).show();
		
	}else{
		$('#volunteer_iv'+id).hide();
		$('#voldaterange'+id).show();
	}
}

function showvolForm(volId){
	
	$('#showvolForm'+volId).fadeOut(500);
	$('#volunteer_fill'+volId).fadeIn(500);
	
}

function saveVolunteerOpp(voloppid,userid){
	
	if($('#nonprofit'+voloppid).prop('checked')){
   			nonprofit = '1';
	}else{
			nonprofit = '0';
	}
	
	if($('#skillsbased'+voloppid).prop('checked')){
   			skillsbased = '1';
	}else{
			skillsbased = '0';
	}
	
	
	$('#loading-section').show();
	$.ajax({	  
		
		url: base_path+'ajax/section_ajax.php',

		data: "post_url=uservolunteeropp&voloppid="+voloppid+"&userid="+userid+"&nonprofit="+nonprofit+"&skillsbased="+skillsbased,	
		
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
		
			$('#loading-section').hide();
			window.location.href = base_path+"profile/";
		}
	});
	
	
}
function hidevolOpp(){
	
	$('#volunteer').fadeOut(500);
	$('#volunteeropp-fill').fadeOut(500);
	$('#voloppsection').fadeIn(500);
		
}

function showvolopp(){
	
	$('#voloppsection').fadeOut(500);
	$('#volunteeropp-fill').fadeIn(500);	
}

function removeVolExp(volId){
	
	$('#showvolForm'+volId).html('');
	$('#volunteer_fill'+volId).fadeOut(500);
	$('#volunteer_fill'+volId).html('');
	
	$('#loading-section').show();
	$.ajax({
		url: base_path+'ajax/section_ajax.php',
		data: "post_url=volexpdelete&volid="+volId,	
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
			$('#loading-section').hide();
			
		}
		
	});
	
}	
/********************************* Organizations SECTION ********************************/

function showOrganizations(){
	
	$('#organizations').show();
	$('html, body').animate({scrollTop: $("#organizations").offset().top}, 200);		
	
}

function getPresentorg(id){
	
	if($("#orgpresent"+id).prop('checked')){

		$('#orgdaterange'+id).hide();
		$('#orgenddate'+id).val('');
		$('#orgendyear'+id).val('');
		$('#org_iv'+id).show();
		
	}else{
		$('#org_iv'+id).hide();
		$('#orgdaterange'+id).show();
	}
}

$('#orgcompany').keyup(function(){
	
try{
		var maindiv 		= 	document.getElementById('orgcompanysearch');
		var tx				=	$("#orgcompany").val().trim();
		var ar				=	new Array();
		var divname;

		maindiv.innerHTML	=	'';
			
}catch(e)
{}
	$.ajax({
		
		   url:	base_path+'ajax/company.php',
		   data:'name='+tx,
		   dataType:'json',
		   type:'post',
		   success:function(j){
			  
			  if(j.action=='yes'){

				  maindiv.innerHTML	=	'';
				  ar	=	j.data;

				   for(var i=0;i<ar.length;i++)
				   {	
						var obj	=	ar[i];
	
						divname		= 	document.createElement('label');
	
						divname.setAttribute('onclick' , 'fillitorgcompany(\"'+obj.name+'\",\"'+obj.id+'\")');
						
						if(obj.city == null && obj.state == null){				
						
							divname.innerHTML	=	obj.name;
						
						}else{
						
							divname.innerHTML	=	obj.name+' ( '+obj.city+','+obj.state+' )';
						
						}

						maindiv.appendChild(divname); 
	
						
						document.getElementById('orgcompanysearch').style.display	=	'block'; 
				 }	
			  }else{
				  document.getElementById('orgcompanysearch').style.display	=	'none'; 
				  }
			  
		   }
		});
		

	
	});
	
function fillitorgcompany(va,id){
	$("#orgcompany").val(va);
	$("#orgcomp_id").val(id);
	document.getElementById('orgcompanysearch').style.display	=	'none';

}


function saveOrganization(orgID,userid){
	
	var orgcomp 	 = $('#orgcomp_id'+orgID).val();
	var position	 = $('#position'+orgID).val();
	var orgoccupation= $('#orgoccupation'+orgID).val();
	var orgstartdate = $('#orgstartdate'+orgID).val();
	var orgstartyear = $('#orgstartyears'+orgID).val();
	var orgenddate 	 = $('#orgenddate'+orgID).val();
	var orgendyear 	 = $('#orgendyears'+orgID).val();
	var orgdescription  = $('#orgdescription'+orgID).val();
	
	
	
	if(orgID == ''){	
		if(orgcomp == ''){
			$('#orgcompany').css('border-color','red');
			$('html, body').animate({scrollTop: $("#orgcompany").offset().top}, 200);
			return false;	
		}
		if(orgstartyear > orgendyear){
			$('.error_message').html('Please be sure the start date is not after the end date.');
			$('html, body').animate({scrollTop: $(".error_message").offset().top}, 200);
			return false;
		} else {
			if(orgstartyear == orgendyear){
				if(orgstartdate > orgenddate){
					$('.error_message').html('Please be sure the start date is not after the end date.');
					$('html, body').animate({scrollTop: $(".error_message").offset().top}, 200);
					return false;
				}
			}
		}
		if($('#orgpresent').prop('checked')){
   			orgpresent = 'on';
		}else{
			orgpresent = 'off';
		}
		
	}else{
		if(orgcomp == ''){
			$('#orgcompany'+orgID).css('border-color','red');
			$('html, body').animate({scrollTop: $("#orgcompany"+orgID).offset().top}, 200);
			return false;	
		}
		if(orgstartyear > orgendyear){
			$('.error_message'+orgID).html('Please be sure the start date is not after the end date.');
			$('html, body').animate({scrollTop: $(".error_message"+orgID).offset().top}, 200);
			return false;
		} else {
			if(orgstartyear == orgendyear){
				if(orgstartdate > orgenddate){
					$('.error_message'+orgID).html('Please be sure the start date is not after the end date.');
					$('html, body').animate({scrollTop: $(".error_message"+orgID).offset().top}, 200);
					return false;
				}
			}
		}
		if($('#orgpresent'+orgID).prop('checked')){
   			orgpresent = 'on';
		}else{
			orgpresent = 'off';
		}
		
	}
	
	
	
	
	$('#loading-section').show();
	$.ajax({	  
		
		url: base_path+'ajax/section_ajax.php',

		data: "post_url=userorganization&org_id="+orgID+"&userid="+userid+"&orgcomp="+orgcomp+"&position="+position+"&orgoccupation="+orgoccupation+"&orgstartdate="+orgstartdate+"&orgstartyear="+orgstartyear+"&orgenddate="+orgenddate+"&orgendyear="+orgendyear+"&orgpresent="+orgpresent+"&orgdescription="+orgdescription,	
		
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
		
			$('#loading-section').hide();
			window.location.href = base_path+"profile/";
		}
	});
	
}

function showorgForm(orgid){
	
	$('#showorgForm'+orgid).fadeOut(500);
	$('#organizations_fill'+orgid).fadeIn(500);
}

function hideOrganization(orgid){
	if(orgid == ''){
		$('#organizations').fadeOut(500);
	}else{
		$('#organizations_fill'+orgid).fadeOut(500);
		$('#organizations'+orgid).hide();
		$('#showorgForm'+orgid).show();
		$('html, body').animate({scrollTop: $("#organizations_section").offset().top}, 200);
		
	}
}

function removeOrg(orgId){
	
	$('#showorgForm'+orgId).html('');
	$('#organizations_fill'+orgId).fadeOut(500);
	$('#organizations_fill'+orgId).html('');
	
	$('#loading-section').show();
	$.ajax({
		url: base_path+'ajax/section_ajax.php',
		data: "post_url=orgdelete&orgId="+orgId,	
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
			$('#loading-section').hide();
			
		}
		
	});
	
}	
/********************************* Honors & Awards Section ********************************/

function showHonors(){
	$('#honors_awards').show();
	$('html, body').animate({scrollTop: $("#honors_awards").offset().top}, 200);
}

function saveHonor(honorid,userid){
	
	var honortitle 	 	= $('#honortitle'+honorid).val();
	var honorocc	 	= $('#honoroccupation'+honorid).val();
	var honorissue	 	= $('#honorissue'+honorid).val();
	var honorstartdate 	= $('#honorstartdate'+honorid).val();
	var honorstartyear 	= $('#honorstartyear'+honorid).val();
	var honordesc  		= $('#honordesc'+honorid).val();
	
	if(honorid == ''){	
		if(honortitle == ''){
	
			$('#honortitle').css('border-color','red');
			$('html, body').animate({scrollTop: $("#honortitle").offset().top}, 200);
			return false;	
		}
		
		if(honorissue == ''){
	
			$('#honorissue').css('border-color','red');
			$('html, body').animate({scrollTop: $("#honorissue").offset().top}, 200);
			return false;	
		}
	}else{
		if(honortitle == ''){
	
			$('#honortitle'+honorid).css('border-color','red');
			$('html, body').animate({scrollTop: $("#honortitle"+honorid).offset().top}, 200);
			return false;	
		}
		
		if(honorissue == ''){
	
			$('#honorissue'+honorid).css('border-color','red');
			$('html, body').animate({scrollTop: $("#honorissue"+honorid).offset().top}, 200);
			return false;	
		}
		
	}
	
	$('#loading-section').show();
	$.ajax({	  
		
		url: base_path+'ajax/section_ajax.php',

		data: "post_url=userhonor&honorid="+honorid+"&userid="+userid+"&honortitle="+honortitle+"&honorocc="+honorocc+"&honorissue="+honorissue+"&honorstartdate="+honorstartdate+"&honorstartyear="+honorstartyear+"&honordesc="+honordesc,	
		
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
		
			$('#loading-section').hide();
			window.location.href = base_path+"profile/";
		}
	});
		
	
}

function showhonForm(honourid){
	
	$('#showhonForm'+honourid).fadeOut(500);
	$('#honour_fill'+honourid).fadeIn(500);
}

function hideHonor(honourid){
	if(honourid == ''){
		$('#honors_awards').fadeOut(500);
	}else{
		$('#honour_fill'+honourid).fadeOut(500);
		$('#honors_awards'+honourid).hide();
		$('#showhonForm'+honourid).show();
		$('html, body').animate({scrollTop: $("#honor_section").offset().top}, 200);
		
	}
}

function removeAward(awardId){
	
	$('#showhonForm'+awardId).html('');
	$('#honour_fill'+awardId).fadeOut(500);
	$('#honour_fill'+awardId).html('');
	
	$('#loading-section').show();
	$.ajax({
		url: base_path+'ajax/section_ajax.php',
		data: "post_url=awarddelete&awardId="+awardId,	
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
			$('#loading-section').hide();
			
		}
		
	});
	
}	


/********************************* Test Scores Section ********************************/

function showScores(){
	$('#test_scores').show();
	$('html, body').animate({scrollTop: $("#test_scores").offset().top}, 200);
}

function saveScore(scoreid,userid){
	
	var scorename 	 	= $('#scorename'+scoreid).val();
	var scoreoccp	 	= $('#scoreoccp'+scoreid).val();
	var score		 	= $('#score'+scoreid).val();
	var scoremonth	 	= $('#scoremonth'+scoreid).val();
	var scoreyear	 	= $('#scoreyears'+scoreid).val();
	var scoredesc  		= $('#scoredesc'+scoreid).val();
	
	if(scoreid == ''){	
		if(scorename == ''){
	
			$('#scorename').css('border-color','red');
			$('html, body').animate({scrollTop: $("#scorename").offset().top}, 200);
			return false;	
		}
		
		if(score == ''){
	
			$('#score').css('border-color','red');
			$('html, body').animate({scrollTop: $("#score").offset().top}, 200);
			return false;	
		}
	}else{
		if(scorename == ''){
	
			$('#scorename'+scoreid).css('border-color','red');
			$('html, body').animate({scrollTop: $("#scorename"+scoreid).offset().top}, 200);
			return false;	
		}
		
		if(score == ''){
	
			$('#score'+scoreid).css('border-color','red');
			$('html, body').animate({scrollTop: $("#score"+scoreid).offset().top}, 200);
			return false;	
		}
		
	}
	
	$('#loading-section').show();
	$.ajax({	  
		
		url: base_path+'ajax/section_ajax.php',

		data: "post_url=userscore&scoreid="+scoreid+"&userid="+userid+"&scorename="+scorename+"&scoreoccp="+scoreoccp+"&score="+score+"&scoremonth="+scoremonth+"&scoreyear="+scoreyear+"&scoredesc="+scoredesc,	
		
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
		
			$('#loading-section').hide();
			window.location.href = base_path+"profile/";
		}
	});	
}

function showscoreForm(scoreid){
	
	$('#showscoreForm'+scoreid).fadeOut(500);
	$('#score_fill'+scoreid).fadeIn(500);
}

function hideScore(scoreid){
	if(scoreid == ''){
		$('#test_scores').fadeOut(500);
	}else{
		$('#score_fill'+scoreid).fadeOut(500);
		$('#test_scores'+scoreid).hide();
		$('#showscoreForm'+scoreid).show();
		$('html, body').animate({scrollTop: $("#score_section").offset().top}, 200);
		
	}
}

function removeScore(scoreId){
	
	$('#showhonForm'+scoreId).html('');
	$('#honour_fill'+scoreId).fadeOut(500);
	$('#honour_fill'+scoreId).html('');
	
	$('#loading-section').show();
	$.ajax({
		url: base_path+'ajax/section_ajax.php',
		data: "post_url=scoredelete&scoreId="+scoreId,	
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
			$('#loading-section').hide();
			
		}
		
	});
	
}	
/********************************* Certifications Section ********************************/

function showCertifications(){

	$('#certifications').show();
	$('html, body').animate({scrollTop: $("#certifications").offset().top}, 200);
}

function saveCertifications(certiID,userid){
	
	
	var certifiname 	= $('#certifiname'+certiID).val();
	var certifiauthor 	= $('#certifiauthor'+certiID).val();
	var licenseno 		= $('#licenseno'+certiID).val();
	var certifiurl 		= $('#certifiurl'+certiID).val();
	var startmnth 		= $('#certifistartmnth'+certiID).val();
	var startyear 		= $('#certifistartyear'+certiID).val();
	var endmnth 		= $('#certifiendmnth'+certiID).val();
	var endyear 		= $('#certifiendyear'+certiID).val();
	
	
	
	
	if(certiID == ''){	
		if(certifiname == ''){
	
			$('#certifiname').css('border-color','red');
			$('html, body').animate({scrollTop: $("#certifiname").offset().top}, 200);
			return false;	
		}
		if(startyear > endyear){
			$('.error_message').html('Please be sure the start date is not after the end date.');
			$('html, body').animate({scrollTop: $(".error_message").offset().top}, 200);
			return false;
		} else {
			if(startyear == endyear){
				if(startmnth > endmnth){
					$('.error_message').html('Please be sure the start date is not after the end date.');
					$('html, body').animate({scrollTop: $(".error_message").offset().top}, 200);
					return false;
				}
			}
		}
		if($('#cerifiexp').prop('checked')){
   			orgpresent = 'on';
		}else{
			orgpresent = 'off';
		}
	}else{
		if(certifiname == ''){
	
			$('#certifiname'+certiID).css('border-color','red');
			$('html, body').animate({scrollTop: $("#certifiname"+certiID).offset().top}, 200);
			return false;	
		}
		if(startyear > endyear){
			$('.error_message'+certiID).html('Please be sure the start date is not after the end date.');
			$('html, body').animate({scrollTop: $(".error_message"+certiID).offset().top}, 200);
			return false;
		} else {
			if(startyear == endyear){
				if(startmnth > endmnth){
					$('.error_message'+certiID).html('Please be sure the start date is not after the end date.');
					$('html, body').animate({scrollTop: $(".error_message"+certiID).offset().top}, 200);
					return false;
				}
			}
		}
		if($('#cerifiexp'+certiID).prop('checked')){
   			orgpresent = 'on';
		}else{
			orgpresent = 'off';
		}
		
	}
	
	$('#loading-section').show();
	$.ajax({	  
		
		url: base_path+'ajax/section_ajax.php',

		data: "post_url=usercertification&certiid="+certiID+"&userid="+userid+"&certifiname="+certifiname+"&certifiauthor="+certifiauthor+"&licenseno="+licenseno+"&certifiurl="+certifiurl+"&startmnth="+startmnth+"&startyear="+startyear+"&endmnth="+endmnth+"&endyear="+endyear+"&orgpresent="+orgpresent,	
		
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
		
			$('#loading-section').hide();
			window.location.href = base_path+"profile/";
		}
	});	
	
}


function getPresentCertifi(id){
	
	if($("#cerifiexp"+id).prop('checked')){

		$('#publicdaterange'+id).hide();
		$('#certifiendmnth'+id).val('');
		$('#certifiendyear'+id).val('');
		$('#public_div'+id).show();
		
	}else{
		$('#public_div'+id).hide();
		$('#publicdaterange'+id).show();
	}
	
}

function showcerForm(id){
	
	$('#showcerForm'+id).fadeOut(500);
	$('#certificate_fill'+id).fadeIn(500);
	
}

function hideCertifi(id){
	
	if(id == ''){
		$('#certifications').fadeOut(500);
	}else{
		$('#certificate_fill'+id).fadeOut(500);
		$('#certifications'+id).hide();
		$('#showcerForm'+id).show();
		$('html, body').animate({scrollTop: $("#certifications_section").offset().top}, 200);
		
	}
}

function removeCertify(cerId){
	
	$('#showcerForm'+cerId).html('');
	$('#certificate_fill'+cerId).fadeOut(500);
	$('#certificate_fill'+cerId).html('');
	
	$('#loading-section').show();
	$.ajax({
		url: base_path+'ajax/section_ajax.php',
		data: "post_url=certidelete&cerId="+cerId,	
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
			$('#loading-section').hide();
			
		}
		
	});
	
}	

/********************************* Publications Section ********************************/

function showPublications(){
	
	$('#publications').show();
	$('html, body').animate({scrollTop: $("#publications").offset().top}, 200);
}

$('#publicmemadd').keyup(function(){
try{
		var maindiv 		= 	document.getElementById('publicmembersearch');
		var tx				=	$("#publicmemadd").val().trim();
		var ar				=	new Array();
		var divname;

		maindiv.innerHTML	=	'';
			
}catch(e)
{}
	$.ajax({
		
		   url:	base_path+'ajax/member.php',
		   data:'name='+tx,
		   dataType:'json',
		   type:'post',
		   success:function(j){
			  if(j.action=='yes'){
				  maindiv.innerHTML	=	'';
				  ar	=	j.data;

				   for(var i=0;i<ar.length;i++)
				   {	
						var obj	=	ar[i];
	
						divname		= 	document.createElement('label');
						divname.setAttribute('onclick' , 'fillitpubmember(\"'+obj.image+'\",\"'+obj.name+'\",\"'+obj.id+'\")');
						if(obj.jobtitle == null){				
						
							divname.innerHTML	=	obj.name;
						
						}else{
						
							divname.innerHTML	= '<img width="40" src="'+base_path+obj.image+'"> '+obj.name+' </br>'+obj.jobtitle+'';
						
						}
						maindiv.appendChild(divname); 
						document.getElementById('publicmembersearch').style.display	=	'block'; 
				 }	
			  }else{
				  document.getElementById('publicmembersearch').style.display	=	'none'; 
				  }
			  
		   }
		});
		

	
	});
	
function fillitpubmember(img,va,id){
	
	
	$("#publicuser_section").append("<div class='col-sm-4' id='publicuser_section"+id+"' ><input type='hidden' name='publicmembers[]' id='publicmembers' value='"+id+"' /><div class='xs_cont'><div class='xs_pic'><img src='"+base_path+img+"' width='20' ></div><div class='xs_name'>"+va+"</div><span class='xs_remove' onclick='removepublicmember("+id+")'>x</span><div class='clr'></div></div></div>");
	$('#publicmemadd').val('');
	document.getElementById('publicmembersearch').style.display	=	'none';
}
function removepublicmember(userid){
		
		$('#publicuser_section'+userid).remove();	
}


function savePublication(publicId,userid){
	
	var public_title 	= $('#public_title'+publicId).val();
	var publisher	 	= $('#publisher'+publicId).val();
	var publicmonth	 	= $('#publicmonth'+publicId).val();
	var publicdate	 	= $('#publicdate'+publicId).val();
	var publicyear	 	= $('#publicyear'+publicId).val();
	var public_url 		= $('#publication_url'+publicId).val();
	var authors			= $('input[name*=publicmembers]').serializeArray();
	var publicdesc		= $('#publicdesc'+publicId).val();
	
	authors				= JSON.stringify(authors);
	if(publicId == ''){	
		if(public_title == ''){
	
			$('#public_title').css('border-color','red');
			$('html, body').animate({scrollTop: $("#public_title").offset().top}, 200);
			return false;	
		}
		
		if(public_url == ''){
	
			$('#public_url').css('border-color','red');
			$('html, body').animate({scrollTop: $("#public_url").offset().top}, 200);
			return false;	
		}
		
	}else{
		if(public_title == ''){
	
			$('#public_title'+publicId).css('border-color','red');
			$('html, body').animate({scrollTop: $("#public_title"+publicId).offset().top}, 200);
			return false;	
		}
		
		if(public_url == ''){
	
			$('#public_url'+publicId).css('border-color','red');
			$('html, body').animate({scrollTop: $("#public_url"+publicId).offset().top}, 200);
			return false;	
		}
		
	}
	
	$('#loading-section').show();
	$.ajax({	  
		
		url: base_path+'ajax/section_ajax.php',

		data: "post_url=userpublication&publicid="+publicId+"&userid="+userid+"&public_title="+public_title+"&publisher="+publisher+"&publicmonth="+publicmonth+"&publicdate="+publicdate+"&publicyear="+publicyear+"&public_url="+public_url+"&authors="+authors+"&publicdesc="+publicdesc,	
		
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
		
			$('#loading-section').hide();
			window.location.href = base_path+"profile/";
		}
	});	
}


function showpubForm(id){
	
	$('#showpubForm'+id).fadeOut(500);
	$('#publications_fill'+id).fadeIn(500);
	
}

function hidePublicaion(id){
	
	if(id == ''){
		$('#publications').fadeOut(500);
	}else{
		$('#publications_fill'+id).fadeOut(500);
		$('#publications'+id).hide();
		$('#showpubForm'+id).show();
		$('html, body').animate({scrollTop: $("#publications_section").offset().top}, 200);
		
	}
}

function removePub(pubId){
	
	$('#showpubForm'+pubId).html('');
	$('#publications_fill'+pubId).fadeOut(500);
	$('#publications_fill'+pubId).html('');
	
	$('#loading-section').show();
	$.ajax({
		url: base_path+'ajax/section_ajax.php',
		data: "post_url=pubdelete&pubId="+pubId,	
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
			$('#loading-section').hide();
			
		}
		
	});
	
}	

/********************************* Courses Section ********************************/

function showCourses(){
	
	$('#courses').show();
	$('html, body').animate({scrollTop: $("#courses").offset().top}, 200);
}

function saveCourse(userid){
	
	var course_name = $('input[name*=coursename]').serialize();
	var course_no 	= $('input[name*=courseno]').serialize();
	var cours_asso	= $('select[name*=coursassociated]').serialize();

	$('#loading-section').show();
	$.ajax({	  
		
		url: base_path+'ajax/section_ajax.php',
		data: { 
		  coursename : course_name,
		  courseno : course_no,
		  coursasso : cours_asso,
		  userid : userid,
		  post_url : 'usercourse'
	  },
		dataType:"json",
		cache: false,
		type: "POST",		
		success: function (dataform)
		{	
			$('#loading-section').hide();
			window.location.href = base_path+"profile/";
		}
	});
		
	
}


function showcorseForm(){
	
	$('#showcorseForm').fadeOut(500);
	$('#courses_fill').fadeIn(500);
		
}
function hideCourse(){
	
	$('#courses_fill').fadeOut(500);
	$('#showcorseForm').fadeIn(500);
}
function hideNoAsso(val,totalval){
	
	if(val != ''){
		$('#courseno'+totalval).removeAttr('disabled');
		$('#coursassociated'+totalval).removeAttr('disabled');
			
	}else{
		$('#courseno'+totalval).attr('disabled',true);
		$('#coursassociated'+totalval).attr('disabled',true);
		
	}
}

function getcountryid(sel){
	
	$('#countrycode').val(sel.value);
	$('#postcode').val('');
	$('#setlocation').fadeOut(500);
		
}

function getlocation(){
		var country = $('#countrycode').val();
		var zipcode = $('#postcode').val();
		if(parseInt(zipcode)){
		$.ajax({
		type: "POST",
		dataType:"json",
		url: base_path+'ajax/section_ajax.php',
		data: 'post_url=getlocation&zipcode=' + zipcode + '&country=' + country,
		success: function(data)
		{
			
			var pto = '<div>';
			pto += '<input id="locationd" type="radio" value="'+data.city+','+data.state+','+data.country+'" name="location" >';
			pto += '<span>'+data.city+', '+data.state+', '+data.country+'</span>';
			pto += '</div>';
			
			$('.locationdetail').html(pto);
		}
	});
		}
}

function saveendorse(){
	
	
}

function removeendorse(){
	
	
}