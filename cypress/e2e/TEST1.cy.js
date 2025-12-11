describe('Shop Application Tests', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Connexion Admin', () => {
        const admin = Cypress.env('users').admin;
        cy.get('a[href="/login"]').click();
        cy.get('input[id=email]').type(admin.login);
        cy.get('input[id=password]').type(admin.password);
        cy.get('button[type="submit"]').click();
    })

})
