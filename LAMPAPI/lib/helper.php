<?php 
    function getRequestInfo (){
      return json_decode(file_get_contents('php://input'), true);
    }
  
    function sendResponse ( $response ){
      header('Content-type: application/json');
      echo $response;
    }
?>