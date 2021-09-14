<?php
	$inData = getRequestInfo();
	// inData holds all the information passed from SwaggerHub or the front end

	// Below, all the information from inData is separated into individual "variables"
	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$Email = $inData["Email"];
	$PhoneNumber = $inData["PhoneNumber"];
	$userId = $inData["userId"];

	// connection is established
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) // if connection fails
	{
		returnWithError( $conn->connect_error );
	}
	else // if connection succeeds
	{
		// Below, we prepare the SQL command
		$stmt = $conn->prepare("INSERT into Contacts (UserId,FirstName,LastName,Email,PhoneNumber) VALUES(?,?,?,?,?)");
		// Below, we bind our "variables" or parameters to the SQL query
		$stmt->bind_param("sssss", $userId, $FirstName, $LastName, $Email, $PhoneNumber);
		// The only question I have about the above line, is whether PhoneNumber
		// should be passed as a string, s, or a double, d, in the argument list.
		// So either "sssss" or "ssssd", or even an integer since its sort of a whole number

		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

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
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>
