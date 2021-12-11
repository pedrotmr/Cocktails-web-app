describe('Complete end to end tests', () => {
  it('Tests login, update, favorite, and deleting drinks', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Sign In').click();
    cy.contains('Sign in to your account')
    cy.findByPlaceholderText('Enter your email address')
      .type('BANANA@gmail.com')
    cy.findByPlaceholderText('Password')
    .type('banana')
    cy.findByRole('button', { name: 'Continue'}).click()
    cy.contains('Welcome back banana!');
    cy.contains('Cocktails').click()
    cy.get('[alt="Brandy Alexander"]').first().click()
    cy.get('.drink-modal__like').click()
    cy.wait(1000);
    cy.contains('My Bar').click()
    cy.get('[alt="Brandy Alexander"]').last().click()
    cy.get('.drink-modal__like').click()
    cy.reload()
    cy.contains('Brandy Alexander').should('not.exist');
    cy.contains('Post a Drink').click();
    cy.findByPlaceholderText('Name your cocktail...')
    .type('New one')
    cy.findByPlaceholderText('Specify the ingredients...')
    .type('None')
    cy.findByPlaceholderText('Give the instructions...')
    .type('None')
    cy.findByRole('button', { name: 'Submit'}).click()
    cy.url().should('include', '/profile')
    cy.get('.myDrinks').within(() => {
      cy.get('[alt="New one"]').click()
      cy.findByRole('button', { name: 'Update Drink'}).click()
    })
    cy.url().should('include', 'updateDrink')

    cy.findByPlaceholderText('Name your cocktail...')
      .type('2')
    cy.findByRole('button', { name: 'Submit'}).click()
    cy.get('.myDrinks').within(() => {
      cy.get('[alt="New one2"]').click()
      cy.findByRole('button', { name: 'Delete'}).click()
    })
    cy.contains('New one2').should('not.exist');
  })
  it.only('Tests for search-bar and spirits page', () => {
    cy.visit('http://localhost:3000');
    cy.findByPlaceholderText('Search cocktails by ingredients...')
      .type('gin {enter}')
    cy.contains('Gin Fizz')
    cy.contains('Gin Sour')
    cy.findByPlaceholderText('Search cocktails by ingredients...')
    .type('Moscow Mule {enter}')
    cy.get('.search-bar-carrousel').within(() =>{
      cy.contains('Moscow Mule')
      cy.get('[alt="Moscow Mule"]').click()
      cy.get('.drink-modal__like').click()
      cy.contains('Please sign in to save drinks')
      cy.get('.global-bg').click({force:true})
    })
    cy.get('.row__image--1').click()
    cy.url().should('include', 'vodka')
    cy.contains('155 Belmont')
    cy.contains('501 Blue')
    cy.contains('Whiskey').click()
    cy.contains('Allegheny')
    cy.contains('Bourbon Sling')
    cy.contains('juicy').click()
    cy.contains('Get started').click()
    cy.url().should('include', 'register')
  })
})