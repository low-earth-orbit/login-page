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

document.getElementById("loginForm").onsubmit = function (event) {
  event.preventDefault();

  if (!email) {
    email = document.getElementById("email").value;
  }

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  var authenticationData = {
    Username: email,
    Password: password,
  };
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );

  var userData = {
    Username: email,
    Pool: userPool,
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      var accessToken = result.getAccessToken().getJwtToken();
      console.log("Login successful. Access Token:", accessToken);
      window.location.href = "contact.html";
    },
    onFailure: function (err) {
      console.error(err.message || JSON.stringify(err)); // console log
      alert("Login failed: " + err.message); // error alert
      document.getElementById("loginForm").reset(); // reset the form
    },
  });
};
