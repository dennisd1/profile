//var jss = jQuery.noConflict();
jQuery(function($){
$( "li.notification_bell" ).hover(function() {
	$.ajax({
		url: "ajax/notification.php",
			dataType: "html",
			type: "POST",
			data : {
			user_id : login_id,
			fun: "user_notification",
		},
			beforeSend: function(xty){
			   $(".load_notification").show();
			   $(".bg-notification").hide();
			},
			success : function(data){
				$(".add_notification").html(data);
				$(".load_notification").hide();
			},
			error : function(data){
			$(".load_notification").hide();
			 console.log(data);

			},
	});
});
});