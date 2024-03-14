document.getElementById("registerForm").onsubmit = function (event) {
  event.preventDefault();

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  var attributeList = [];
  var dataEmail = {
    Name: "email",
    Value: email,
  };

  var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
    dataEmail
  );

  attributeList.push(attributeEmail);

  userPool.signUp(email, password, attributeList, null, function (err, result) {
    if (err) {
      alert(err.message || JSON.stringify(err));
      return;
    }
    var cognitoUser = result.user;
    console.log("user name is " + cognitoUser.getUsername());
    alert(
      "Registration successful. Please check your email to confirm your registration."
    );

    sessionStorage.setItem("userEmailForVerification", email);

    window.location.href = "login.html"; // Redirect to login page after successful verification
  });
};
