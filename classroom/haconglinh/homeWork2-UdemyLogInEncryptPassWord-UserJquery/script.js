(function ($) {

    // Config time carousel
    $(document).ready(function () {
        $('.carousel').carousel({
            interval: 1000
        });
    });

    // Send data to sever and check result
    $('#btnLogin').click(function () {
        var email = $('#userEmail').val();
        var password = $('#userPassword').val();
        var passHash = md5(password);

        $.ajax({
            url: 'user.json',
            type: 'POST',
            asyn: 'true',
            success: function (result) {
                $(result.users).each(function (i) {
                    console.log(result.users.length);
                    if (email === result.users[i].email && passHash === result.users[i].password) {
                        alert("Login success");
                    } else if (i === (result.users.length - 1)) {
                        alert("Wong username or password");
                    }

                });
            }
        });
    });

}(jQuery));