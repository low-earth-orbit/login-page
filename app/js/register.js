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

document.getElementById("registerForm").onsubmit = function (event) {
  event.preventDefault();

  var password = document.getElementById("password").value;
  const isPasswordValid = validatePassword(password);

  if (!isPasswordValid) {
    alert("Password does not meet the requirements.");
    return; // Stop the form from submitting
  }

  var email = document.getElementById("email").value;

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

    window.location.href = "verify.html"; // Redirect for email verification after successful registration
  });
};

function validatePassword(password) {
  const requirements = {
    length: 8,
    number: /\d/,
    specialChar: /[!@#$%^&*(),.?":{}|<>]/,
    upper: /[A-Z]/,
    lower: /[a-z]/,
  };

  const isValidLength = password.length >= requirements.length;
  const hasNumber = requirements.number.test(password);
  const hasSpecialChar = requirements.specialChar.test(password);
  const hasUpper = requirements.upper.test(password);
  const hasLower = requirements.lower.test(password);

  // Update UI elements
  document
    .getElementById("requirementLength")
    .classList.toggle("valid", isValidLength);
  document
    .getElementById("requirementNumber")
    .classList.toggle("valid", hasNumber);
  document
    .getElementById("requirementSpecial")
    .classList.toggle("valid", hasSpecialChar);
  document
    .getElementById("requirementUpper")
    .classList.toggle("valid", hasUpper);
  document
    .getElementById("requirementLower")
    .classList.toggle("valid", hasLower);

  return isValidLength && hasNumber && hasSpecialChar && hasUpper && hasLower;
}

document.getElementById("password").addEventListener("input", function () {
  const password = this.value;
  validatePassword(password);
});
