var urlBase = 'https://contacts.rruiz.dev/LAMPAPI';

var extension = 'php';

function doLogin()
{
	var username = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	var hash = md5(password);
	
	var jsonPayload = JSON.stringify({email: username, password: hash});
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
				setTimeout(function(){window.location.href = "https://contacts.rruiz.dev/contacts.html";},2000)
				var response = JSON.parse(this.response);
				var date = new Date();
				var days = 1; //the number of days the cookie will last
				date.setTime(date.getTime() + (days*24*60*60*1000));
				document.cookie = "u_id="+response.u_id+"; expires=" + date + ";path=/";
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