var urlBase = 'http://167.71.245.176/LAMPAPI';
var extension = 'php';


function doRegister()
{
    userId=0;
    firstName = "";
    lastName = "";
    email = "";
    password = "";

    var email = document.getElementById("registerEmail").value;
    var password = document.getElementById("registerPassword").value; //hash?
    var firstName = document.getElementById("registerFirstName").value;
    var lastName = document.getElementById("registerLastName").value;

    if(!isNaN(firstName) || !isNaN(lastName)){
        document.getElementById("errorName").innerHTML = "<b style='color:red'>Please enter a valid name!</b>";
    }

    var jsonPayload = '{"firstName" : "' + firstName + '", lastName" : "' + lastName + '", email" : "' + email + '", password" : "' + password + '"}'; // hash?
        return;
    }
	else {
		/*Removes the error text when the error has been fixed by the user*/
		document.getElementById("errorName").innerHTML = "";
	}
    
    if(email.length == 0){
        document.getElementById("errorEmail").innerHTML = "<b style='color:red'>Please enter an email!</b>";
        return;
    }
	else {
		document.getElementById("errorEmail").innerHTML = "";
	}
	
	if(email.match("@") == null)
	{
		document.getElementById("errorEmail").innerHTML = "<b style='color:red'>Email is invalid!</b>";
	}
	else {
		document.getElementById("errorEmail").innerHTML = "";
	}
	
    if(password.length == 0){
        document.getElementById("errorPassword").innerHTML = "<b style='color:red'>Please enter a password!</b>";
        return;
    }
	else {
		document.getElementById("errorPassword").innerHTML = "";
	}

	if(password != reenterPassword || reenterPassword.length == 0){
		document.getElementById("errorReenterPassword").innerHTML = "<b style='color:red'>The passwords do not match!</b>";
        return;
	}
	else {
		document.getElementById("errorReenterPassword").innerHTML = "";
	}

    var jsonPayload = '{"fname" : "' + firstName + '", lname" : "' + lastName + '", email" : "' + email + '", password" : "' + hash + '"}';
    var url = urlBase + '/register.' + extension; 

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("registrationResult").innerHTML = "New Account Successfully Created. Navigating back to log in";		

				setTimeout(function(){window.location.href = "http://167.71.245.176/index.html";},3000)
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("registrationResult").innerHTML = err.message;
	}
}