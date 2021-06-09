<?php
  require ("./lib/db.php");
  require ("./lib/helper.php");

  $reqData = getRequestInfo();
  $c_id = $reqData["c_id"];
  $u_id = $reqData["u_id"];

  $conn = new mysqli($server, $dbUsername, $dbPassword, $dbname);
  if($conn->connect_error)
  {
    returnError($conn->connect_error);
  }
  else
  {
    $stmt = $conn->prepare("DELETE FROM Contacts WHERE (c_id=? AND u_id=?)");
    $stmt->bind_param("ii", $c_id, $u_id);
    $execResult = $stmt->execute();

    if( false===$execResult )
    {
      http_response_code(400);
      returnError( $stmt->error );
    }else{
      http_response_code(200);
      returnSuccess("Contact successfully deleted!");
    }

    $stmt->close();
    $conn->close();
  }
?>
