// this is an easy search, get the unique contact ID, return information
<?php

  $inData = getRequestInfo();
  $contactID = $inData["ContactID"];
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
    $contactInfo .= '{"firstName":"'.$row["firstName"].'","LastName":"'.$row["lastName"].'","PhoneNumber":"'.$row["PhoneNumber"].'","Email":"'.$row["Email"].'"}';
    sendResultInfoAsJson($contactInfo);

  }// end else


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
