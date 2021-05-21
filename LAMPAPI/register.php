<?php 
  
  //Setup Connection Info
  $server = "";
  $dbUsername = "";
  $dbPassword = "";
  $dbname = "";

  //Get Request Data
  $reqData = getRequestInfo();
  $firstName = $reqData['firstName'];
  $lastName = $reqData['lastName'];
  $email = $reqData["email"];
  $password = $reqData["password"];

  $conn = new mysqli($server, $dbUsername, $dbPassword, $dbname)
  if($conn->connect_error){
    returnError($conn->connect_error);
  }else{
    $stmt = $conn->prepare("INSERT INTO Users (firstName, lastName, email, password) VALUES (?,?,?,?)");
    $stmt->bind_param("s,s,s,s", $firstName, $lastName, $email, $password);
    $execResult = $stmt->execute();

    if( false===$execResult ){
      returnError( $stmt->error );
    }

    $stmt->close();
    $conn->close();
  }

  function getRequestInfo (){
    return json_decode(file_get_contents('php://input'), true);
  }

  function sendResponse ( $response ){
    header('Content-type: application/json');
    echo $response;
  }

  function returnError ( $err ){
    $returnValue = '{"error":' . $err . "}";
    sendResponse($returnValue);
  }
?>