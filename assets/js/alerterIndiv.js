document.addEventListener("DOMContentLoaded", function() {
		if(!localStorage.cookie){
			window.location.replace("index.html");
			return;
		}
        var obj = JSON.parse(localStorage.cookie);
        $(".item_name")[0].innerHTML = obj.name;
        $(".item_thumb")[0].src = obj.thumb;
        $(".item_price")[0].innerHTML = obj.price.split('$')[1];
        var text;
        var desc;
        switch(obj.name.toLowerCase().trim()){
        	case "jabang original":
        		text = "White full sleeved hooded cotton long-sleeve pullover.";
        		desc = "Experience the energy and enthusiasm that caused Block to be born.";
        		break;
        	case "blockcode":
        		text = "Long sleeved cotton black shirt.";
        		desc = "Block X The Digital Age.";
        		break;
        	case "pink block royale":
        		text = "Charcoal and pink cotton black pullover.";
        		desc = "The royal Block comes in pink and black.";
        		break;
        	case "block official":
        		text = "White on black cotton long-sleeved pullover shirt.";
        		desc = "A unique take on the Block logo.";
        		break;
        }
        $(".description")[0].innerHTML = text;
        $("#description")[0].innerHTML = "<p style='padding-left:2%;'>"+desc+"</p>";
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