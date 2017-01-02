// JavaScript Document
//$(document).ready(function () {
//		$('#loader').hide();
//		$('#progress').hide();
//		var myUpload = $('#upload_link').upload({
//		   name: 'image',
//		   action: base_path+'ajax/image_handling.php',
//		   enctype: 'multipart/form-data',
//		   params: {upload:'Upload'},
//		   autoSubmit: true,
//		   onSubmit: function() {
//		   		$('#upload_status').html('').hide();
//				loadingmessage('Please wait, uploading file...', 'show');
//		   },
//		   onComplete: function(response) {
//		   		loadingmessage('', 'hide');
//				response = unescape(response);
//				var response = response.split("|");
//				var responseType = response[0];
//				var responseMsg = response[1];
//				if(responseType=="success"){
//					var current_width = response[2];
//					var current_height = response[3];
//					//display message that the file has been uploaded
//					$('#upload_status').show().html('<h1>Success</h1><p>The image has been uploaded</p>');
//					//put the image in the appropriate div
//					$('#uploaded_image').html('<img src="'+responseMsg+'" style="float: left; margin-right: 10px;" id="thumbnail" alt="Create Thumbnail" /><div style="border:1px #e5e5e5 solid; float:left; position:relative; overflow:hidden; width:'+thumb_width+'px; height:'+thumb_height+'px;"><img src="'+responseMsg+'" style="position: relative;" id="thumbnail_preview" alt="Thumbnail Preview" /></div>')
//					//find the image inserted above, and allow it to be cropped
//					$('#uploaded_image').find('#thumbnail').imgAreaSelect({ aspectRatio: '1:'+thumb_height_width+'', onSelectChange: preview });
//					//display the hidden form
//					$('#thumbnail_form').show();
//				}else if(responseType=="error"){
//					$('#upload_status').show().html('<h1>Error</h1><p>'+responseMsg+'</p>');
//					$('#uploaded_image').html('');
//					$('#thumbnail_form').hide();
//				}else{
//					$('#upload_status').show().html('<h1>Unexpected Error</h1><p>Please try again</p>'+response);
//					$('#uploaded_image').html('');
//					$('#thumbnail_form').hide();
//				}
//
//		   }
//		});
//
//	//create the thumbnail
//	$('#save_thumb').click(function() {
//		var x1 = $('#x1').val();
//		var y1 = $('#y1').val();
//		var x2 = $('#x2').val();
//		var y2 = $('#y2').val();
//		var w = $('#w').val();
//		var h = $('#h').val();
//		if(x1=="" || y1=="" || x2=="" || y2=="" || w=="" || h==""){
//			alert("You must make a selection first");
//			return false;
//		}else{
//			//hide the selection and disable the imgareaselect plugin
//			$('#uploaded_image').find('#thumbnail').imgAreaSelect({ disable: true, hide: true });
//			loadingmessage('Please wait, saving thumbnail....', 'show');
//			$.ajax({
//				type: 'POST',
//				url: base_path+'ajax/image_handling.php',
//				data: 'save_thumb=Save Thumbnail&x1='+x1+'&y1='+y1+'&x2='+x2+'&y2='+y2+'&w='+w+'&h='+h,
//				cache: false,
//				success: function(response){
//					loadingmessage('', 'hide');
//					response = unescape(response);
//					var response = response.split("|");
//					var responseType = response[0];
//					var responseLargeImage = response[1];
//					var responseThumbImage = response[2];
//					if(responseType=="success"){
//						$('#upload_status').show().html('<h1>Success</h1><p>The thumbnail has been saved!</p>');
//						//load the new images
//						$('#uploaded_image').html('<img src="'+responseLargeImage+'" alt="Large Image"/>&nbsp;<img src="'+responseThumbImage+'" alt="Thumbnail Image"/><br /><a href="javascript:deleteimage(\''+responseLargeImage+'\', \''+responseThumbImage+'\');">Delete Images</a>');
//						//hide the thumbnail form
//						$('#thumbnail_form').hide();
//					}else{
//						$('#upload_status').show().html('<h1>Unexpected Error</h1><p>Please try again</p>'+response);
//						//reactivate the imgareaselect plugin to allow another attempt.
//						$('#uploaded_image').find('#thumbnail').imgAreaSelect({ aspectRatio: '1:'+thumb_height_width+'', onSelectChange: preview });
//						$('#thumbnail_form').show();
//					}
//				}
//			});
//
//			return false;
//		}
//	});});
//function preview(img, selection) {
//	//get width and height of the uploaded image.
//	var current_width = $('#uploaded_image').find('#thumbnail').width();
//	var current_height = $('#uploaded_image').find('#thumbnail').height();
//
//	var scaleX = thumb_width / selection.width;
//	var scaleY = thumb_height / selection.height;
//
//	$('#uploaded_image').find('#thumbnail_preview').css({
//		width: Math.round(scaleX * current_width) + 'px',
//		height: Math.round(scaleY * current_height) + 'px',
//		marginLeft: '-' + Math.round(scaleX * selection.x1) + 'px',
//		marginTop: '-' + Math.round(scaleY * selection.y1) + 'px'
//	});
//	$('#x1').val(selection.x1);
//	$('#y1').val(selection.y1);
//	$('#x2').val(selection.x2);
//	$('#y2').val(selection.y2);
//	$('#w').val(selection.width);
//	$('#h').val(selection.height);
//}
//
////show and hide the loading message
//function loadingmessage(msg, show_hide){
//	if(show_hide=="show"){
//		$('#loader').show();
//		$('#progress').show().text(msg);
//		$('#uploaded_image').html('');
//	}else if(show_hide=="hide"){
//		$('#loader').hide();
//		$('#progress').text('').hide();
//	}else{
//		$('#loader').hide();
//		$('#progress').text('').hide();
//		$('#uploaded_image').html('');
//	}
//}
//
////delete the image when the delete link is clicked.
//function deleteimage(large_image, thumbnail_image){
//	loadingmessage('Please wait, deleting images...', 'show');
//	up.ajax({
//		type: 'POST',
//		url: base_path+'ajax/image_handling.php',
//		data: 'a=delete&large_image='+large_image+'&thumbnail_image='+thumbnail_image,
//		cache: false,
//		success: function(response){
//			loadingmessage('', 'hide');
//			response = unescape(response);
//			var response = response.split("|");
//			var responseType = response[0];
//			var responseMsg = response[1];
//			if(responseType=="success"){
//				$('#upload_status').show().html('<h1>Success</h1><p>'+responseMsg+'</p>');
//				$('#uploaded_image').html('');
//			}else{
//				$('#upload_status').show().html('<h1>Unexpected Error</h1><p>Please try again</p>'+response);
//			}
//		}
//	});
//}

