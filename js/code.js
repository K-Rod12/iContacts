
var urlBase = 'http://icontacts.zapto.org/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
//	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	var tmp = {login:login,password:password};
//	var tmp = {login:login,password:hash};
	var jsonPayload = JSON.stringify( tmp );
	
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;
				console.log(jsonObject);

				saveCookie();
	
				window.location.href = "contacts.html";

				$('.dropdown-toggle').append(login)
			}
		};
		console.log(jsonPayload);
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}


function createAccount(){

	userId = 0;
	

	var firstName = $("#firstName").val() // Gets the first name from register fields
	var lastName = $("#lastName").val() //Gets the last name from register fields
	var userName = $("#userName").val() //gets the username from register fields
   	var password =  $("#password").val() //gets the password from register field
	// var firstName = document.getElementById("firstName").value;
	// var lastName = document.getElementById("lastName").value;
	// var userName = document.getElementById("username").value;
	// var password = document.getElementById("password").value;
	//	var hash = md5( password );
	
	// prompt user to add a first and last name to appropriate fields
	if(userName == "" || password == "") { 
		createAlert("Username and password are required","danger",".errorBar")
		return;
	}


	var tmp = {FirstName:firstName,LastName:lastName, Login:userName, Password:password};

	console.log('hit here')

//	var tmp = {login:login,password:hash};
	var jsonPayload = JSON.stringify( tmp );
	console.log(jsonPayload)
	
	var url = urlBase + '/CreateAccount.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse( xhr.responseText );


				if(jsonObject.error == "This contact already exists."){
					createAlert("This Contact Already Exists","danger",".errorBar")
					return;
				}

				//console.log(jsonPayload);
	
				window.location.href = "/index.html";

			}
		};
		console.log(jsonPayload);
		xhr.send(jsonPayload);
		console.log('Succes?')
	}
	catch(err)
	{
		console.log("Don't want to hit here");
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function test()
{	
	var test = "";

	for(var i = 0; i < 10; i++){

		test  = test + '<a href="#" class="list-group-item list-group-item-action py-3 lh-tight" aria-current="true">'
		+'<div class="d-flex w-100 align-items-center justify-content-between">'
		+'<strong class="mb-1">List group item heading</strong>'
		+'<small>Wed</small>'
		+'</div>'
		+'<div class="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>'
		+'</a>'
	}

	$('#contactList').empty();
	$('#contactList').append(test);
	//$('#contactList').modal('show')
}

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addContact()
{
	var newColor = document.getElementById("colorText").value;
	document.getElementById("colorAddResult").innerHTML = "";

	var tmp = {color:newColor,userId,userId};
	var jsonPayload = JSON.stringify( tmp );

	var url = urlBase + '/AddContact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
	
}

function searchColor()
{
	var srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";
	
	var colorList = "";

	var tmp = {search:srch,userId:userId};
	var jsonPayload = JSON.stringify( tmp );

	var url = urlBase + '/SearchColors.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );
				
				for( var i=0; i<jsonObject.results.length; i++ )
				{
					colorList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
	
}
