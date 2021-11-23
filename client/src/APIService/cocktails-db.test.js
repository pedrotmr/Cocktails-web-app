import apiService from './cocktails-db-api';
const fakeSetState = () => 'Fake return';
const testCocktail = {
  name:'test-name',
  ingredients:'test-ingredients',
  instructions:'test-instructions',
  picture:'test-picture'
}
describe('tests for all db interactions', () => {

  describe('tests for all user-db interactions', () => {

    test('should log in user by creating access token', async() => {
      const status = await apiService.login({name:'BANANA@gmail.com', password:'banana'});
      expect(status.accessToken).not.toBe(null);
      expect(sessionStorage.accessToken).not.toBe(null)
    })

    test('should return users name', async() => {
      const  { name }  = await apiService.loadUser();
      expect(name).toBe('justin')
    })

    test('Should return access token when creating user', async () => {
      const { accessToken } = await apiService.register();
      expect(accessToken).not.toBe(null);
      expect(sessionStorage.accessToken).not.toBe(null);
    })

  })
  
  describe('tests for all cocktail-db interactions', () => {

    test('should properly update a cocktail', async() => {
      const accessToken = sessionStorage.getItem('accessToken');
      const updatedCocktail = await apiService.updateCocktail(1, accessToken, testCocktail);
      expect(updatedCocktail.name).not.toBe(testCocktail.name);
    })
    test('should properly get a user made cocktail based on user id', async() => {
      const accessToken = sessionStorage.getItem('accessToken');
      const cocktail = await apiService.getCocktail(1, accessToken);
      expect(cocktail.name).not.toBe(null);
    })
    test('should properly get all cocktails made by all users', async() => {
      const cocktailArray = await apiService.getAllUsersCocktails(fakeSetState);
      expect(Array.isArray(cocktailArray)).toBe(true);
      expect(cocktailArray[0].name).not.toBe(null);
    })
    test('should properly got all cocktails made by a specific user', async() => {
      const accessToken = sessionStorage.getItem('accessToken');
      const {name, ingredients, instructions, picture } = await apiService.getAllMyCocktails(fakeSetState, accessToken);
      expect(name && ingredients && instructions && picture).not.toBe(null); 
    })

    test('should properly delete a cocktail', async() => {
      const accessToken = sessionStorage.getItem('accessToken');
      const {message} = await apiService.deleteCocktail(1, accessToken)
      expect(message).toBe('cocktail removed')
    })
  })
})