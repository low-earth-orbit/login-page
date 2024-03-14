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
      alert("Email verified successfully!");
      window.location.href = "login.html"; // Redirect to login page after successful verification
    });
  };
});
