var url = "https://script.google.com/macros/s/AKfycbwDlilofrMyK69vluBExieaLCwg5AjRyqOJx1bR0qiBLvGgihI/exec";
$(document).ready (function(){
            $("#success-alert").hide();});

$('#cfsubmit').on('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
   if(validateForm() == 0)
    return;
  var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: {"stuff": getInformation()},
    success: function(){succ();}
  });
})

function getInformation(){
  var dict = new Object();
  dict.name = $("#name")[0].value;
  dict.email = $("#email")[0].value;
  dict.message = $("#message")[0].value;
  return JSON.stringify(dict);
}

function succ(){
  var text = "Your feedback has been sent. We will get in touch with you soon."
  $("#success-alert")[0].children[0].innerHTML="<div class='alert alert-success'>"+
  "<button class='hidden close' onclick='hide()' type='button' data-dismiss='alert' aria-hidden='true'>×"
  +"</button><i class='fa fa-coffee' onclick='hide()'></i><strong>Success!</strong>"
  + text+"</div>"; 
  $("#success-alert").show();
  $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
  $("#success-alert").slideUp(500, function(){$("#success-alert").hide();});
  });  
}

function validateForm(){
  var str = $("#name")[0].value;
  if(str.length == 0){
    showAlert("You forgot to give us your name!")
    return 0;
  }
  str = $("#email")[0].value;
  if(str.length == 0){
    showAlert("You forgot to give us your email!");
    return 0;
  }
  if(!ValidateEmail(str)){
    return 0;
  }
  str = $("#message")[0].value;
  if(str.length == 0){
    showAlert("You forgot to give us your message!");
    return 0;
  }
  return 1;
}

function ValidateEmail(mail)   
{  
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
  {  
    return (true)  
  }  
    showAlert("You have entered an invalid email address!")  
    return (false)  
}
function hide(){
  $("#success-alert").addClass("hidden");
}

function showAlert(text){
  $("#success-alert")[0].innerHTML = "<div class='alert alert-warning'>"+
  "<button class='hidden close' onclick='hide()' type='button' data-dismiss='alert' aria-hidden='true'>×"
  +"</button><i class='fa fa-coffee' onclick='hide()'></i><strong>Wow there!</strong> "
  + text+"</div>"; 
  $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
  $("#success-alert").slideUp(500, function(){$("#success-alert").hide();})});
  //$("#success-alert").css("class","alert alert-warning");
}