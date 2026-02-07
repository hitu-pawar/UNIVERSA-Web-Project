// FINAL SIGNUP FUNCTION (Node.js + MongoDB)

async function signup() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter Email and Password");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.message === "Account created successfully") {
      alert("Signup successful! Please login now.");
      window.location.href = "login.html";
    } else {
      alert(data.message || "Signup failed");
    }

  } catch (err) {
    alert("Server error. Check backend.");
    console.error(err);
  }
}
