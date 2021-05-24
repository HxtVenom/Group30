<?php
  require ('./lib/db.php');

  //Get Request Data
  $reqData = getRequestInfo();
  //User will search by either first and last name/phone/address
  $firstName = $reqData['fname'];
  $lastName = $reqData['lname'];
  $phone = $reqData["phone"];
  $address = $reqData["address"];

  $conn = new mysqli($server, $dbUsername, $dbPassword, $dbname);
  if($conn->connect_error){
    returnError($conn->connect_error);
  }else{
    $stmt = $conn->prepare("SELECT * FROM Contacts WHERE Contacts.u_id = $u_id
      AND ((Contacts.fname LIKE %$firstName% AND Contacts.lname LIKE %lastName%)
      OR Contacts.phone LIKE %$phone% OR Contacts.address LIKE %$address%)");
    $execResult = $stmt->execute();


    if( false===$execResult ){
      returnError( $stmt->error );
    }

    $stmt->close();
    $conn->close();
