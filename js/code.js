
var urlBase = 'http://icontacts.zapto.org/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

function doLogin()
{
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


function deleteContact(){

	var firstName = $("#firstName").val() // Gets the first name from register fields
	var lastName = $("#lastName").val() //Gets the last name from register fields
	var email = $("#email").val() //gets the username from register fields
   	var phoneNumber =  $("#phone").val() //gets the password from register field
	// var firstName = document.getElementById("firstName").value;
	// var lastName = document.getElementById("lastName").value;
	// var userName = document.getElementById("username").value;
	// var password = document.getElementById("password").value;
	//	var hash = md5( password );
	
	readCookie();

	var tmp = {userId:userId,FirstName:firstName,LastName:lastName,Email:email,PhoneNumber:phoneNumber};

	console.log('hit here')

//	var tmp = {login:login,password:hash};
	var jsonPayload = JSON.stringify( tmp );
	console.log(jsonPayload)
	
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
				var jsonObject = JSON.parse( xhr.responseText );


				if(jsonObject.error == "This contact already exists."){
					createAlert("This Contact Already Exists","danger",".errorBar")
					return;
				}

				//console.log(jsonPayload);


			}
		};
		console.log(jsonPayload);
		xhr.send(jsonPayload);
		console.log('Success?')
	}
	catch(err)
	{
		console.log("Don't want to hit here");
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function addContact(){

	var firstName = $("#firstName").val() // Gets the first name from register fields
	var lastName = $("#lastName").val() //Gets the last name from register fields
	var email = $("#email").val() //gets the username from register fields
   	var phoneNumber =  $("#phone").val() //gets the password from register field
	// var firstName = document.getElementById("firstName").value;
	// var lastName = document.getElementById("lastName").value;
	// var userName = document.getElementById("username").value;
	// var password = document.getElementById("password").value;
	//	var hash = md5( password );
	
	readCookie();

	var tmp = {userId:userId,FirstName:firstName,LastName:lastName,Email:email,PhoneNumber:phoneNumber};

	console.log('hit here')

//	var tmp = {login:login,password:hash};
	var jsonPayload = JSON.stringify( tmp );
	console.log(jsonPayload)
	
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
				var jsonObject = JSON.parse( xhr.responseText );


				if(jsonObject.error == "This contact already exists."){
					createAlert("This Contact Already Exists","danger",".errorBar")
					return;
				}

				//console.log(jsonPayload);


			}
		};
		console.log(jsonPayload);
		xhr.send(jsonPayload);
		console.log('Success?')
	}
	catch(err)
	{
		console.log("Don't want to hit here");
		document.getElementById("loginResult").innerHTML = err.message;
	}

}


function createAccount(){


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

	readCookie();

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
	
				window.location.href = "index.html";

			}
		};
		console.log(jsonPayload);
		xhr.send(jsonPayload);
		console.log('Success?')
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
	
	console.log(userId)

	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	// else
	// {
	// 	document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	// }
}

function addContactOnClick()
{
    var str = "";

    str += '<div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white" style="width: 380px;">' +
      '<a class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">'+
          '<img src="images/ipear1.png" alt="iContacts Logo" width="70" height="40">'+
          '<span class="fs-5 fw-semibold">Add Contacts</span>'+
      '</a>'+
      '<div class="modal-body p-5 pt-5">'+
          '<form class="">'+
          '<div class="form-floating mb-3">'+
              '<input type="firstName" class="form-control rounded-4" id="firstName" placeholder="First Name">'+
              '<label for="floatingInput">First Name</label>'+
          '</div>'+
          '<div class="form-floating mb-3">'+
              '<input type="lastName" class="form-control rounded-4" id="lastName" placeholder="Last Name">'+
              '<label for="floatingInput">Last Name</label>'+
              '</div>'+
              '<div class="form-floating mb-3">'+
              '<input type="email" class="form-control rounded-4" id="email" placeholder="name@example.com">'+
              '<label for="floatingInput">Email Address</label>'+
              '</div>'+
          '<div class="form-floating mb-3">'+
              '<input type="phone" class="form-control rounded-4" id="phone" placeholder="1234567890">'+
              '<label for="floatingInput">Phone Number</label>'+
          '</div>' +
          '<button class="w-100 mb-2 btn btn-lg rounded-4 btn-primary" type="button" onclick="addContact()">Add Contact</button>'+
          '</form>'+
      '</div>' +
      '</div>'

	
    $('#add').empty();
    $('#add').append(str);
}



function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function searchContacts()
{
	var srch = document.getElementById("searchText").value;
	//document.getElementById("colorSearchResult").innerHTML = "";
	
	var searchContacts = "";

	var contactList = "";

	readCookie();
	console.log(userId)
	var tmp = {userId:userId, search:srch};
	var jsonPayload = JSON.stringify( tmp );

	var url = urlBase + '/SearchContacts.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				//document.getElementById("contactSearchResult").innerHTML = "Color(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );
				console.log(jsonObject)
				
				for( var i=0; i<2; i++ )
				{
					// contactList += jsonObject.results[i];
					// if( i < jsonObject.results.length - 1 )
					// {
					// 	contactList += "<br />\r\n";
					// }

					contactList += + '<a href="" class="list-group-item list-group-item-action py-3 lh-tight" aria-current="true">'
					+'<div class="d-flex w-100 align-items-center justify-content-between">'
					+'<strong class="mb-1">' + jsonObject.results[i].FirstName + '</strong>'
					+'<small>Wed</small>'
					+'</div>'
					+'<div class="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>'
					+'</a>'
				}

				
				$('#contactList').empty();
				$('#contactList').append(contactList);

				//document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		$('#contactList').empty();
		$('#contactList').append(contactList);
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
	
}
