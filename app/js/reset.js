// Redirect to login if no user is logged in
document.addEventListener("DOMContentLoaded", function () {
  var cognitoUser = userPool.getCurrentUser();

  if (cognitoUser != null) {
    cognitoUser.getSession(function (err, session) {
      if (err) {
        console.error(err);
        redirectToLogin();
        return;
      }

      if (!session.isValid()) {
        redirectToLogin();
      }
    });
  } else {
    redirectToLogin();
  }
});

function redirectToLogin() {
  window.location.href = "./";
}

document.getElementById("resetPasswordForm").onsubmit = function (event) {
  event.preventDefault();

  var oldPassword = document.getElementById("oldPassword").value;
  var newPassword = document.getElementById("newPassword").value;
  var cognitoUser = userPool.getCurrentUser();

  if (cognitoUser != null) {
    cognitoUser.getSession(function (err, session) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      // The user's session is valid, proceed with the password change
      cognitoUser.changePassword(
        oldPassword,
        newPassword,
        function (err, result) {
          if (err) {
            alert(err.message || JSON.stringify(err));
            return;
          }
          alert("Password changed successfully! You'll be logged out.");

          // Sign out the user
          cognitoUser.signOut();

          window.location.href = "./"; // Redirect the user after a successful password change
        }
      );
    });
  } else {
    // The user is not logged in or the session is not valid
    console.log("User is not logged in.");
    window.location.href = "./"; // Optionally redirect to the login page
  }
};
