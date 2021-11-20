import { fetchAllDrinks, searchDrinks, fetchCocktail } from './cocktails-api';



const setFakeState = (param) => 'Hello';

test('fetchAllDrinks should return an array of drinks', async() => {
    const data = await fetchAllDrinks(['tequila', 'mezcal'], setFakeState);
    expect(Array.isArray(data)).toBe(true)
    expect(data[0].idDrink).not.toBe(null)
})

test('Search drinks should return an array of drinks within parameters', async() => {
  const data = await searchDrinks("vodka", setFakeState);
  expect(Array.isArray(data)).toBe(true);
  expect(data[0].idDrink).not.toBe(null);
})

test("Expect fetchCocktail with idDrink of 11001 to be old fashioned", async() => {
  const data = await fetchCocktail('11001')
  expect(data.data.drinks[0].strDrink).toBe("Old Fashioned")
})

