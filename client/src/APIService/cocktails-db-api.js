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
    .then(res => {
      console.log(res, 'status')
      if (res.status === 406) return false
      else return res
    })
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
    .then(res => {
      console.log(res, 'this is the res')
      return res
    })
    .catch(err => console.log(err, 'this is the error'));
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
    .then(res => {
      setState && setState(res)
      return res
    })
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

apiService.getAllMyCocktails = async (setState, accessToken) => {
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
    .then(res => {
      if (res.status === (401 || 403)) return true
      else {
        setState(res)
        return res
      }
    })
    .catch(err => console.log(err));
};

apiService.createCocktail = async (cocktail, accessToken) => {
  return fetch(`${BASE_URL}/`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(cocktail),
  })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
      return err;
    });
};

apiService.updateCocktail = async (id, accessToken, cocktail) => {
  return fetch(`${BASE_URL}/myCocktails/${id}`, {
    method: 'PUT',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(cocktail),
  })
    .then(res => res.json())
    .then(res => res)
    .catch(err => console.log(err));
};

apiService.deleteCocktail = async (id, accessToken) => {
  return await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
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

export default apiService;
