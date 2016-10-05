function submit() {
    var emailField = document.getElementById("emailLength").value.trim();
    var passField  = document.getElementById("passwordLength").value.trim();
    var emailInput = document.getElementById("emailLength");
    var passInput = document.getElementById("passwordLength");

    
    
//FAKE JSON
var userData = [
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "sincere@april.biz",
    "password": "123456",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "password": "1234567",
    "address": {
      "street": "Victor Plains",
      "suite": "Suite 879",
      "city": "Wisokyburgh",
      "zipcode": "90566-7771",
      "geo": {
        "lat": "-43.9509",
        "lng": "-34.4618"
      }
    },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": {
      "name": "Deckow-Crist",
      "catchPhrase": "Proactive didactic contingency",
      "bs": "synergize scalable supply-chains"
    }
  },
  {
    "id": 3,
    "name": "Clementine Bauch",
    "username": "Samantha",
    "email": "Nathan@yesenia.net",
    "password": "12345678",
    "address": {
      "street": "Douglas Extension",
      "suite": "Suite 847",
      "city": "McKenziehaven",
      "zipcode": "59590-4157",
      "geo": {
        "lat": "-68.6102",
        "lng": "-47.0653"
      }
    },
    "phone": "1-463-123-4447",
    "website": "ramiro.info",
    "company": {
      "name": "Romaguera-Jacobson",
      "catchPhrase": "Face to face bifurcated interface",
      "bs": "e-enable strategic applications"
    }
  },
  {
    "id": 4,
    "name": "Patricia Lebsack",
    "username": "Karianne",
    "email": "Julianne.OConner@kory.org",
    "password": "12345890",
    "address": {
      "street": "Hoeger Mall",
      "suite": "Apt. 692",
      "city": "South Elvis",
      "zipcode": "53919-4257",
      "geo": {
        "lat": "29.4572",
        "lng": "-164.2990"
      }
    },
    "phone": "493-170-9623 x156",
    "website": "kale.biz",
    "company": {
      "name": "Robel-Corkery",
      "catchPhrase": "Multi-tiered zero tolerance productivity",
      "bs": "transition cutting-edge web services"
    }
  }
];
    //Rex Section
    var emailRex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    var passwordRex = /(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$)?(^(?=.*\d)(?=.*[a-z])(?=.*[@#$%^&+=]).*$)?(^(?=.*\d)(?=.*[A-Z])(?=.*[@#$%^&+=]).*$)?(^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$)?/; 
  
    // Error Section 
    var errList = ["* Can not leave blank", "* Your email should be longer than 6", "* Your email should follow the format name@domain.com",  "*Your password should contains one of Uppaercases, !@#$%^&*()_+ and numbers", "* Please chooose your gender" ,"*Your account does not exist or password is wrong, check again"];
    
 
    //VALIDATE FUNCTION
  function validate() {
         if (passField.length == 0 && emailField.length == 0) {
             document.getElementById("generalError").innerHTML = errList[0];
             emailInput.classList.add("invalid");
             passInput.classList.add("invalid");
         } else if (!emailRex.test(emailField)) {
             document.getElementById("generalError").innerHTML = errList[2];
             emailInput.classList.add("invalid");
        } else {
            document.getElementById("error").innerHTML = ""; 
        }

  }

    //AUTHENICATION FUNCTION
function Authentication(emailField, passField) {
       var found = userData.some(function(e) {
           return e.email === emailField && e.password === passField;
       });
        if (found) {
             alert("Login Successful");
            document.getElementById("generalError").innerHTML = "";
        } else {
            document.getElementById("generalError").innerHTML = errList[5];
             emailInput.classList.add("invalid");
             passInput.classList.add("invalid");
        }     
    }
    //INVOKE AUTHENTICATION
  Authentication(emailField, passField);
    //INVOKE VALIDATE
  validate();
  
}

window.fbAsyncInit = function() {
    FB.init({
        appId   : 'YOUR_APP_ID',
        oauth   : true,
        status  : true, // check login status
        cookie  : true, // enable cookies to allow the server to access the session
        xfbml   : true // parse XFBML
    });

  };

function fb_login(){
    FB.login(function(response) {

        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            //console.log(response); // dump complete info
            access_token = response.authResponse.accessToken; //get access token
            user_id = response.authResponse.userID; //get FB UID

            FB.api('/me?locale=en_US&fields=id,name,email,first_name,last_name', function(response) {
                user_email = response.email; //get user email
          // you can store this data into your database             
            });

        } else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');

        }
    }, {
        scope: 'publish_stream,email'
    });
}


(function() {
    var e = document.createElement('script');
    e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
    e.async = true;
    document.getElementById('fb-root').appendChild(e);
}());
function onSuccess(googleUser) {
      console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    }
    function onFailure(error) {
      console.log(error);
    }
    function renderButton() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
      });
    }



    //Google


// gapi.load('auth2', function() {
//     gapi.auth2.init();
// });
// function onSignIn(googleUser) {
//   var profile = googleUser.getBasicProfile();
//   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log('Name: ' + profile.getName());
//   console.log('Image URL: ' + profile.getImageUrl());
//   console.log('Email: ' + profile.getEmail());
// }


