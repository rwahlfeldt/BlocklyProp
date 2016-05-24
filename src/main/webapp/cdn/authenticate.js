var timestamp = undefined;
var timediff = 0;
var challenge = undefined;

$(document).ready(function () {
// bind 'myForm' and provide a simple callback function
    var body = $('body');
    var loginForm = $('#loginform');

    challenge = body.data('challenge');
    timestamp = body.data('timestamp');

    var nowEpoch = Date.now();
    timediff = timestamp - nowEpoch;

    loginForm.submit(function (event) {
        $("#login-failure").addClass("hidden");
        // Stop form from submitting normally
        event.preventDefault();

        var jqxhr = $.post(loginForm.attr('action'), loginForm.serialize(), onSuccess);
        jqxhr.fail(function (jqXHR, textStatus, errorThrown) {
            alert("An unexpected error occured. Please try again later or contact the webmaster.");
        });

    });

    // Token can be updated while page is loaded by another page
    var token = window.localStorage.getItem('token');
    if (token !== undefined && timestamp) {
        $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
            if (!options.beforeSend && !options.crossDomain) {
                options.beforeSend = function (xhr) {
                    var requestTimestamp = Date.now() + timediff;
                    timediff++;
                    var hash = sha256(token + challenge + requestTimestamp);
                    xhr.setRequestHeader('X-Timestamp', requestTimestamp);
                    xhr.setRequestHeader('X-Authorization', hash);
                };
            }
        });
    }

    if (jQuery().bootstrapTable) {
        $("[data-toggle='secure-table']").bootstrapTable();
    }
    if (typeof window['post_auth_init'] === 'function') {
        window['post_auth_init']();
    }

});

function getUrlAuthentication() {
    // Token can be updated while page is loaded by another page
    var token = window.localStorage.getItem('token');
    if (token !== undefined && timestamp) {
        var requestTimestamp = Date.now() + timediff;
        timediff++;
        var hash = sha256(token + challenge + requestTimestamp);
        return "timestamp=" + requestTimestamp + "&authorization=" + hash;
    }
    return "";
}

function onSuccess(response, statusText, xhr, $form) {
    // alert(response.data.token);
    if (response.success === true) {
        window.localStorage.setItem('token', response.data.token);
        var requestTimestamp = Date.now() + timediff;
        var idUser = response.data['id-user'];
        var hash = sha256(response.data.token + challenge + requestTimestamp);
        $.post('/blockly/authenticate', {'id-user': idUser, 'timestamp': requestTimestamp, 'hash': hash}, function (authenticationResponse) {
            if (authenticationResponse.success === true) {
                if (typeof window['post-authenticate'] === 'function') {
                    window['post-authenticate']();
                } else {
                    location.reload(true);
                }
            } else {
                $("#login-failure").removeClass("hidden");
                if (typeof window['failed-authentication'] === 'function') {
                    window['failed-authentication']();
                }
            }
        });
    } else {
        $("#login-failure").removeClass("hidden");
        if (typeof window['failed-authentication'] === 'function') {
            window['failed-authentication']();
        }
    }
}