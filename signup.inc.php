<?php

include_once 'connect.inc.php';
include 'methods.inc.php';
	
if(isset($_POST["submit"])){
	$first = mysqli_real_escape_string($conn, $_POST['first']);
	$last = mysqli_real_escape_string($conn, $_POST['last']);
	$email = mysqli_real_escape_string($conn, $_POST['email']);
	$u_pid = RandomNum();
	$password = mysqli_real_escape_string($conn, $_POST['password']);
	$university = $_POST['university'];
	$security = $_POST['security'];
		
	if(EmptyInputSignup($first,$last,$email,$password)!== false){
		header("location: signup.php?error=emptyinput");
		exit();
	}
	if(InvalidEmail($email)!== false){
		header("location: signup.php?error=invalidemail");
		exit();
	}
	if(EmailExists($conn,$email)!== false){
		header("location: signup.php?error=emailtaken");
		exit();
	}
	
	CreateUser($conn,$first,$last,$email,$u_pid,$password,$university,$security);
		
	header("Location: login.php?signup=success");
}
else{
	header("location: signup.php");
	exit();
}
	

		
	