document.addEventListener("DOMContentLoaded", function() {
        var obj = JSON.parse(localStorage.cookie);
        $(".item_name")[0].innerHTML = obj.name;
        $(".item_thumb")[0].src = obj.thumb;
        $(".item_price")[0].innerHTML = obj.price.split('$')[1];
        var text;
        switch(obj.name.toLowerCase().trim()){
        	case "jabang original":
        		text = "The merch that started it all. Classic Jabang pullover long sleeve with hood."
        		break;
        	case "baby blue rock":
        		text = "Winter's Baby Blue long sleeve."
        		break;
        	case "charcoal pink rock":
        		text = "Winter's Charcoal and Gold."
        		break;
        	case "block official":
        		text = "Block's New Logo."
        		break;
        }
        $(".description")[0].innerHTML = text;
      });
$(document).ready (function(){
            $("#success-alert").hide();
            $(".item_add").click(function showAlert() {
                $("#success-alert")[0].children[0].innerHTML=" <strong>Success! </strong>"+
                  $(".item_name")[0].innerHTML+" has been added to your wishlist.";
                $("#success-alert").show();
                $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
               $("#success-alert").slideUp(500, function(){$("#success-alert").hide();});
                });  
            });
 });