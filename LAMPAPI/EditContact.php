<?php

  $inData = getRequestInfo();

  // not really sure what info will be passed to find the contact that needs to be edited...
  $userId = $inData["userId"]; // this is the id of the user who created the contact
  $Cid = $inData["id"]; // this is the unique contact id
  $oldFirst = $inData["FirstName"]; // old first name if need to search for contact
  $oldLast = $inData["LastName"]; // old last name if need to search for contact
  $oldPhone = $inData["PhoneNumber"]; // if need to differentiate contacts with same name

  // then we get the new information to update the contact with
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
    // the SQL statement below will need to be updated according to what info is passed to this file,
    // and what information the user wants to change.
    $stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, PhoneNumber=?, Email=? WHERE (FirstName LIKE ? AND LastName LIKE ? AND PhoneNumber=? AND UserId=?)");
    $stmt->bind_param("sssssss", $newFirst, $newLast, $newNumber, $newEmail, $oldFirst, $oldLast, $oldPhone, $userId);

    // Ideally, we could just pass the Contact ID, since those are unique
    //$stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, PhoneNumber=?, Email=? WHERE id=?");
    $stmt->bind_param("sssss", $newFirst, $newLast, $newNumber, $newEmail, $Cid);
    $stmt->execute();



    $stmt->close();
    $conn->close();
  }//end else


  function returnWithError( $err )
  {
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
  }


 ?>
