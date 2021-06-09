<?php
  require ("./lib/db.php");
  require ("./lib/helper.php");

  $reqData = getRequestInfo();
  $u_id = $reqData["u_id"];
  $fname = $reqData["fname"];
  $lname = $reqData["lname"];
  $phone = $reqData["phone"];
  $email = $reqData["email"];
  $address = $reqData["address"];

  $conn = new mysqli($server, $dbUsername, $dbPassword, $dbname);
  if($conn->connect_error){
    returnError($conn->connect_error);
  }else{
    $stmt = $conn->prepare("INSERT INTO Contacts (fname, lname, phone, email, address, u_id) VALUES (?,?,?,?,?,?)");
    $stmt->bind_param("sssssi", $fname, $lname, $phone, $email, $address, $u_id);
    $execResult = $stmt->execute();

    if( false===$execResult ){
      http_response_code(400);
      returnError( $stmt->error );
    }else{
      http_response_code(200);
      returnSuccess("Contact successfully created!");
    }

    $stmt->close();
    $conn->close();
  }
?>