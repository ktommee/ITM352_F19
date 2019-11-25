// https://www.w3resource.com/javascript/form/javascript-sample-registration-form-validation.php
// function which is called on onSubmit; This function calls all other functions used for validation
function formValidation() {
    var uname = document.registration.username;
    var passid = document.registration.passid;
    var passidconfirm = document.registration.passidconfirm;
    var ufullname = document.registration.userfullname;
    var uadd = document.registration.address;
    var uemail = document.registration.email;
    if (username_validation(uname, 4, 10)) {
        if (passid_validation(passid, 6)) {
            if (passidConfirm_validation(passidConfirm)) {
                if (allLetter(ufullname, 30)) {
                    if (alphanumeric(uadd)) {
                        if (ValidateEmail(uemail)) {
                        }
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

function username_validation(uname, mx, my) {
    var uname_len = uname.value.length;
    if (uname_len == 0 || uname_len >= my || uname_len < mx) {
        alert("Username should not be empty / length be between " + mx + " to " + my);
        uname.focus();
        return false;
    }

    else {
        var letters = /^[0-9a-zA-Z]+$/;
        if (uname.value.match(letters)) {
            return true;
        }
        else {
            alert('Username must have alphanumeric characters only');
            uadd.focus();
            return false;
        }
    }

}


// validates password; it should be of length 6 characters or greater). If not, it displays an alert.
function passid_validation(passid, mx) {
    var passid_len = passid.value.length;
    if (passid_len == 0 || passid_len < mx) {
        alert("Password should not be empty / length should be a minimum of   " + mx);
        passid.focus();
        return false;
    }
    return true;
}

// validates password confirmation; should be the same value as password. If not, it displays an alert.
function passidConfirm_validation(passidConfirm) {
    if (passidConfirm == passid) {
        return true;
    }
    else {
        alert('Password must be the same for both inputs!');
        passidConfirm.focus();
        return false;
    }
}

/* validate userfullname 
checks whether user name input field is provided with alphabates characters.
If not, it displays an alert */
function allLetter(ufullname, mx) {
    var letters = /^[A-Za-z]+$/;
    if (ufullname.value.match(letters)) {
        var ufullname_len = ufullname.value.length;
        if (ufullname_len == 0 || ufullname_len < mx) {
            return true;

        }

    }
    else {
        alert('Username must have alphabet characters only');
        ufullname.focus();
        return false;
    }
}

// validate email format
function ValidateEmail(uemail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (uemail.value.match(mailformat)) {
        alert('Form Succesfully Submitted');
        window.location.reload()
        return true;
    }
    else {
        alert("You have entered an invalid email address!");
        uemail.focus();
        return false;
    }
}

