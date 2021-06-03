var urlBase = 'https://contacts.rruiz.dev/LAMPAPI';
var extension = 'php';
var u_id = getUID();

function getUID() {
	var u_id = "u_id=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while( c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(u_id) == 0) {
			return c.substring(u_id.length, c.length);
		}
	}
	return "";
}

function logout() {
	document.cookie = "u_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	window.location.href = "https://contacts.rruiz.dev/index.html";
}

function addContact() {
  //var u_id = getUID(); // ADD FUNCTIONALITY TO PULL u_id from cookie
  var fname = "";
  var lname = "";
  var phone = "";
  var address = "";

  fname = document.getElementById("firstName").value;
  lname = document.getElementById("lastName").value;
  phone = document.getElementById("phone").value;
  address = document.getElementById("address").value;

  var jsonPayload = JSON.stringify({fname, lname, phone, address, u_id});
  var url = urlBase + '/addContact.' + extension;

  var xhr = new XMLHttpRequest
  xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try{
    xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("contactResult").innerHTML = "New Contact Successfully Created";

				setTimeout(function(){document.getElementById("contactResult").innerHTML = "";},3000)
			}
      else if(this.readyState == 4 && this.status == 400)
      {
        document.getElementById("contactResult").innerHTML = "Failed to create contact.";
      }
		};
		xhr.send(jsonPayload);
  }catch (err) {
    document.getElementById("").innerHTML = err.message; // SET ID OF HTML
  }
}

function doSearch() {
  var search = "";

  search = document.getElementById("searchValue").value;

  var jsonPayload = JSON.stringify({search, u_id});
  var url = urlBase + '/search.' + extension;

  var xhr = new XMLHttpRequest
  xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try{
    xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				var response = JSON.parse(this.response);
				var display = "";
				response.results.forEach(element => {
				  display += `<div class="row">${element.fname} ${element.lname}</div>`
				});
				document.getElementById("list").innerHTML = display;
			}
			else if(this.readyState == 4 && this.status == 404)
			{
				document.getElementById("list").innerHTML = "No contacts found";
			}
		};
		xhr.send(jsonPayload);
  }catch (err) {
    document.getElementById("").innerHTML = err.message; // SET ID OF HTML
  }
}

function showAndHide() {
	var x = document.getElementById('SearchResults');
	if(x.style.display == 'none'){
		x.style.display = 'block';
	}
	else {
		x.style.display = 'none';
	}
}

function openPopup(){
	document.getElementById("contact-popup").style.display = "block";
}

function closePopup(){
	document.getElementById("contact-popup").style.display = "none";
}

window.onclick = function(e){
	if(e.target == document.getElementById("contact-popup")){
		document.getElementById("contact-popup").style.display = "none";
	}
}
