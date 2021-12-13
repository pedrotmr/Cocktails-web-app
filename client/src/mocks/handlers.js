import { rest } from 'msw';

export const handlers = [
  // Handles a POST /login request
  rest.post('http://localhost:3001/login', (req, res, ctx) => {
    sessionStorage.setItem('accessToken', 'successfulLogin');
    return res(ctx.status(200), ctx.json({ accessToken: 'successfulLogin' }));
  }),
  rest.get('http://localhost:3001/', (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem('accessToken');
    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        name: 'justin',
      })
    );
  }),
  rest.post('http://localhost:3001/register', (req, res, ctx) => {
    sessionStorage.setItem('accessToken', 'successfulCreation');
    return res(ctx.status(200), ctx.json({ accessToken: 'successfulCreation' }));
  }),

  rest.get('http://localhost:3001/myCocktails', (req, res, ctx) => {
    const isAuthenticated = sessionStorage.getItem('accessToken');
    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        })
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        name: 'test-name',
        ingredients: 'test-ingredients',
        instructions: 'test-instructions',
        picture: 'test-picture',
      })
    );
  }),

  rest.get('http://localhost:3001/cocktails', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          name: 'test-name',
          ingredients: 'test-ingredients',
          instructions: 'test-instructions',
          picture: 'test-picture',
        },
      ])
    );
  }),

  rest.delete('http://localhost:3001/myCocktails/:id', (req, res, ctx) => {
    const isAuthenticated = sessionStorage.getItem('accessToken');
    const { id } = req.params;
    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        })
      );
    }
    if (!id) {
      return res(
        ctx.status(404),
        ctx.json({
          errorMessage: 'Id is required',
        })
      );
    }
    return res(ctx.status(201), ctx.json({ message: 'cocktail removed' }));
  }),

  rest.put('http://localhost:3001/myCocktails/:id', (req, res, ctx) => {
    const isAuthenticated = sessionStorage.getItem('accessToken');
    const { id } = req.params;
    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        })
      );
    }
    if (!id) {
      return res(
        ctx.status(404),
        ctx.json({
          errorMessage: 'Id is required',
        })
      );
    }

    return res(
      ctx.status(201),
      ctx.json({
        name: 'test-name-changed',
        ingredients: 'test-ingredients-changed',
        instructions: 'test-instructions-changed',
        picture: 'test-picture-changed',
      })
    );
  }),

  rest.get('http://localhost:3001/cocktail/:id', (req, res, ctx) => {
    const { id } = req.params;
    if (!id) {
      return res(
        ctx.status(404),
        ctx.json({
          errorMessage: 'Id is required',
        })
      );
    }
    return res(
      ctx.status(201),
      ctx.json({
        name: 'test-name',
        ingredients: 'test-ingredients',
        instructions: 'test-instructions',
        picture: 'test-picture',
      })
    );
  }),

  rest.get(`https://www.thecocktaildb.com/api/json/v2/1//filter.php`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        drinks: [
          {
            name: 'test-name',
            ingredients: 'test-ingredients',
            instructions: 'test-instructions',
            picture: 'test-picture',
          },
        ],
      })
    );
  }),
  rest.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        drinks: [
          {
            name: 'test-name',
            ingredients: 'test-ingredients',
            instructions: 'test-instructions',
            picture: 'test-picture',
          },
        ],
      })
    );
  }),
];
