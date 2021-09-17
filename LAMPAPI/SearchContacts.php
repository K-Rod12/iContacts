<?php

	$inData = getRequestInfo();
	$search = "%" . $inData["search"] . "%";
	$id = $inData["userId"];

	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		//$stmt = $conn->prepare("SELECT * FROM Users WHERE FirstName LIKE ? AND LastName LIKE ? AND Email LIKE ? AND PhoneNumber LIKE ? AND UserID=?");
		//$stmt->bind_param("sssss", $search, $search, $search, $search, $id);
		$stmt = $conn->prepare("SELECT * FROM Contacts WHERE (FirstName LIKE ? OR LastName LIKE ?) AND UserID=?");
		$stmt->bind_param("sss", $search, $search, $id);
		$stmt->execute();

		$result = $stmt->get_result();

		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}

			// the line below is the info that needs to be passed as JSON
			//$searchResults .= '"'.$row["FirstName"].','.$row["LastName"].','.$row["Email"].','.$row["PhoneNumber"].'"';

			// line below CAN be parsed as JSON
			$searchResults .= '{"FirstName":"'.$row["FirstName"].'","LastName":"'.$row["LastName"].'","PhoneNumber":"'.$row["PhoneNumber"].'"}';

			// And with Email included in the line below, we CANNOT parse the results as JSON
			//$searchResults .= '{"FirstName":"'.$row["FirstName"].'","LastName":"'.$row["LastName"].'","Email":"'.$row["Email"].'"}';

			$searchCount++;
		}//end while

		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $searchResults );
		}

		$stmt->close();
		$conn->close();
	} // end else

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

	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
