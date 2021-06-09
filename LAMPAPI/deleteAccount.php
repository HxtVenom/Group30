<?php
  require ("./lib/db.php");
  require ("./lib/helper.php");

  $reqData = getRequestInfo();
  $u_id = $reqData["u_id"];

  $conn = new mysqli($server, $dbUsername, $dbPassword, $dbname);
  if($conn->connect_error)
  {
    returnError($conn->connect_error);
  }
  else
  {
    $stmt = $conn->prepare("DELETE FROM Contacts WHERE u_id=?");
    $stmt->bind_param("i", $u_id);
    $execResult = $stmt->execute();

    if( false===$execResult )
    {
      http_response_code(400);
      returnError( $stmt->error );
    }

    $stmt = $conn->prepare("DELETE FROM Users WHERE u_id=?");
    $stmt->bind_param("i", $u_id);
    $execResult = $stmt->execute();

    if( false===$execResult )
    {
      http_response_code(400);
      returnError( $stmt->error );
    }else{
      http_response_code(200);
      returnSuccess("User successfully deleted!");
    }

    $stmt->close();
    $conn->close();
  }
?>
