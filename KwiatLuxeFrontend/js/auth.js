const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterLink = document.getElementById('showRegister');
const message = document.getElementById('message');

showRegisterLink.addEventListener('click', e => {
  e.preventDefault();
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
  message.textContent = '';
});

registerForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = document.getElementById('regUsername').value.trim();
  const password = document.getElementById('regPassword').value.trim();

  if (localStorage.getItem('user_' + username)) {
    message.textContent = 'User already exists.';
    return;
  }

  const userData = {
    username,
    password,
    role: 'user'
  };

  localStorage.setItem('user_' + username, JSON.stringify(userData));
  message.textContent = 'Registration successful! You can now login.';
  registerForm.reset();
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
});

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Admin kontrol
  if (username === 'admin' && password === 'admin') {
    sessionStorage.setItem('loggedInUser', JSON.stringify({username, role:'admin'}));
    window.location.href = 'admin.html';
    return;
  }

  const userStr = localStorage.getItem('user_' + username);
  if (!userStr) {
    message.textContent = 'User not found.';
    return;
  }

  const user = JSON.parse(userStr);
  if (user.password !== password) {
    message.textContent = 'Incorrect password.';
    return;
  }

  sessionStorage.setItem('loggedInUser', JSON.stringify(user));
  message.textContent = 'Login successful! Redirecting...';

  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
});
