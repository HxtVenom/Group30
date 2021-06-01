var urlBase = 'https://contacts.rruiz.dev/LAMPAPI';

var extension = 'php';

function doLogin()
{
	var username = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	
	var jsonPayload = JSON.stringify({email: username, password: password});
	var url = urlBase + '/login.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "appilcation/json; charset=UTF-8");
	
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("loginText").innerHTML = "Logging In!";
			}
			else if(this.readyState == 4 && this.status == 404)
			{
				document.getElementById("loginText").innerHTML = "Incorrect Login Info!";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginText").innerHTML = err.message;
	}
}