<?php
  require ("./lib/db.php");
  require ("./lib/helper.php");

  $reqData = getRequestInfo();
  $u_id = $reqData["u_id"];
  $fname = $reqData["fname"];
  $lname = $reqData["lname"];
  $phone = $reqData["phone"];
  $address = $reqData["address"];

  $conn = new mysqli($server, $dbUsername, $dbPassword, $dbname);
  if($conn->connect_error){
    returnError($conn->connect_error);
  }else{
    $stmt = $conn->prepare("INSERT INTO Contacts (fname, lname, phone, address, u_id) VALUES (?,?,?,?,?)");
    $stmt->bind_param("ssssi", $firstName, $lastName, $phone, $address, $u_id);
    $execResult = $stmt->execute();

    if( false===$execResult ){
      http_response_code(400);
      returnError( $stmt->error );
    }

    $stmt->close();
    $conn->close();

    http_response_code(200);
    returnSuccess("Contact successfully created!");
  }
?>