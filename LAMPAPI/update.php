<?php
  require ("./lib/db.php");
  require ("./lib/helper.php");

  $reqData = getRequestInfo();
  $NULL = 0;

  // VERIFY that no fields are NULL - RICARDO
  foreach($reqData as $x => $value){
    if($value == NULL || $value == ""){
      $NULL = 1;
      break;
    }
  }

  //  lookup
  $c_id = $reqData["c_id"];
  $u_id = $reqData["u_id"];
  $fname = $reqData["fname"];
  $lname = $reqData["lname"];
  $phone = $reqData["phone"];
  $address = $reqData["address"];

  // Create DB Connection.
  $conn = new mysqli($server, $dbUsername, $dbPassword, $dbname);
  if($conn->connect_error)
  {
    returnError($conn->connect_error);
  }
  else
  {
    //  sql to grab unique id contents if at least one field is null or empty
    if($NULL){
      $stmt = $conn->prepare("SELECT * FROM Contacts WHERE c_id = ?");
      $stmt->bind_param("i", $c_id);
      $stmt->execute();
      $result = $stmt->get_result();
      //  assign result to row
      if($row = $result->fetch_assoc())
      {
        //  null and empty checking
        $fname = ($fname == null || $fname == "") ? $row["fname"] : $fname;
        $lname = ($lname == null || $lname == "") ? $row["lname"] : $lname;
        $phone = ($phone == null || $phone == "") ? $row["phone"] : $phone;
        $address = ($address == null || $address == "") ? $row["address"] : $address;
      }

      $stmt->close();
    }

    //  sql update logic
    $stmt = $conn->prepare("UPDATE Contacts SET fname=?,lname=?,phone=?,address=?,lastModified=NOW() WHERE c_id=?");
    $stmt->bind_param("ssssi", $fname, $lname, $phone, $address, $c_id);
    $execResult = $stmt->execute();


    if( false===$execResult ){
      http_response_code(400);
      returnError( $stmt->error );
    }else{
      http_response_code(200);
      returnSuccess("Contact successfully updated!");
    }

    $stmt->close();
    $conn->close();
  }
?>
