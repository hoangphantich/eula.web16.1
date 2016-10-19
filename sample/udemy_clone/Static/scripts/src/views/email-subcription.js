define(['jquery','base/modules/animate','base/modules/analytics'], function ($, animate, analytic) {

    function init(container) {


        $("#signup-form").on("submit", function() {
            var email = $(this).find("#txtsignup").val();
            if (validateEmail(htmlEscape($.trim(email)))) {
                submitFormAjax();
                return false;
            } else {
                $(this).find("#txtsignup").addClass("invalid");
                return false;
            }
        });

        $("#signup-form").find("#txtsignup").on("blur", function() {
            var email = $(this).val();
            if (validateEmail(htmlEscape($.trim(email)))) {
                $(this).removeClass("invalid");
            } else {
                $(this).addClass("invalid");
             
            }
        });

        function validateEmail(email) {
            var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return re.test(email);
        }

        function htmlEscape(str) {
            return String(str)
                    .replace(/&/g, '&amp;')
                    .replace(/"/g, '&quot;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');
        }

        function submitFormAjax() {
            var form = container.find('form');

            $.ajax({
                type: "post",
                url: $(form)[0].action,
                data: $(form).serialize(),
                success: function (data) {
                    showThankyouMessage();
                }
            });
        }

        function showThankyouMessage() {
            analytic['newsletter-subscription']({});

            var elements = container.children().not(".thankyou-message")
            for (var i = 0; i < elements.length; i++) {
                if (i == elements.length - 1) {
                    animate(elements.eq(i), 'slideUp', { duration: 250, easing: "easeInOutQuad", display: 'none' }).then(function () {
                        animate(container.find('.thankyou-message'), 'slideDown', { duration: 250, easing: "easeInOutQuad", display: 'block' })
                        container.find('form').get(0).reset();
                    });
                }
                else {
                    animate(elements.eq(i), 'slideUp', { duration: 250, easing: "easeInOutQuad", display: 'none' })
                }
            }

            setTimeout(function () {
                showForm();
            }, 5000);
        }

        function showForm() {
            animate(container.find('.thankyou-message'), 'slideUp', { duration: 250, easing: "easeInOutQuad", display: 'none' }).then(function () {
                var elements = container.children().not(".thankyou-message");
                for (var i = 0; i < elements.length; i++) {
                    animate(elements.eq(i), 'slideDown', { duration: 250, easing: "easeInOutQuad", display: 'block' })
                }
            });
        }
    }

    return {
        init: function (container) {
            init(container);
        }
    };
});