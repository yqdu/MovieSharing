(function($){
    $("#register-form").hide();
    $("#retrieve-form").hide();	
    $(".register-link").click(function(e){
        $("#login-form").slideUp(0);	
        $("#register-form").fadeIn(300);	
    });
    
    $(".login-link").click(function(e){
        $("#register-form").slideUp(0);
        $("#retrieve-form").slideUp(0);	
        $("#login-form").fadeIn(300);	
    });
    
    $(".retrieve-link").click(function(e){
        $("#login-form").slideUp(0);	
        $("#retrieve-form").fadeIn(300);	
    });
})($);