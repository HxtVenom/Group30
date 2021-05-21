<?php

  //Setup Connection Info
  $server = "";
  $username = "";
  $password = "";
  $dbname = "";

  $reqData = getRequestInfo();
  $login = $reqData["login"];
  $password = $reqData["password"];

  $conn = new mysqli($server, $username, $password, $dbname)
  if($conn->connect_error){
    returnError($conn->connect_error);
  }else{
    //  Create Prepared Statement and Execute
    $stmt = $con->prepare("SELECT ID, firstName, lastName FROM Users WHERE Login=? AND Password=?");
    $stmt->bind_param("ss", $login, $password);
    $stmt->execute();

    $result = $stmt->get_result();

    if($row = $result->fetch_assoc()){
      returnInfo($row["firstName"], $row['lastName'], $row['ID']);
    }else{
      returnError("User not found.");
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

  function returnInfo( $firstName, $lastName, $id ){
    $returnValue = '{"id":' . $id . ',"firstName":' . $firstName . ',"lastName":' . $lastName . '}';
    sendResponse($returnValue);
  }

  function returnError ( $err ){
    $returnValue = '{"error":' . $err . "}";
    sendResponse($returnValue);
  }
?>