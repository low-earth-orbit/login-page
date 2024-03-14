document.getElementById("registerForm").onsubmit = async function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      alert("Registration successful. You can now log in.");
      window.location.href = "login.html";
    } else {
      throw new Error("Registration failed");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
