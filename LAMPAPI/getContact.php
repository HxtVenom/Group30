<?php
  require ('./lib/db.php');
  require ('./lib/helper.php');

  //Get Request Data
  $reqData = getRequestInfo();
  //Get Contact by userID and contactID
  $c_id = $reqData["c_id"];
  $u_id = $reqData["u_id"];

  $conn = new mysqli($server, $dbUsername, $dbPassword, $dbname);
  if($conn->connect_error){
    returnError($conn->connect_error);
  }else{
    $stmt = $conn->prepare("SELECT * FROM Contacts WHERE u_id=? AND c_id=?");
    $stmt->bind_param('ii', $u_id, $c_id);
    $execResult = $stmt->execute();

    if( false===$execResult ){
      returnError( $stmt->error );
    }

    $result = $stmt->get_result();
    $searchResult = "";

    if($row = $result->fetch_assoc()){
      $searchResult .= json_encode($row);
    }

    if($searchResult == ""){
      http_response_code(404);
      returnError("No Contact Found");
    }else{
      returnInfo($searchResult);
    }

    $stmt->close();
    $conn->close();
  }

    function returnInfo( $searchResult ){
      sendResponse($searchResult);
    }
?>