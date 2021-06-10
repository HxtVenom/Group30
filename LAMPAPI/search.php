<?php
  require ('./lib/db.php');
  require ('./lib/helper.php');

  //Get Request Data
  $reqData = getRequestInfo();
  //User will search by either first and last name/phone/address
  $search = "%" . $reqData["search"] . "%";
  $u_id = $reqData["u_id"];
  $contactCount = $reqData["newCount"];

  $conn = new mysqli($server, $dbUsername, $dbPassword, $dbname);
  if($conn->connect_error){
    returnError($conn->connect_error);
  }else{
    $stmt = $conn->prepare("SELECT * FROM Contacts WHERE u_id=?
      AND ((fname LIKE ?) OR (lname LIKE ?)
      OR (phone LIKE ?) OR (address LIKE ?) OR (email LIKE ?)) LIMIT ? ORDER BY lname, fname");
    $stmt->bind_param('isssssi', $u_id, $search, $search, $search, $search, $search, $contactCount);
    $execResult = $stmt->execute();

    if( false===$execResult ){
      returnError( $stmt->error );
    }

    $result = $stmt->get_result();
    $searchResult = "";
    $searchCount = 0;

    while($row = $result->fetch_assoc()){
      if($searchCount > 0){
        $searchResult .= ",";
      }
      $searchCount++;
      $searchResult .= json_encode($row);
    }

    if($searchCount == 0){
      http_response_code(404);
      returnError("No Results Found");
    }else{
      returnInfo($searchResult);
    }

    $stmt->close();
    $conn->close();
  }

    function returnInfo( $searchResult ){
      $finalRes = '{"results":[' . $searchResult . ']}';
      sendResponse($finalRes);
    }
?>