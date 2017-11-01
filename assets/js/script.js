document.addEventListener("DOMContentLoaded", function() {
  updateTable();
});

function updateTable() {
	var tbody = document.getElementById("tablo");
	/*while(tbody.getElementsByTagName("tr").length > 0) {
		tbody.deleteRow(0);
	}*/
	var row;
	if(localStorage.length == 0) {
		row = tbody.insertRow(i);
		cell = row.insertCell(0);
		cell.colSpan = "6";
		cell.innerHTML = "Nothing to Show";
	}
	simpleCart.load();
	for(var i = 0; i < simpleCart.items().length; i++) {
		row = tbody.insertRow(i);
		var stuff = simpleCart.items()[i];
		cell = row.insertCell(0);
		cell.innerHTML = "<img src='"+stuff.get("thumb")+"'"+"/>";
		cell = row.insertCell(1);
		cell.innerHTML = "<h5 class='product-title font-alt'>"+stuff.get("name")+"</h5>"
		cell = row.insertCell(2);
		cell.innerHTML = "<h5 class='product-title font-alt'>$"+stuff.get("price").toFixed(2)+"</h5>"
		cell = row.insertCell(3);
		cell.innerHTML = "<input class='form-control' type='number' name='' value="+stuff.get("quantity")+" max='50' min='1'>"
		cell = row.insertCell(4);
		cell.innerHTML = "<h5 class='product-title font-alt'>$"+(stuff.get("price")*stuff.get("quantity")).toFixed(2)+"</h5>"
		cell = row.insertCell(5);
		cell.innerHTML = "<a href='javascript:removeRow("+i.toString()+")' title='Remove'><i class='fa fa-times'></i></a>"
	}
}

function removeRow(i){
	var tbody = document.getElementById("tablo");
	tbody.deleteRow(i);
	simpleCart.items()[i].remove();
	simpleCart.update();
	simpleCart.save();
}
