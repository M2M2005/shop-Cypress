describe('Shop Application Tests', () => {
    const admin = Cypress.env('users').admin;
    const produit1 = Cypress.env('products[0]');

    it('Connexion Admin', () => {
        cy.visit('/')
        cy.get('a[href="/login"]').click();
        cy.get('input[id=email]').type(admin.login);
        cy.get('input[id=password]').type(admin.password);
        cy.get('button[type="submit"]').click();
    })

    it('Création d\'une commande dans le dashboard Admin' , () => {
        cy.get('a[href="/admin"]').should("be.visible").click();
        cy.get('button[data-testid="admin-dashboard-manage-users-button"]').click();
        cy.get('button[data-testid="admin-products-new-product-button"]').click();

        cy.get('input[data-testid="admin-products-name-input"]').type(produit1.name);
        cy.get('input[data-testid="admin-products-description-input"]').type(produit1.description);
        cy.get('input[data-testid="admin-products-purchase-price-input"]').type(produit1.price);
        cy.get('input[data-testid="admin-products-margin-rate-input"]').type(produit1.margin);
        cy.get('input[data-testid="admin-products-stock-input"]').type(produit1.stock);
        cy.get('input[data-testid="admin-products-category-input"]').type(produit1.category);
        cy.get('input[data-testid="admin-products-image-input"]').selectFile(produit1.img);

        cy.get('button[data-testid="admin-products-submit-button"]').click();
    })
})
