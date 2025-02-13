//login
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault(); //Prevent form from reloading the page

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const messageBox = document.getElementById('login-message');

      try {
        let response = await fetch('http://localhost:5095/api/Login/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ Name: username, Password: password }),
          credentials: 'include', // Ensures session cookies are sent
        });

        let data = await response.json();

        if (!response.ok) {
          throw new Error(data.Message || 'Invalid username or password');
        }

        console.log('Login Success:', data);
        sessionStorage.setItem('LoggedInUser', username);
        sessionStorage.setItem('userRole', data.role);

        // Redirect to home page
        window.location.href = '/index.html';
      } catch (error) {
        console.error('Login Error:', error);
        messageBox.textContent = error.message; //show error message on page
      }
    });
  }
});
