
var urlBase = 'http://icontacts.zapto.org/LAMPAPI';
var extension = 'php';

var flag = 0;
var userId = 0;
var firstName = "";
var lastName = "";
var userName = "";

var contacts = [];

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

// function showUsername()
// {
// 	var str = "";
// 	str += "" + localStorage.username + "";
// 	console.log(localStorage.username);
// 	$('userName').empty();
// 	$('userName').append(str);
// }

function showContact(cid){

	var contactInfo = "";

	console.log(cid)

	readCookie();

	console.log(contacts[cid])
	var tmp = {ID:cid};
	var jsonPayload = JSON.stringify( tmp );

	var url = urlBase + '/ShowContact.' + extension;
	
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

					contactInfo += '<div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white" style="width: 380px;">' +
					'<a class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom align-self-center">'+
						'<span class="fs-5 fw-semibold">Contact Info</span>'+
					'</a>'+
					'<div class="modal-body p-5 pt-5">'+
						'<form class="">'+
						'<div class="form-floating mb-3">'+
							'<input type="firstName" class="form-control rounded-4" id="firstName" value="' + jsonObject.firstName +'">'+
							'<label for="floatingInput">First Name</label>'+
						'</div>'+
						'<div class="form-floating mb-3">'+
							'<input type="lastName" class="form-control rounded-4" id="lastName" value="' + jsonObject.LastName +'">'+
							'<label for="floatingInput">Last Name</label>'+
							'</div>'+
							'<div class="form-floating mb-3">'+
							'<input type="email" class="form-control rounded-4" id="email" value="' + jsonObject.Email +'">'+
							'<label for="floatingInput">Email</label>'+
							'</div>'+
						'<div class="form-floating mb-3">'+
							'<input type="phone" class="form-control rounded-4" id="phone" value="' + jsonObject.PhoneNumber +'">'+
							'<label for="floatingInput">Phone Number</label>'+
						'</div>' +
						'<button class="w-100 mb-2 btn btn-lg rounded-4 btn-primary" type="button" onclick="editContact(' + cid + ')">Edit Contact</button>'+
						'<button class="w-100 mb-2 btn btn-lg rounded-4 btn-danger" type="button" onclick="deleteContact(' + cid + '); searchContacts();">Delete Contact</button>'+
						'</form>'+
					'</div>' +
					'</div>'

					//document.getElementById("firstName").innerHTML = jsonObject.firstName;

					$('#add').empty();
					$('#add').append(contactInfo);
					if (flag == 0)
					{
						$('main').append('<div class="b-example-divider"></div>');
						flag = 1;
					}
					

			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}


}

function editContact(cid )
{
	var str = "";


	readCookie();

	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var email = document.getElementById("email").value;
	var phoneNumber = document.getElementById("phone").value;

	var tmp = {userId:userId, ID:cid, NewFirst: firstName, NewLast: lastName, NewNumber: phoneNumber, NewEmail: email};
	var jsonPayload = JSON.stringify( tmp );

	var url = urlBase + '/EditContact.' + extension;
	
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
				//var jsonObject = JSON.parse( xhr.responseText );
				//console.log('you are in the try catch statement')
				//window.location.href = "contacts.html";
				$('contactList').empty();
				searchContacts();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}

    
	
   
	
}

function deleteContact(cid){

	if (window.confirm("Do you really want to delete this contact?"))
	{
		var contactInfo = "";

		console.log(cid)

		readCookie();

		console.log(contacts[cid])
		var tmp = {ID:cid};
		var jsonPayload = JSON.stringify( tmp );

		var url = urlBase + '/DeleteContact.' + extension;
		
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
					window.location.href = "contacts.html";
					$('#add').empty();
					searchContacts();
				}
			};
			xhr.send(jsonPayload);
			
		}
		catch(err)
		{
			document.getElementById("contactSearchResult").innerHTML = err.message;
		}

	}
	else
		return;
	

}

function addContact(){

	console.log("here");
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
	
	var tmp = {FirstName:firstName,LastName:lastName,Email:email,PhoneNumber:phoneNumber,userId:userId};



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

				window.location.href = "contacts.html";
				$('contactList').empty();
				searchContacts();
			}
		};
		console.log(jsonPayload);
		xhr.send(jsonPayload);
		console.log('Success?');
	}
	catch(err)
	{
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
		console.log('Success?');
	}
	catch(err)
	{
		console.log("Don't want to hit here");
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

// function test()
// {	
// 	var test = "";

// 	for(var i = 0; i < 10; i++){

// 		test  = test + '<a href="#" class="list-group-item list-group-item-action py-3 lh-tight" aria-current="true">'
// 		+'<div class="d-flex w-100 align-items-center justify-content-between">'
// 		+'<strong class="mb-1">List group item heading</strong>'
// 		+'<small>Wed</small>'
// 		+'</div>'
// 		+'<div class="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>'
// 		+'</a>'
// 	}

// 	$('#contactList').empty();
// 	$('#contactList').append(test);
// 	//$('#contactList').modal('show')
// }

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
	// else
	// {
	// 	document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	// }
}

function addContactOnClick()
{
    var str = "";

    str += '<div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white" style="width: 380px;">' +
				'<a class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom align-self-center">'+
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
					'<button class="w-100 mb-2 btn btn-lg rounded-4 btn-primary" type="button" onclick="addContact();">Add Contact</button>'+
					'</form>'+
				'</div>' +
			'</div>'

	
    $('#add').empty();
    $('#add').append(str);
	if (flag == 0)
	{
		$('main').append('<div class="b-example-divider"></div>');
		flag = 1;
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


function searchContacts()
{
	console.log('you are in this function');
	document.getElementById("searchText").innerHTML = "";
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
				
				for( var i=0; i<jsonObject.results.length; i++ )
				{

					contacts.push(jsonObject.results[i].id)
					contactList = contactList + '<a href="#" class="list-group-item list-group-item-action py-3 lh-tight" aria-current="true" onclick="showContact(' + jsonObject.results[i].id + ')">'
					+'<div class="d-flex w-100 align-items-center justify-content-between">'
					+'<strong id = "contactFirstName" class="mb-1">' + jsonObject.results[i].FirstName + ' ' + jsonObject.results[i].LastName + '</strong>'
					+'</div>'
					+'</a>'
				}

				
				//$('#contactList').append(contactList);
				$('#contactList').empty();
				$('#contactList').append(contactList);
				//document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
	
}
