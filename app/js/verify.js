// If user is logged in, redirect user to contact page
document.addEventListener("DOMContentLoaded", function () {
  var cognitoUser = userPool.getCurrentUser();

  if (cognitoUser != null) {
    cognitoUser.getSession(function (err, session) {
      if (err) {
        console.error(err);
        return;
      }

      if (session.isValid()) {
        redirectToContact();
      }
    });
  }
});

function redirectToContact() {
  window.location.href = "contact.html";
}

const email = sessionStorage.getItem("userEmailForVerification");
if (email) {
  document.getElementById("email").value = email;
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("verificationForm").onsubmit = function (event) {
    event.preventDefault();

    const code = document.getElementById("code").value;

    if (!email) {
      email = document.getElementById("email").value;
    }

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmRegistration(code, true, function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      alert(
        "Email verified successfully! You'll be redirected to the login page."
      );
      window.location.href = "./"; // Redirect to login page after successful verification
    });
  };
});
