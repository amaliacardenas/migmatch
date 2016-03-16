function authenticationSuccessful(data) {
  // set the token and call checkLoginState
  if(data.token) setToken(data.token);
  if(data.user) setUser(data.user._id);
  console.log(data.user._id);
  checkLoginState();
}

function getToken() {
  // get the token from localStorage
  return localStorage.getItem('token');
}

function setToken(token) {
  // set the token into localStorage
  return localStorage.setItem('token', token);
}

function setUser(userId) {
  // set the user into localStorage
  return localStorage.setItem('user', userId);
}

function getUser() {
  // get the token from localStorage
  return localStorage.getItem('user');
}

function logout(){
  // remove the token
  // call loggedOutState
  removeToken();
  loggedOutState();
}

function removeToken() {
  localStorage.clear();
}
