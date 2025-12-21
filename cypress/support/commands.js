export const commands = {
    connexion(login, password) {
        cy.visit('/')
        cy.get('a[href="/login"]').click()
        cy.get('input[id=email]').type(login)
        cy.get('input[id=password]').type(password)
        cy.get('button[type="submit"]').click()
        cy.wait(2000)
    },

    deconnexion() {
        cy.get('button[data-testid="header-user-menu-button"]').click()
        cy.get('button[data-testid="header-signout-button"]').click()
        cy.wait(2000)
    },

    goToDashboardAdmin() {
        cy.get('a[href="/admin"]').should("be.visible").click()
    },

    creerProduit(produit) {
        cy.get('button[data-testid="admin-dashboard-manage-products-button"]').click()
        cy.get('button[data-testid="admin-products-new-product-button"]').click()

        cy.get('input[data-testid="admin-products-name-input"]').type(produit.name)
        cy.get('textarea[data-testid="admin-products-description-input"]').type(produit.description)
        cy.get('input[data-testid="admin-products-purchase-price-input"]').type(produit.price)
        cy.get('input[data-testid="admin-products-margin-rate-input"]').clear().type(produit.margin)
        cy.get('input[data-testid="admin-products-stock-input"]').type(produit.stock)
        cy.get('input[data-testid="admin-products-category-input"]').type(produit.category)

        cy.get('input[data-testid="admin-products-image-input"]').selectFile(produit.img, { force: true })
        cy.wait(2000)

        cy.get('button[data-testid="admin-products-submit-button"]').click()
    }
}


