document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("logoutButton").onclick = function (event) {
    event.preventDefault(); // Prevent any default action

    // Retrieve the current user from the user pool
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      // Sign out the user
      cognitoUser.signOut();

      // Clear any session or local storage data
      localStorage.clear();
      sessionStorage.clear();

      console.log("Logging out user");
      // Redirect to the login page or home page
      window.location.href = "login.html";
    }
  };
});
