(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$(".toggle-password").click(function() {

	  $(this).toggleClass("fa-eye fa-eye-slash");
	  var input = $($(this).attr("toggle"));
	  if (input.attr("type") == "password") {
	    input.attr("type", "text");
	  } else {
	    input.attr("type", "password");
	  }
	});

})(jQuery);
/*
const passEyes = document.querySelector('.toggle-password');
passEyes.addEventListener('click', (event) => {
	passEyes.classList.toggle('fa-eye', 'fa-eye-slash');
})
*/

//read login and password and check login



const serializeForm = (formNode) => {
	return new FormData(formNode);
}
const handleFormSingIn = (event) => {
	event.preventDefault()
	const data = serializeForm(signInform);
	sendData(data);
  }
  
const signInform = document.querySelector('.signup-form');
signInform.addEventListener('submit', handleFormSingIn);

const sendData = (data) => {
	axios.post('/users/createuser', data);
}
