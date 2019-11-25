// https://www.w3resource.com/javascript/form/javascript-sample-registration-form-validation.php
// function which is called on onSubmit; This function calls all other functions used for validation

var usernameLowerCase = username.toLowerCase();
var passid = document.registration.passid;
var passidconfirm = document.registration.passidconfirm;
var ufullname = document.registration.userfullname;
var uadd = document.registration.address;
var uemail = document.registration.email;

users_reg_data[usernameLowerCase].username = usernameLowerCase;
users_reg_data[usernameLowerCase].password = POST.password;

function formValidation() {
    var usernameLowerCase = username.toLowerCase();
    var password = POST.password;
    var passwordConfirm = POST.repeat_password;
    var fullName = POST.fullname;
    var email = POST.email;
    if (username_validation(usernameLowerCase, 4, 10)) {
        if (password_validation(password, 6)) {
            if (passwordConfirm_validation(passwordConfirm)) {
                if (fullName_validation(fullName, 30)) {
                    if (ValidateEmail(email)) {
                    }
                }
            }
        }
    }
    return false;
}

/* JavaScript function for validating username; 
checks whether username input field is provided with a string of length 4 to 10 characters. 
If not, it displays an alert. */

function username_validation(usernameLowerCase, mx, my) {
    var usernameLowerCase_len = usernameLowerCase.value.length;
    if (usernameLowerCase_len == 0 || usernameLowerCase_len >= my || usernameLowerCase_len < mx) {
        alert("Username should not be empty / length be between " + mx + " to " + my);
        usernameLowerCase_len.focus();
        return false;
    }

    else {
        var letters = /^[0-9a-zA-Z]+$/;
        if (usernameLowerCase_len.match(letters)) {
            return true;
        }
        else {
            alert('Username must have alphanumeric characters only');
            usernameLowerCase.focus();
            return false;
        }
    }

}


// validates password; it should be of length 6 characters or greater). If not, it displays an alert.
function password_validation(password, mx) {
    var password_len = password.value.length;
    if (password_len == 0 || password_len < mx) {
        alert("Password should not be empty / length should be a minimum of   " +  mx);
        password.focus();
        return false;
    }
    return true;
}

// validates password confirmation; should be the same value as password. If not, it displays an alert.
function passwordConfirm_validation(passwordConfirm) {
    if (passwordConfirm == password) {
        return true;
    }
    else {
        alert('Password must be the same for both inputs!');
        passwordConfirm.focus();
        return false;
    }
}

/* validate userfullname 
checks whether user name input field is provided with alphabates characters.
If not, it displays an alert */
function fullName_validation(fullName, mx) {
    var letters = /^[A-Za-z]+$/;
    if (fullName.value.match(letters)) {
        var fullName_len = fullName.value.length;
        if (fullName_len == 0 || ufullname_len < mx) {
            return true;

        }

    }
    else {
        alert('Username must have alphabet characters only');
        fullName.focus();
        return false;
    }
}

// validate email format
function ValidateEmail(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.value.match(mailformat)) {
        alert('Form Succesfully Submitted');
        window.location.reload()
        return true;
    }
    else {
        alert("You have entered an invalid email address!");
        email.focus();
        return false;
    }
}

