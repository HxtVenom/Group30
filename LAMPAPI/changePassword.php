<?php 
  require ("./lib/db.php");
  require ("./lib/helper.php");

  $reqData = getRequestInfo();

  $u_id = $reqData["u_id"];
  $oldPassword = $reqData["oldPassword"];
  $newPassword = $reqData["newPassword"];

  $conn = new mysqli($server, $dbUsername, $dbPassword, $dbname);
  if($conn->connect_error)
  {
    returnError($conn->connect_error);
  }
  else
  {
    //  sql update logic
    $stmt = $conn->prepare("UPDATE Users SET password=? WHERE u_id=? AND password=?");
    $stmt->bind_param("sis", $newPassword, $u_id, $oldPassword);
    $execResult = $stmt->execute();

    if( false===$execResult ){
      http_response_code(400);
      returnError( $stmt->error );
    }else if($conn->affected_row == 0){
      http_response_code(400);
      returnError( "Incorrect Password" );
    }else{
      http_response_code(200);
      returnSuccess("Password successfully updated!");
    }

    $stmt->close();
    $conn->close();
  }
?>