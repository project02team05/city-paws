async function signupFormHandler(event) {
    event.preventDefault();
  
    const firstName = document.querySelector('#firstName-signup').value.trim();
    const lastName = document.querySelector('#lastName-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // check the response status
      if (response.ok) {
        document.location.replace('/search');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
  