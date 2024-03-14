document.getElementById("contactForm").onsubmit = async function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      alert("Message sent successfully. Thank you for contacting us.");
      document.getElementById("contactForm").reset();
    } else {
      throw new Error("Message sending failed");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
