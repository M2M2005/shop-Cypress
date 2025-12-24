export const commands = {

    deconnexion() {
        cy.get('button[data-testid="header-user-menu-button"]').click()
        cy.get('button[data-testid="header-signout-button"]').click()
        cy.wait(2000)
    },

    login : {
        connexion(login, password) {
            cy.visit('/')
            cy.get('a[href="/login"]').click()
            cy.get('input[id=email]').type(login)
            cy.get('input[id=password]').type(password)
            cy.get('button[type="submit"]').click()
            cy.wait(2000)
        },
    },

    admin: {
        goToDashboardAdmin() {
            cy.get('a[href="/admin"]').should("be.visible").click()
        },

        products : {
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
            },
        },
    },

    products : {
        selectProduct(name){
            cy.get('h3').contains(name).click()
        },

        addCart(quantity){
            for (let i = 1; i < quantity; i++) {
                cy.get('button[data-testid="product-quantity-increase"]').click()
            }
            cy.get('button[data-testid="product-add-to-cart-button"]').click()
        },
    },

    cart : {
        open() {
            cy.get('a[data-testid="header-cart-link"]').click()
        },

        checkInformation(quantity, name, price) {
            cy.get('h3').contains(name).should('be.visible')
            cy.get('p').contains(price).should('be.visible')
            cy.get('span').contains(quantity).should('be.visible')
            let total = quantity * price
            cy.get('span').contains(total).should('be.visible')
        },

        goToCheckOut() {
            cy.get('button[data-testid="cart-checkout-button"]').click()
        }
    },

    checkout : {
        checkInformation(quantity, name, price, pseudo, email) {
            cy.get('p').contains(pseudo).should('be.visible')
            cy.get('p').contains(email).should('be.visible')

            cy.get('h3').contains(name).should('be.visible')
            cy.get('p').contains(price).should('be.visible')
            cy.get('p').contains(quantity).should('be.visible')
            let total = quantity * price
            cy.get('span').contains(total).should('be.visible')
        },

        buyOrder() {
            cy.get('button[data-testid="checkout-pay-button"]').click()
        },

        success : {
            checkSuccess() {
                cy.get('h1').contains("Commande confirmée !").should('be.visible')
            },

            backToHome () {
                cy.get('a[data-testid="checkout-home-button"]').click()
            }
        }
    },
}


