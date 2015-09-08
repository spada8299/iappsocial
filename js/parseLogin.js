'use strict';
// Initialize Parse
// Parse.initialize("LD5YXs0MuB68HbSzl6QW0RMXKfHlYRNgGx1zi7y8", "lJrNywD6Nwg385fbD2iZXYMu28qMneb75UkYVVJB");

// window.fbAsyncInit = function() {
//   Parse.FacebookUtils.init({ // this line replaces FB.init({
//     appId: '411324245723054', // Facebook App ID
//     status: true, // check Facebook Login status
//     cookie: true, // enable cookies to allow Parse to access the session
//     xfbml: true, // initialize Facebook social plugins on the page
//     version: 'v2.3' // point to the latest Facebook Graph API version
//   });

//   // Run code after the Facebook SDK is loaded.
// };

// (function(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) {
//     return;
//   }
//   js = d.createElement(s);
//   js.id = id;
//   js.src = "//connect.facebook.net/en_US/sdk.js";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));



var user = new Parse.User();

function parseSignUp() {

  user.set("name", $('#name').val());
  user.set("password", $('#register-password').val());
  user.set("username", $('#register-email').val());
  user.signUp(null, {
    success: function(user) {
      alert('signUp success!');
      // Hooray! Let them use the app now.
    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
    }
  });
}

function parseLogIn() {
  Parse.User.logIn($('#email').val(), $('#password').val(), {
    success: function(user) {
      window.location = 'maker.html';
      // Do stuff after successful login.
    },
    error: function(user, error) {
      alert(error);
      // The login failed. Check error to see why.
    }
  });
}

function fbLogIn() {
  Parse.FacebookUtils.logIn(null, {
    success: function(user) {
      if (!user.existed()) {
        alert("User signed up and logged in through Facebook!");
      } else {
        alert("User logged in through Facebook!");
      }
      FB.api('/me', function(response) {
        console.log(JSON.stringify(response));
      });
    },
    error: function(user, error) {
      alert("User cancelled the Facebook login or did not fully authorize.");
    }
  });
}
