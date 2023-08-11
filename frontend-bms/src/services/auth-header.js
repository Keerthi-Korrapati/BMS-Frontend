export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('BookStore'));

  if (user && user.accessToken) {
     return { Authorization: 'Bearer ' + user.accessToken }; // If the user data and access token exist, it returns the appropriate authorization header
  } else {
    return {};
  }
}
