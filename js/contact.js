var urlBase = 'https://contacts.rruiz.dev/LAMPAPI';
var extension = 'php';
var u_id = getUID();

function getUID() {
	var u_id = "u_id=";
	var decodedCookie = decodeURIComponent(document.cookie);
	console.log(decodedCookie);
	if(decodedCookie == null)
	{
		window.location.href="https://contacts.rruiz.dev/index.html";
	}
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

function deleteAccount(){
	var jsonPayload = JSON.stringify({u_id});
	var url = urlBase + '/deleteAccount.' + extension;

	var xhr = new XMLHttpRequest
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("deleteAccountResult").innerHTML = "Account Successfully Deleted";
				document.getElementById("deleteAccountButton-popup").style.display = 'none';
				document.getElementById("cancelDeleteAccountButton").style.display = 'none';

				setTimeout(function(){
					logout();
					document.getElementById("deleteAccountResult").innerHTML = "";
				},2000)
			}
            else if(this.readyState == 4 && this.status == 404)
            {
                document.getElementById("deleteAccountResult").innerHTML = "No account found";
            }
		};
		xhr.send(jsonPayload);
	}catch (err)
	{
		document.getElementById("").innerHTML = err.message;
  	}
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
				document.getElementById("firstName").value = "";
				document.getElementById("lastName").value = "";
				document.getElementById("phone").value = "";
				document.getElementById("address").value = "";
				setTimeout(function()
				{
					closePopup();
					document.getElementById("contactResult").innerHTML = "";
				},2000)
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
				document.getElementById("noSearchResults").style.display = 'none';
				document.getElementById('searchResults').style.display = 'table';
				var response = JSON.parse(this.response);
				let table = document.getElementById("searchResults");
				let rowCount = table.rows.length;
				for(let i = 0; i < rowCount; i++)
				{
					table.deleteRow(0);
				}
				//var display = "";
				generateTableHead(table);
				response.results.forEach(element => {

					//find more efficient way to populate table
					let row = table.insertRow();
					let cell = row.insertCell();
					let text = document.createTextNode(element.fname);
					cell.appendChild(text);

					cell = row.insertCell();
					text = document.createTextNode(element.lname);
					cell.appendChild(text);

					cell = row.insertCell();
					text = document.createTextNode(element.phone);
					cell.appendChild(text);

					cell = row.insertCell();
					text = document.createTextNode(element.address);
					cell.appendChild(text);

					cell = row.insertCell();
					text = document.createTextNode(element.dateCreated);
					cell.appendChild(text);

					cell = row.insertCell();
					text = document.createTextNode(element.lastModified);
					cell.appendChild(text);

					//	edit button
					cell = row.insertCell();
					text = document.createElement("input");
          text.type= "button";
					text.value = "EDIT";
					text.onclick = function(){alert("DEBUG: clicked EDIT button");};
					cell.appendChild(text);

					//	delete button
					cell = row.insertCell();
					text = document.createElement("input");
          text.type= "button";
					text.value = "DELETE";
					text.onclick = function(){alert("DEBUG: clicked DELETE button");};
					cell.appendChild(text);

				  //display += `<tr>${element.fname} ${element.lname} ${element.address}</tr>`
				});
				//document.getElementById("searchResults").innerHTML = display;
			}
			else if(this.readyState == 4 && this.status == 404)
			{
				//empties the table so user doesn't see it when clicking "show/hide search results
				let table = document.getElementById("searchResults");
				let rowCount = table.rows.length;
				for(let i = 0; i < rowCount; i++)
				{
					table.deleteRow(0);
				}

				document.getElementById('searchResults').style.display = 'none';
				document.getElementById("noSearchResults").innerHTML = "No contacts found";
				document.getElementById("noSearchResults").style.display = 'block';
			}
		};
		xhr.send(jsonPayload);
  }catch (err) {
    document.getElementById("").innerHTML = err.message; // SET ID OF HTML
  }
}

function generateTableHead(table) {
	let thead = table.createTHead();
	let row = thead.insertRow();
	let data = ["First Name", "Last Name", "Phone Number", "Address", "Date Created", "Date Last Modified", "Edit", "Delete"];
	for (let i = 0; i < data.length; i++) {
		let th = document.createElement("th");
		let text = document.createTextNode(data[i]);
		th.appendChild(text);
		row.appendChild(th);
	}
}

function showAndHide() {
	let table = document.getElementById("searchResults");
	let rowCount = table.rows.length;
	if(document.getElementById("noSearchResults").style.display == 'block' || rowCount == 0)
	{
		x.style.display = 'none';
		return;
	}
	var x = document.getElementById('searchResults');
	if(x.style.display == 'none'){
		x.style.display = 'table';
	}
	else {
		x.style.display = 'none';
	}
}

function openDeleteAccountPopup(){
	document.getElementById("deleteAccount-popup").style.display = "block";
	document.getElementById("box2").classList.add("blur");
}

function openPopup(){
	document.getElementById("contact-popup").style.display = "block";
	document.getElementById("box2").classList.add("blur");
}

function closePopup(){
	document.getElementById("deleteAccount-popup").style.display = "none";
	document.getElementById("contact-popup").style.display = "none";
	document.getElementById("box2").classList.remove("blur");
}

window.onclick = function(e){
	if(e.target == document.getElementById("contact-popup") || e.target == document.getElementById("deleteAccount-popup")){
		document.getElementById("contact-popup").style.display = "none";
		document.getElementById("deleteAccount-popup").style.display = "none";
		document.getElementById("box2").classList.remove("blur");
	}
}
