var urlBase = 'https://contacts.rruiz.dev/LAMPAPI';
var extension = 'php';
var u_id = getUID();

function getUID() {
	var u_id = "u_id=";
	var decodedCookie = decodeURIComponent(document.cookie);
	if(decodedCookie == "")
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
  var fname = "";
  var lname = "";
  var phone = "";
  var address = "";
  var email = "";

  fname = document.getElementById("firstName").value;
  lname = document.getElementById("lastName").value;
  phone = document.getElementById("phone").value;
  address = document.getElementById("address").value;
  email = document.getElementById("email").value;

  var jsonPayload = JSON.stringify({fname, lname, phone, email, address, u_id});
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
        document.getElementById("email").value = "";
				document.getElementById("address").value = "";
				setTimeout(function()
				{
					closePopup("contact-popup");
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

function doSearch(x) {
  var search = "";
  var newCount = (x) ? 10 + x : 10;

  search = document.getElementById("searchValue").value;

  var jsonPayload = JSON.stringify({search, u_id, newCount});
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
          text = document.createTextNode(element.email);
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
          text.type = "button";
					text.value = "EDIT";
					text.onclick = function(){editContact(element.c_id)};
					cell.appendChild(text);

					//	delete button
					cell = row.insertCell();
					text = document.createElement("input");
          text.type = "button";
					text.value = "DELETE";
					text.onclick = function () {deleteContact(element.c_id)};
					cell.appendChild(text);

				});
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
	let data = ["First Name", "Last Name", "Phone Number", "Email", "Address", "Date Created", "Date Last Modified", "Edit", "Delete"];
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
  var x = document.getElementById("noSearchResults");
	if(x.style.display == 'block' || rowCount == 0)
	{
		x.style.display = 'none';
    return;
	}


	if(table.style.display == 'none'){
		table.style.display = 'table';
	}
	else {
		table.style.display = 'none';
	}
}

function openPopup(id){
	document.getElementById(id).style.display = "block";
	document.getElementById("box2").classList.add("blur");
}

function closePopup(id){
	document.getElementById(id).style.display = "none";
	document.getElementById("box2").classList.remove("blur");
}

window.onclick = function(e){
	if(e.target == document.getElementById("contact-popup"))
    closePopup("contact-popup");
  else if(e.target == document.getElementById("editContact-popup"))
    closePopup("editContact-popup");
  else if(e.target == document.getElementById("deleteAccount-popup"))
    closePopup("deleteAccount-popup");
  else if(e.target == document.getElementById("deleteContact-popup"))
    closePopup("deleteContact-popup");
}

function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}


function openHamburger(x) {
	//turns the hamburger into an X
  x.classList.toggle("change");
	//shows or hides the links in the hamburger
  var links = document.getElementById("myLinks");
  if (links.style.opacity === "1") {
    links.style.opacity = "0";
	wait(1000);
	links.style.display = "none";
  } else {
    links.style.opacity = "1";
	links.style.display = "block";
  }
}

function getSingleContact(c_id) {
  var url = urlBase + '/getContact.' + extension;
  var jsonPayload = JSON.stringify({u_id, c_id});
  var xhr = new XMLHttpRequest;

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try{
    xhr.onreadystatechange = function()
    {
      if (this.readyState == 4 && this.status == 200)
      {
        var curr = JSON.parse(this.response);

        document.getElementById("editFirstName").value = curr.fname;
        document.getElementById("editLastName").value = curr.lname;
        document.getElementById("editPhone").value = curr.phone;
        document.getElementById("editEmail").value = curr.email;
        document.getElementById("editAddress").value = curr.address;
      }
    };
    xhr.send(jsonPayload);
  }catch(err){
    document.getElementById("editContactResult").innerHTML = "Failed to Update Contact."
  }
}

function editContact(c_id) {
	//	GET Current INFO and populate.
  getSingleContact(c_id);
  
  openPopup("editContact-popup"); // OPEN POPUP

  // SET FUNCTION FOR UPDATE BUTTON
  var button = document.getElementById("editContactButton");
  button.onclick = function (){
    var fname = document.getElementById("editFirstName").value;
    var lname = document.getElementById("editLastName").value;
    var phone = document.getElementById("editPhone").value;
    var email = document.getElementById("editEmail").value;
    var address = document.getElementById("editAddress").value;

    var url = urlBase + '/update.' + extension;
    var jsonPayload = JSON.stringify({fname, lname, phone, email, address, c_id, u_id});
    var xhr = new XMLHttpRequest
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try{
      xhr.onreadystatechange = function()
      {
        if (this.readyState == 4 && this.status == 200)
        {
          document.getElementById("editContactResult").innerHTML = "Successfully Updated Contact!"
          
          setTimeout(function (){
            doSearch();
            closePopup('editContact-popup');
            document.getElementById("editContactResult").value = ""
            document.getElementById("editFirstName").value = "";
            document.getElementById("editLastName").value = "";
            document.getElementById("editPhone").value = "";
            document.getElementById("editEmail").value = "";
            document.getElementById("editAddress").value = "";
          }, 1500);
        }
      };
      xhr.send(jsonPayload);
    }catch (err) {
      document.getElementById("editContactResult").innerHTML = err.message;
    }
  }
}

function deleteContact(c_id) {

  openPopup("deleteContact-popup");

  var button = document.getElementById("deleteContactButton-popup");

  button.onclick = function() {
    var url = urlBase + '/delete.' + extension;
    var jsonPayload = JSON.stringify({u_id, c_id});
    var xhr = new XMLHttpRequest
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try{
      xhr.onreadystatechange = function()
      {
        if (this.readyState == 4 && this.status == 200)
        {
          doSearch();
          closePopup("deleteContact-popup");
        }
      };
      xhr.send(jsonPayload);
    }catch (err) {
      document.getElementById("").innerHTML = err.message; // SET ID OF HTML
    }
  }
}
