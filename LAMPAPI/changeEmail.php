<?php 
  require ("./lib/db.php");
  require ("./lib/helper.php");

  $reqData = getRequestInfo();

  $email = $reqData["email"];
  $u_id = $reqData["u_id"];

  $conn = new mysqli($server, $dbUsername, $dbPassword, $dbname);
  if($conn->connect_error)
  {
    returnError($conn->connect_error);
  }
  else
  {
    //  sql update logic
    $stmt = $conn->prepare("UPDATE Users SET email=? WHERE u_id=?");
    $stmt->bind_param("si", $email, $u_id);
    $execResult = $stmt->execute();


    if( false===$execResult ){
      http_response_code(400);
      returnError( $stmt->error );
    }else{
      http_response_code(200);
      returnSuccess("Email successfully updated!");
    }

    $stmt->close();
    $conn->close();
  }
?>