<?php
	include_once 'header.html';
?>
	
<h1>Log in</h1>
<div class="form-sheet">
	<form action="login.inc.php" method="post">
		<input type="text" name="email" placeholder="email">
		<br>
		<input type="password" name="password" placeholder="password">
		<br>
		<button type="submit" name="submit">Log In</button>
		<h3 style="color: black; font-family: Alata; padding: 10px 0 10px 0; margin-left: 125px;">New User?</h3>
		<a style="margin-left:130px; href="signup.php">Sign Up</a>
		<br><br>
	</form>
	<?php
	if(isset($_GET["error"])){
		if($_GET["error"]=="emptyinput"){
			echo "<p>Fill in all fields!</p>";
		}
		else if($_GET["error"]=="emailnotfound"){
			echo"<p>Email is not correct!</p>";
		}
		else if($_GET["error"]=="wrongpassword"){
			echo"<p>Password is not correct!</p>";
		}
		else if($_GET["error"]=="stmtfailed"){
			echo"<p>Something went wrong, try again!</p>";
		}
		else if($_GET["error"]=="loggedout"){
			echo"<p>You have logged out successfully!</p>";
		}
	}
?>
</div>
		

	
	
	<?php
	include_once 'footer.html';
?>

