document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("loginForm").onsubmit = function (event) {
    event.preventDefault();

    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var authenticationData = {
      Username: username,
      Password: password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
    );

    var userData = {
      Username: username,
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
});
