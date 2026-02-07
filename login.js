// FINAL LOGIN FUNCTION (Node.js + MongoDB + JWT)

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please enter both Email and Password");
    return;
  }

  try {
    const res = await fetch("https://universa-backend.onrender.com/api/auth/login", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
      // Save JWT Token
      localStorage.setItem("token", data.token);

      alert("Login Successful!");
      
      // Redirect to homepage
      window.location.href = "index.html";
    } 
    else {
      alert(data.message || "Login failed");
    }

  } catch (error) {
    console.error(error);
    alert("Something went wrong. Please try again.");
  }
}