function editImage()
{
	$("body,html").scrollTop(0);
	$('#loadpopup').wPopup();
};
function showimagepreview(input) {
	if (input.files && input.files[0]) {
		var filerdr = new FileReader();
		filerdr.onload = function(e) {
			$('#imgprvw').attr('src', e.target.result);
			$('#default_img').hide();
			$('#demobtn').hide();
			$('#btnuplode').show();
		}
		filerdr.readAsDataURL(input.files[0]);
	}
};




$('.btn-toggle').click(function() {
    $(this).find('.btn').toggleClass('active');

    if ($(this).find('.btn-primary').size()>0) {
    	$(this).find('.btn').toggleClass('btn-primary');
    }
    if ($(this).find('.btn-danger').size()>0) {
    	$(this).find('.btn').toggleClass('btn-danger');
    }
    if ($(this).find('.btn-success').size()>0) {
    	$(this).find('.btn').toggleClass('btn-success');
    }
    if ($(this).find('.btn-info').size()>0) {
    	$(this).find('.btn').toggleClass('btn-info');
    }

    $(this).find('.btn').toggleClass('btn-default');

});

//$('form').submit(function(){
//	alert($(this["options"]).val());
//    return false;
//});
//<!--<! End Switch button-->

function expandbox(){

	$('.boxexpand').css('height','inherit');
	$('.view_bar').hide();
	$('.view_bar2').show();
};
function collapsbox(){

	$('.boxexpand').css('height',156);
	$('.view_bar').show();
	$('.view_bar2').hide();
};


/************************* Profile Image Upload ***************************************/
function load_image(id,ext)
{
   if(validateExtension(ext) == false)
   {
      //alert("Upload only JPEG or JPG format ");
      document.getElementById("imagePreview").innerHTML = "";
      document.getElementById("file").focus();
      return;
   }
};

function validateExtension(v)
{
      var allowedExtensions = new Array("jpg","JPG","jpeg","JPEG","png","PNG");
      for(var ct=0;ct<allowedExtensions.length;ct++)
      {
          sample = v.lastIndexOf(allowedExtensions[ct]);
          if(sample != -1){return true;}
      }
      return false;
};

$(document).ready(function (e) {
	$("#uploadimage").on('submit',(function(e) {
		e.preventDefault();
		$("#message").empty();
		$('#popuploading').show();
		$.ajax({
			url: base_path+"ajax/profile_image_ajax.php", // Url to which the request is send
			type: "POST",             // Type of request to be send, called as method
			data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
			dataType:"json",
			contentType: false,       // The content type used when sending data to the server.
			cache: false,             // To unable request pages to be cached
			processData:false,        // To send DOMDocument or non processed data file it is set to false
			success: function(data)   // A function to be called if request succeeds
			{
				if(data.status != 'No'){
					$('#popuploading').hide();
					$('#loadpopup').wPopup().close();
					$('#userimage').attr('src', data.detail);
					$('#userthumbs').attr('src', data.detail);
					//window.location.href = base_path+"profile/";
					$("#image").val('');
				}else{
					$("#message").html('<p style="color:red">Image is too large</p>');
					//alert('Image is too large');
					$('#popuploading').hide();

				}
			}
		});
	}));

// Function to preview image after validation
$(function() {
	$("#image").change(function() {
		$("#message").empty(); // To remove the previous error message
		var file = this.files[0];
		var imagefile = file.type;
		var match= ["image/jpeg","image/png","image/jpg"];
		if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2])))
		{
			$('#imgprvw').attr('src', base_path+'images/ghost_person_200x200_v1.png');
			//$("#message").html("<p id='error'>Please Select A valid Image File</p>"+"<h4>Note</h4>"+"<span id='error_message'>Only jpeg, jpg and png Images type allowed</span>");
			return false;
		}
		else
		{
			var reader = new FileReader();
			reader.onload = imageIsLoaded;
			reader.readAsDataURL(this.files[0]);
		}
	});
});

