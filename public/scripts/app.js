console.log('it is working');

$(document).ready(function(){


		$("#signup-form").on("submit", function(event){

		event.preventDefault();

		// i want to grab the data from the input fields and send it to the back end
		// the post route /signup

		var formData = {
			email : $("#email-input").val(),
			password : $("#pw-input").val()
		}

		console.log(formData)

		$.ajax({
			url  : "/users",
			method : "POST",
			data : formData,
			success : function(response){
				$("h1").append(response.email + " is now a user email")
			}
		})

		var signupData = $("#signup-form").serialize();
		console.log(signupData);
		//   // send POST request to /users with the form data
		$.post('/users', signupData, function(response){
		    console.log(response);
		})


	})

});

	$("#login-form").on("submit", function(event){
		event.preventDefault();

		var formData = {
			email : $("#email-input").val(),
			password : $("#pw-input").val()
		}

		console.log(formData)

		$.ajax({
			url  : "/sessions",
			method : "POST",
			data : formData,
			success : function(response){
				window.location = "/profile"
			}
		})

	})



