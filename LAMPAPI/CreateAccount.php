<?php
	$inData = getRequestInfo();
	// inData holds all the information passed from SwaggerHub or the front end

	// Below, all the information from inData is separated into individual "variables"
	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$Login = $inData["Login"];
	$Password = $inData["Password"];

	// connection is established
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) // if connection fails
	{
		returnWithError( $conn->connect_error );
	}
	else // if connection succeeds
	{
		// Below, we prepare the SQL command
		$stmt = $conn->prepare("INSERT into Users (FirstName,LastName,Login,Password) VALUES(?,?,?,?)");
		// Below, we bind our "variables" or parameters to the SQL query
		$stmt->bind_param("ssss", $FirstName, $LastName, $Login, $Password);

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
