document.addEventListener("DOMContentLoaded", function() {
  updateTable();
});

simpleCart({
        checkout: {
          type: "PayPal",
          email: "you@your.com"
        },
        cartStyle: "table",
        cartColumns: [
        {view: 'thumb',
      attr: 'thumb', label: false},
        {attr: "name", label: "Product"},
        {attr: "quantity", label: "Qty"},
        {attr: "price", label: "Price", view: 'currency'},
        {view: "remove", text: "Remove", label: false}
        ]
      });

function updateTable() {
	var tbody = document.getElementById("tablo");
	var row;
	if(simpleCart.items().length == 0) {
		row = tbody.insertRow(0);
		cell = row.insertCell(0);
		cell.colSpan = "6";
		cell.innerHTML = "<div class='well well-lg'><strong>Wow there!</strong> "+
			"You've got nothing in your cart. Go reserve some Block gear!</div>"
		return;
	}
	simpleCart.load();
	row = tbody.insertRow(0);
	cell = row.insertCell(0);
	cell.innerHTML = "Item";
	cell = row.insertCell(1);
	cell.innerHTML = "Description";
	cell = row.insertCell(2);
	cell.innerHTML = "Price";
	cell = row.insertCell(3);
	cell.innerHTML = "Quantity";
	cell = row.insertCell(4);
	cell.innerHTML = "Total";
	cell = row.insertCell(5);
	cell.innerHTML = "Remove";
	for(var i = 0; i < simpleCart.items().length; i++) {
		row = tbody.insertRow(i+1);
		var stuff = simpleCart.items()[i];
		cell = row.insertCell(0);
		cell.innerHTML = "<img src='"+stuff.get("thumb")+"'"+"/>";
		cell = row.insertCell(1);
		cell.innerHTML = "<h5 class='product-title font-alt'>"+stuff.get("name")+"</h5>"
		cell = row.insertCell(2);
		cell.innerHTML = "<h5 class='product-title font-alt'>$"+stuff.get("price").toFixed(2)+"</h5>"
		cell = row.insertCell(3);
		cell.innerHTML = "<input class='form-control' type='number' name='' onchange='javascript:updateQuantity("+i.toString()+")'"+ 
			"value="+stuff.get("quantity")+" max='50' min='1'>"
		cell = row.insertCell(4);
		cell.innerHTML = "<h5 class='product-title font-alt'>$"+(stuff.get("price")*stuff.get("quantity")).toFixed(2)+"</h5>"
		cell = row.insertCell(5);
		cell.innerHTML = "<a href='javascript:removeRow("+i.toString()+")' title='Remove'><i class='fa fa-times'></i></a>"
	}
}

function updateQuantity(i){
	row = document.getElementById("tablo").children[i+1];
	val = row.children[3].children[0].value;
	(simpleCart.items())[i].quantity(val);
	simpleCart.save();
}

function removeRow(i){
	var tbody = document.getElementById("tablo");
	tbody.deleteRow(i+1);
	(simpleCart.items())[i].remove();
	simpleCart.update();
	simpleCart.save();
}

var url = 'https://script.google.com/a/andrew.cmu.edu/macros/s/AKfycbzJxB1-wU3rLcR7UQMPAMSu0PbN-DHhcn1P365DWurLoeWx0w/exec'

$('#checkout').on('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
  if(validateForm() == 0)
  	return;
  var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: {"stuff": getInformation()},
    success: function(){simpleCart.empty();window.location.replace('confirmation.html');}
  });
})

$(".close").on('click', function(e){
	e.preventDefault();
	hide();
})

function getInformation(){
	var dict = new Object();
	dict.Fname = $("#fname")[0].value;
	dict.Lname = $("#lname")[0].value;
	dict.Email = $("#email")[0].value;
	dict.Phone = $("#phone")[0].value;
	dict.Questions = $("#questions")[0].value;
	dict.Cart = JSON.parse(localStorage.simpleCart_items);
	return JSON.stringify(dict);
}

function validateForm(){
	var str = $("#fname")[0].value;
	if (simpleCart.items().length == 0) {
		showAlert("You can't give us an empty wishlist!");
		return 0;
	}
	if(str.length == 0){
		showAlert("You forgot to give us your first name!")
		return 0;
	}
	str = $("#lname")[0].value;
	if(str.length == 0){
		showAlert("You forgot to give us your last name!")
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
	$("#closer").addClass("hidden");
}

function showAlert(text){
	$("#closer")[0].innerHTML = "<button class='hidden close' onclick='hide()' type='button' data-dismiss='alert' aria-hidden='true'>×"
	+"</button><i class='fa fa-coffee' onclick='hide()'></i><strong>Wow there!</strong> "
	+ text;	
	$("#closer").removeClass("hidden");
}