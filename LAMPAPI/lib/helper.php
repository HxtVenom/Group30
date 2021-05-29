<?php 
    function getRequestInfo (){
      return json_decode(file_get_contents('php://input'), true);
    }
  
    function sendResponse ( $response ){
      header('Content-type: application/json');
      echo $response;
    }

    function returnError ( $err ){
      $returnValue = '{"error":"' . $err . '"}';
      sendResponse($returnValue);
    }
    
    function returnSuccess ( $msg ){
      $returnValue = '{"success":"' . $msg . '"}';
      sendResponse($returnValue);
    }
?>