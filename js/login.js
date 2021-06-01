var urlBase = 'https://contacts.rruiz.dev/LAMPAPI';

var extension = 'php';

function doLogin()
{
	username = document.getElementById("loginName").value;
	password = document.getElementById("loginPassword").value;
	
	var jsonPayload = JSON.stringify({email: username, password: password});
	document.getElementById("loginText").innerHTML = jsonPayload;
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
				document.geElementById("loginText").innerHTML = "Logging In!";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginText").innerHTML = "NO";
	}
}