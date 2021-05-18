function calculateTip()
{
	var inputVal = document.getElementById("Total").value;
	var percent = document.getElementById("TipPercent").value;
	var people = document.getElementById("PersonCount").value;
	percent = percent/100;
	var total = percent * inputVal;
	var cleanTotal = total.toFixed(2);
	document.getElementById("TotalTip").innerHTML = "$" + cleanTotal;
	total = total / people;
	cleanTotal = total.toFixed(2);
	document.getElementById("Tip").innerHTML = "$" + cleanTotal;
}

function inputFixTotal()
{
	if(document.getElementById("Total").value < 0) document.getElementById("Total").value = 0;
}

function inputFixTip()
{
	if(document.getElementById("TipPercent").value < 0) document.getElementById("TipPercent").value = 0;
}

function inputFixPeople()
{
	if(document.getElementById("PersonCount").value <= 0) document.getElementById("PersonCount").value = 1;
}