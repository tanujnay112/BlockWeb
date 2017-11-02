$(document).ready (function(){
            $("#success-alert").hide();
            $(".item_add").click(function showAlert() {
              console.log($(this).closest('.shop-item')[0].children[1].children[0].innerHTML);
                $("#success-alert")[0].children[0].innerHTML=" <strong>Success! </strong>"+
                  $(this).closest('.shop-item')[0].children[1].children[0].innerHTML+" has been added to your wishlist.";
                $("#success-alert").show();
                $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
               $("#success-alert").slideUp(500, function(){$("#success-alert").hide();});
                });  
            });
 });