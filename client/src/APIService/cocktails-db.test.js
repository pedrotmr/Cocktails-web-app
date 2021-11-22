import apiService from './cocktails-db-api';

describe('tests for all db interactions', () => {

  describe('tests for all user-db interactions', () => {

  })


  let accessToken;
  describe('tests for all cocktail-db interactions', () => {

  // beforeAll( async() => {
  //   accessToken = await apiService.login({email:'BANANA@gmail.com', password:'banana'});

  // }, 100000)
    describe('should properly create a cocktail', () => {
    
      test('should reject if not provided a name, ingredients, instructions or a picture', async() => {
        //const cocktail = await apiService.createCocktail({name:'frank', ingredients:'some'});
        accessToken = await apiService.login({email:'BANANA@gmail.com', password:'banana'});
        console.log(accessToken, 'access token from test')
      }, 10000) 

    })
    test('should properly update a cocktail', async() => {

    })
    test('should properly get a user made cocktail based on user id', async() => {

    })
    test('should properly get all cocktails made by all users', async() => {

    })
    test('should properly got all cocktails made by a specific user', async() => {

    })
    test('should properly delete a cocktail', async() => {

    })
  })
})