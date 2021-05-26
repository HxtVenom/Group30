<?php
  require ('./lib/db.php');
  require ('./lib/helper.php');

  $reqData = getRequestInfo();
  $login = $reqData["email"];
  $password = $reqData["password"];

  $conn = new mysqli($server, $dbUsername, $dbPassword, $dbname);
  if( $conn->connect_error ){
    returnError($conn->connect_error);
  }else{
    //  Create Prepared Statement and Execute
    $stmt = $conn->prepare("SELECT u_id, fname, lname FROM Users WHERE email=? AND password=?");
    $stmt->bind_param("ss", $login, $password);
    $stmt->execute();

    $result = $stmt->get_result();

    if( $row = $result->fetch_assoc() ){
      returnInfo( $row["fname"], $row['lname'], $row['u_id'] );
    }else{
      returnError("User not found.");
    }

    $stmt->close();
    $conn->close();
  }

  function returnInfo( $firstName, $lastName, $id ){
    $returnValue = '{
                      "u_id":' . $id . ',
                      "fname":"' . $firstName . '",
                      "lname":"' . $lastName . '"
                    }';
    sendResponse($returnValue);
  }
?>