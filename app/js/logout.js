document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("logoutButton").onclick = function (event) {
    event.preventDefault(); // Prevent any default action

    // Retrieve the current user from the user pool
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      // Sign out current user
      cognitoUser.signOut();

      // Clear local storage and session data
      localStorage.clear();
      sessionStorage.clear();

      console.log("Logging out user. You'll be redirected to the login page.");
      // Redirect to the login page or home page
      window.location.href = "./";
    }
  };
});
