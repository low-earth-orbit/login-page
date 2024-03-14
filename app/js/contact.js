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
    // Redirect to login if no user is logged in
    redirectToLogin();
  }
});

function redirectToLogin() {
  window.location.href = "./"; // Redirect user to login page
}

document.getElementById("contactForm").onsubmit = async function (event) {
  event.preventDefault();

  // Get the current user from Cognito
  const cognitoUser = userPool.getCurrentUser();

  if (cognitoUser === null) {
    console.log("No user is currently logged in.");
    window.location.href = "./"; // Redirect to login if not logged in
    return;
  }

  // Attempt to get the current session
  cognitoUser.getSession(async function (err, session) {
    if (err) {
      console.error("Error fetching session: ", err);
      return;
    }

    if (!session.isValid()) {
      console.log("Session is invalid.");
      window.location.href = "./"; // Optionally redirect to login if session is invalid
      return;
    }

    // Session is valid, proceed with form submission
    const idToken = session.getIdToken().getJwtToken();
    const formData = {
      title: document.getElementById("title").value,
      message: document.getElementById("message").value,
      username: cognitoUser.getUsername(), // Include the username in formData
    };

    try {
      const response = await fetch(
        "https://iiwjgyo8t9.execute-api.us-east-1.amazonaws.com/submit-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: idToken,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Form submission failed: ${errorMessage}`);
      }

      const result = await response.json();
      alert(result.message);
      document.getElementById("contactForm").reset();
    } catch (error) {
      console.error("Error:", error);
      alert(`Error submitting form: ${error.message}`);
    }
  });
};
