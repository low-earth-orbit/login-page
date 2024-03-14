document.getElementById("resetPasswordForm").onsubmit = async function (event) {
  event.preventDefault();

  const oldPassword = document.getElementById("oldPassword").value;
  const newPassword = document.getElementById("newPassword").value;

  try {
    // This endpoint and method are placeholders. Adjust according to your actual API.
    const response = await fetch("/api/changePassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    if (response.ok) {
      alert("Password has been successfully reset.");
      // Optionally redirect the user or take other actions
    } else {
      // Handle errors, e.g., old password incorrect
      const error = await response.json();
      alert(error.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to reset password. Please try again.");
  }
};