function imageIsLoaded(e) {
	$("#image").css("color","green");
	$('#preview').css("display", "block");
	$('#imgprvw').attr('src', e.target.result);
	$('#imgprvw').attr('width', '200px');
	$('#imgprvw').attr('height', '200px');
	$('#demobtn').hide();
	$('#btnuplode').show();
};
});


function saveName(userID){

	var fname			=	document.getElementById("fname").value;
	var lname			=	document.getElementById("lname").value;
	var formername		=	document.getElementById("formername").value;
	var option 			=   $('input[type="radio"]:checked').val();

	if(fname == ''){
		$('#fname').css('border-color','red');
		//$('html, body').animate({scrollTop: $("#fname").offset().top}, 200);
		return false;
	}

	if(lname == ''){
		$('#lname').css('border-color','red');
		//$('html, body').animate({scrollTop: $("#lname").offset().top}, 200);
		return false;
	}

	$('#loading1').show();
	$.ajax({
		url: base_path+'ajax/ajax_file.php',
		data: "post_url=add&userid="+userID+"&fname="+fname+"&lname="+lname+"&formername="+formername+"&visible="+option,
		dataType:"json",
		cache: false,
		type: "POST",
		success: function (dataform)
		{
			$('#loading1').hide();
			window.location.href = base_path+"profile/";
		}
		});

};
function saveJobtitle(userID){

	var jobtitle			=	document.getElementById("jobtitle").value;

	if(jobtitle == ''){
		$('#jobtitle').css('border-color','red');
		//$('html, body').animate({scrollTop: $("#fname").offset().top}, 200);
		return false;
	}

	$('#loading1').show();
	$.ajax({
		url: base_path+'ajax/ajax_file.php',
		data: "post_url=jobtitle&userid="+userID+"&jobtitle="+jobtitle,
		dataType:"json",
		cache: false,
		type: "POST",
		success: function (dataform)
		{
			$('#loading1').hide();
			window.location.href = base_path+"profile/";
		}
		});

};
function saveIndustry(userID){

	var country		=	document.getElementById("basic").value;
	var postcode	=	document.getElementById("postcode").value;
	var industry	=	document.getElementById("industry").value;
	var locationd	=	document.getElementById("locationd").value;

	$('#loading1').show();
	$.ajax({
		url: base_path+'ajax/ajax_file.php',
		data: "post_url=industry&userid="+userID+"&country="+country+"&locationd="+locationd+"&postcode="+postcode+"&industry="+industry,
		dataType:"json",
		cache: false,
		type: "POST",
		success: function (dataform)
		{
			$('#loading1').hide();
			window.location.href = base_path+"profile/";
		}
		});

};

function saveEmail(userID){

	var email		=	document.getElementById("email").value;

	$('#loading1').show();
	$.ajax({
		url: base_path+'ajax/ajax_file.php',
		data: "post_url=email&userid="+userID+"&email="+email,
		dataType:"json",
		cache: false,
		type: "POST",
		success: function (dataform)
		{
			$('#loading1').hide();
			window.location.href = base_path+"profile/";
		}
		});

};

function checkNumber(f)
	{
		var e = f.value;
		var c = e.length;
		var b = f.value.charAt((c) - 1);
		var a = CalcKeyCode(b);
		if ((a < 48 || a > 57)) {
			var d = f.value.substring(0, (c) - 1);
			f.value = d

		}
			return true
	}
function CalcKeyCode(a) {
		var c = a.substring(0, 1);
		var b = a.charCodeAt(0);
		return b
}
function savePhone(userID){

	var phone	=	document.getElementById("phone").value;
	var phoneuse	=	document.getElementById("phoneuse").value;

	$('#loading5').show();
	$.ajax({
		url: base_path+'ajax/ajax_file.php',
		data: "post_url=phone&userid="+userID+"&phone="+phone+"&phoneuse="+phoneuse,
		dataType:"json",
		cache: false,
		type: "POST",
		success: function (dataform)
		{
			$('#loading5').hide();
			$('#phone').val(phone);
			window.location.href = base_path+"profile/";
		}
		});

};
function saveAddress(userID){

	var user_add	=	document.getElementById("user_add").value;

	$('#loading5').show();
	$.ajax({
		url: base_path+'ajax/ajax_file.php',
		data: "post_url=user_add&userid="+userID+"&user_add="+user_add,
		dataType:"json",
		cache: false,
		type: "POST",
		success: function (dataform)
		{
			$('#loading5').hide();
			$('#user_add').val(user_add);
			window.location.href = base_path+"profile/";
		}
		});

};