describe('My First Test', () => {
  it('Visits cocktail-web-app', () => {
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
    cy.get('[alt="Brandy Alexander"]').click({multiple:true})
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
})