<?php 
  require ('./lib/db.php');
  require ('./lib/helper.php');

  //Get Request Data
  $reqData = getRequestInfo();
  $firstName = $reqData['fname'];
  $lastName = $reqData['lname'];
  $email = $reqData["email"];
  $password = $reqData["password"];

  $conn = new mysqli($server, $dbUsername, $dbPassword, $dbname);
  if($conn->connect_error){
    returnError($conn->connect_error);
  }else{
    $stmt = $conn->prepare("INSERT INTO Users (fname, lname, email, password) VALUES (?,?,?,?)");
    $stmt->bind_param("ssss", $firstName, $lastName, $email, $password);
    $execResult = $stmt->execute();

    if( false===$execResult ){
      returnError( $stmt->error );
    }

    $stmt->close();
    $conn->close();

    http_response_code(200);
    returnSuccess("User successfully created!");
  }
?>