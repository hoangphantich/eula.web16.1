var userData = [
    {
        id: 1,
        email : "test@test.com",
        pass : "25f9e794323b453885f5181f1b624d0b" // 123456789
    },
    {
        id : 2,
        email : "binhnguyen7968@gmail.com",
        pass : "bdc1fd1c34795fbb27a0a695c9c13659" // 0974109776
    }
];
(function(){
    // slider
    var imageArr = ["images/woman_phone.jpg","images/man_mockup_n.jpg"]
    var currentSliderImageIndex = 0;
    setInterval(function(){
        var imageUrl = "images/woman_phone.jpg";
        if(currentSliderImageIndex === 0){
            imageUrl = imageArr[1];
            currentSliderImageIndex = 1;
        }else{
            imageUrl = imageArr[0];
            currentSliderImageIndex = 0;
        }
        
        $(".feature-wrap").css('background', 'url(' + imageUrl + ') no-repeat').fadeIn(1500);

    },5000);

    // check login 

    $("#loginBtn").on("click",function(){
        event.preventDefault();
        var userMailEl = $("#userMail");
        var userPassEl = $("#userPass");
        if(!userMailEl[0].checkValidity()){
            userMailEl[0].reportValidity();
            return;
        } 
        var userMailValue = userMailEl.val();
        var userPassValue = userPassEl.val();
        checkUserName(userMailValue,userPassValue);
    });

    $("#facebookLoginBtn").on("click",function(){
        FB.login(function(response) {
            if (response.status === 'connected') {
                // Logged into your app and Facebook.

                window.location.href = "http://stackoverflow.com";
                // FB.api('/me', function(response) {
                    
                // });
            } else if (response.status === 'not_authorized') {
                // The person is logged into Facebook, but not your app.
            } else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.
            }
            });
    })
})();


function checkUserName(_email,_pass){
    var pass = md5(_pass);
    userData.forEach(function(userObj) {
        if(_email == userObj.email){
            if(pass == userObj.pass){
                window.location.href = "http://stackoverflow.com";
                return;
            }
        }
        $(".alert").show();
    });
}