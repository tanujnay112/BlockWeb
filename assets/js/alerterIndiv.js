document.addEventListener("DOMContentLoaded", function() {
        var obj = JSON.parse(localStorage.cookie);
        $(".item_name")[0].innerHTML = obj.name;
        $(".item_thumb")[0].src = obj.thumb;
        $(".item_price")[0].innerHTML = obj.price.split('$')[1];
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