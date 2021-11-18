const BASE_URL = 'http://localhost:3001';

const apiService = {};

apiService.register = async user => {
  return await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

apiService.loadUser = accessToken => {
  return fetch(`${BASE_URL}/`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

apiService.login = async user => {
  return await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

apiService.logout = accessToken => {
  console.log(accessToken);
  localStorage.removeItem('accessToken');
};

apiService.getAllUsersCocktails = async setState => {
  return await fetch(`${BASE_URL}/cocktails`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
  })
    .then(res => res.json())
    .then(res => setState(res))
    .catch(err => console.log(err));
};

apiService.getCocktail = async (id, accessToken) => {
  return fetch(`${BASE_URL}/cocktail/${id}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

// DID NOT USE DO FAR
apiService.getAllMyCocktails = async accessToken => {
  return await fetch(`${BASE_URL}/myCocktails`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

// DID NOT USE DO FAR
// apiService.createCocktail = async (cocktail, accessToken) => {
//   return fetch(`${BASE_URL}/`, {
//     method: 'POST',
//     credentials: 'include',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${accessToken}`,
//     },
//     body: JSON.stringify(cocktail),
//   })
//     .then(res => res.json())
//     .catch(err => console.log(err));
// };

// // DID NOT USE DO FAR
// apiService.updateCocktail = async (id, accessToken) => {
//   return fetch(`${BASE_URL}/${id}`, {
//     method: 'PUT',
//     credentials: 'include',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${accessToken}`,
//     },
//     body: JSON.stringify(body),
//   })
//     .then(res => res.json())
//     .catch(err => console.log(err));
// };

// // DID NOT USE DO FAR
// apiService.deleteCocktail = async (id, accessToken) => {
//   return await fetch(`${BASE_URL}/${id}`, {
//     method: 'DELETE',
//     credentials: 'include',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${accessToken}`,
//     },
//   })
//     .then(res => res.json())
//     .catch(err => console.log(err));
// };

export default apiService;
