<?php

  $inData = getRequestInfo();
  $contactID = $inData["ID"];
  $searchResults = "";

  $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

  if($conn->connect_error){
    returnWithError( $conn->connect_error );
  }
  else
  {
    $stmt = $conn->prepare("SELECT * FROM Contacts WHERE id=?");
    $stmt->bind_param("s", $contactID);
    $stmt->execute();

    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $contactInfo .= '{"firstName":"'.$row["FirstName"].'","LastName":"'.$row["LastName"].'","PhoneNumber":"'.$row["PhoneNumber"].'","Email":"'.$row["Email"].'"}';
    sendResultInfoAsJson($contactInfo);

    $stmt->close();
    $conn->close();

  }// end else


  function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

  function sendResultInfoAsJson( $obj )
  {
    header('Content-type: application/json');
    echo $obj;
  }

  function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
 ?>
