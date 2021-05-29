var urlBase = 'https://contacts.rruiz.dev/LAMPAPI';
var extension = 'php';

function addContact() {
  var u_id = 0; // ADD FUNCTIONALITY TO PULL u_id from cookie
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
				document.getElementById("contactResult").innerHTML = "New Contact Successfully Created. Navigating back to Contacts Page.";		

				setTimeout(function(){window.location.href = "https://contacts.rruiz.dev/contacts.html";},3000)
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
        document.getElementById("searchResult").innerHTML = "<h1>No contacts found.</h1>";
      }
		};
		xhr.send(jsonPayload);
  }catch (err) {
    document.getElementById("").innerHTML = err.message; // SET ID OF HTML
  }
}