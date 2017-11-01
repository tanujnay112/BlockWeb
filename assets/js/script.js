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
		cell.innerHTML = "<div class='well well-lg'><strong>Wow!</strong> "+
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





var url = 'https://script.google.com/macros/s/AKfycbxkrJfqiHNgbPHcrP6sfIgwq6jKa6rMe_Xa2gO2uq0JcP50XX0/exec'

$('#checkout').on('click', function(e) {
  e.preventDefault();
  var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: getInformation(),
    success: function(){alert("DONE");}
  });
})

function getInformation(){
	var dict = new Object();
	dict.FName = $("#fname")[0].value;
	dict.LName = $("#lname")[0].value;
	dict.Email = $("#email")[0].value;
	dict.Phone = $("#phone")[0].value;
	dict.Questions = $("#questions")[0].value;
	dict.Cart = JSON.parse(localStorage.simpleCart_items);
	console.log(JSON.stringify(dict));
	return JSON.stringify(dict);
}