var urlBase = 'https://contacts.rruiz.dev/LAMPAPI';
var extension = 'php';

function addContact() {
  var fname = "";
  var lname = "";
  var phone = "";
  var address = "";

  fname = document.getElementById("firstName").value;
  lname = document.getElementById("lastName").value;
  phone = document.getElementById("phone").value;
  address = document.getElementById("address").value;

  var jsonPayload = JSON.stringify({fname, lname, phone, address});
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

function search() {
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
        response.array.forEach(element => {
          console.log(element);
        });
			}
      else if(this.readyState == 4 && this.status == 404)
      {
        document.getElementById("contactResult").innerHTML = "No contacts found.";
      }
		};
		xhr.send(jsonPayload);
  }catch (err) {
    document.getElementById("").innerHTML = err.message; // SET ID OF HTML
  }
}