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

function showAndHide(id) {
	switch (id) {
		case "changeEmail":
			if(document.getElementById("changeEmail").style.display == 'block')
			{
				document.getElementById("changeEmailToggle").style.display = 'block';
				document.getElementById("changeEmail").style.display = 'none';
				document.getElementById("changeEmailButton").style.display = 'none';
				document.getElementById("changeEmailCancel").style.display = 'none';
			}
			else {
				document.getElementById("changeEmailToggle").style.display = 'none';
				document.getElementById("changeEmail").style.display = 'block';
				document.getElementById("changeEmailButton").style.display = 'block';
				document.getElementById("changeEmailCancel").style.display = 'block';
			}	
			break;
			
		case "changePassword":
			if(document.getElementById("changePassword").style.display == 'block')
			{
				document.getElementById("changePasswordToggle").style.display = 'block';
				document.getElementById("changePassword").style.display = 'none';
				document.getElementById("changePasswordButton").style.display = 'none';
				document.getElementById("changePasswordCancel").style.display = 'none';
			}
			else {
				document.getElementById("changePasswordToggle").style.display = 'none';
				document.getElementById("changePassword").style.display = 'block';
				document.getElementById("changePasswordButton").style.display = 'block';
				document.getElementById("changePasswordCancel").style.display = 'block';
			}	
			break;
	}
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

function validEmail(email){
	var emailRegex = /^[^.][a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]{1,64}@{1}[a-zA-Z0-9-.]{1,255}[^.]\.{1}[a-z]+/;
	var result = email.match(emailRegex);
	if(email != result){
		return false;
	}
	else{
		return true;
	}
}

function changeEmail(){
	var email = document.getElementById("changeEmail").value;
	
	if(validEmail(email) == false)
	{
		document.getElementById("changeEmailText").innerHTML="Enter Valid Email";
		return;
	}
	
	var jsonPayload = JSON.stringify({u_id, email});
	var url = urlBase + '/changeEmail.' + extension;
	var xhr = new XMLHttpRequest
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("changeEmailText").innerHTML="Email Succesfully Changed";
			}
			else if(this.readyState == 4 && this.status == 409)
			{
				document.getElementById("changeEmailText").innerHTML = "Email Already In Use";
			}
		};
		xhr.send(jsonPayload);
	}catch (err)
	{
		document.getElementById("").innerHTML = err.message;
	}
}

function changePassword() {
	var oldPassword = document.getElementById("changePasswordOldPassword").value;
	var newPassword1 = document.getElementById("changePasswordNewPassword1").value;
	var newPassword2 = document.getElementById("changePasswordNewPassword2").value;
	
	if(newPassword1 != newPassword2)
	{
		document.getElementById("changePasswordText").innerHTML = "New Passwords Do Not Match";
		return;
	}
	
	var jsonPayload = JSON.stringify({u_id, oldPassword, newPassword1});
	var url = urlBase + '/changeEmail.' + extension;
	var xhr = new XMLHttpRequest
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("changePasswordText").innerHTML="Password Succesfully Changed";
			}
			else if(this.readyState == 4 && this.status == 400)
			{
				document.getElementById("changePasswordText").innerHTML = "Old Password Wrong";
			}
		};
		xhr.send(jsonPayload);
	}catch (err)
	{
		document.getElementById("").innerHTML = err.message;
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
    closePopup("changeEmail-popup");
  else if(e.target == document.getElementById("deleteAccount-popup"))
    closePopup("deleteAccount-popup");
}