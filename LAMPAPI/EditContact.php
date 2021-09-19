<?php

  // One note about EditContact.php ...
  // The UserID must be matching to the Contact you are trying to edit,
  // or else it will not update the contact with the new information.

  $inData = getRequestInfo();

  $userId = $inData["userId"]; // this is the id of the user who created the contact
  $id = $inData["ID"]; // this is the unique contact id
  $newFirst = $inData["NewFirst"];
  $newLast = $inData["NewLast"];
  $newNumber = $inData["NewNumber"];
  $newEmail = $inData["NewEmail"];

  $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
  if ($conn->connect_error)
  {
    returnWithError( $conn->connect_error );
  }
  else
  {

    $stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, PhoneNumber=?, Email=? WHERE (id=? AND UserID=?)");
    $stmt->bind_param("ssssss", $newFirst, $newLast, $newNumber, $newEmail, $id, $userId);

    $stmt->execute();

    $stmt->close();
    $conn->close();
  }//end else



  function getRequestInfo()
  {
    return json_decode(file_get_contents('php://input'), true);
  }

  function returnWithError( $err )
  {
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
  }


 ?>
