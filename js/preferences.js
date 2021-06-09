var urlBase = 'https://contacts.rruiz.dev/LAMPAPI';

var extension = 'php';

function showAndHide(id) {
	switch (id) {
		case "changeUsername":
			if(document.getElementById("changeUsername").style.display == 'block')
			{
				document.getElementById("changeUsernameToggle").style.display = 'block';
				document.getElementById("changeUsername").style.display = 'none';
				document.getElementById("changeUsernameButton").style.display = 'none';
				document.getElementById("changeUsernameCancel").style.display = 'none';
			}
			else {
				document.getElementById("changeUsernameToggle").style.display = 'none';
				document.getElementById("changeUsername").style.display = 'block';
				document.getElementById("changeUsernameButton").style.display = 'block';
				document.getElementById("changeUsernameCancel").style.display = 'block';
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

function submitUsername()
{
	console.log("Submit");
}