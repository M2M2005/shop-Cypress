export const commands = {

    deconnexion() {
        cy.get('button[data-testid="header-user-menu-button"]').click()
        cy.get('button[data-testid="header-signout-button"]').click()
        cy.wait(2000)
    },

    login: {
        connexion(login, password) {
            cy.visit('/')
            cy.get('a[href="/login"]').click()
            cy.get('input[id=email]').type(login)
            cy.get('input[id=password]').type(password)
            cy.get('button[type="submit"]').click()
            cy.wait(2000)
        },
    },

    register: {
        inscription(pseudo, email, password) {
            cy.visit('/')
            cy.get('a[href="/register"]').click()
            cy.get('input[id=name]').type(pseudo)
            cy.get('input[id=email]').type(email)
            cy.get('input[id=password]').type(password)
            cy.get('input[id=confirmPassword ]').type(password)
            cy.get('button[type="submit"]').click()
            cy.wait(2000)
        },
    },

    profil: {
        goToProfil() {
            cy.get('button[data-testid="header-user-menu-button"]').should("be.visible").click()
            cy.get('a[data-testid="header-profile-link"]').should("be.visible").click()
        },

        checkInformation(pseudo, email) {
            cy.get('input[data-testid="profile-name-input"]').should('have.value', pseudo)
            cy.get('input[data-testid="profile-email-input"]').should('have.value', email)
        },

        updateInformation(newPseudo, currentPassword, newPassword) {
            cy.get('input[data-testid="profile-name-input"]').clear().type(newPseudo)

            if (currentPassword && newPassword) {
                cy.get('input[data-testid="profile-current-password-input"]').type(currentPassword)
                cy.get('input[data-testid="profile-new-password-input"]').type(newPassword)
                cy.get('input[data-testid="profile-confirm-password-input"]').type(newPassword)
            }

            cy.get('button[data-testid="profile-submit-button"]').click()
            cy.wait(2000)
        },
    },

    admin: {
        goToDashboardAdmin() {
            cy.get('a[href="/admin"]').should("be.visible").click()
        },

        checkInformation(quantity, price, pseudo, email, statut) {
            let total = quantity * price
            let date = new Date().toLocaleDateString()

            cy.get('tbody tr:nth-child(1)').contains(pseudo).should('be.visible')
            cy.get('tbody tr:nth-child(1)').contains(email).should('be.visible')
            cy.get('tbody tr:nth-child(1)').contains(total).should('be.visible')
            cy.get('tbody tr:nth-child(1)').contains(statut).should('be.visible')
            cy.get('tbody tr:nth-child(1)').contains(date).should('be.visible')
        },

        clickManageOrderModalButton() {
            cy.get('tbody tr:nth-child(1) button[data-testid="admin-dashboard-manage-order-button"]').click()
        },

        checkInformationManageOrderModal(quantity, price, pseudo, email) {
            let total = quantity * price

            cy.get('div[id="ManageOrderModal"]').contains(pseudo).should('be.visible')
            cy.get('div[id="ManageOrderModal"]').contains(email).should('be.visible')
            cy.get('div[id="ManageOrderModal"]').contains(quantity).should('be.visible')
            cy.get('div[id="ManageOrderModal"]').contains(price).should('be.visible')
            cy.get('div[id="ManageOrderModal"]').contains(total).should('be.visible')
        },

        changeOrderStatus(status) {
            switch (status) {
                case "En attente":
                    cy.get('button[data-testid="admin-dashboard-update-status-pending-button"]').click()
                    break;
                case "Validation payment":
                    cy.get('button[data-testid="admin-dashboard-update-status-payment_validated-button"]').click()
                    break;
                case "Livré":
                    cy.get('button[data-testid="admin-dashboard-update-status-delivered-button"]').click()
                    break;
            }
            cy.wait(2000)
        },

        deleteOrder() {
            cy.on('window:confirm', () => true)
            cy.get('tbody tr:nth-child(1) button[data-testid="admin-dashboard-delete-order-button"]').click()
            cy.wait(2000)
        },

        usersManage: {
            goToUsersManage() {
                cy.get('button[data-testid="admin-dashboard-manage-users-button"]').click()
            },

            editUser(email, newName, newRole) {
                cy.contains('tbody tr', email).find('button[data-testid="admin-users-edit-button"]').click()
                cy.wait(1000)

                if (newName) {
                    cy.get('input[data-testid="admin-users-name-input"]').clear().type(newName)
                }

                if (newRole) {
                    cy.get('select[data-testid="admin-users-role-select"]').select(newRole)
                }

                cy.get('button[data-testid="admin-users-submit-button"]').click()
                cy.wait(2000)
            },

            checkUserInTable(name, email, role) {
                cy.contains('tbody tr', email).within(() => {
                    cy.contains(name).should('be.visible')
                    cy.contains(email).should('be.visible')
                    if (role) {
                        cy.contains(role).should('be.visible')
                    }
                })
            },

            deleteUser(email) {
                cy.on('window:confirm', () => true)
                cy.contains('tbody tr', email).find('button[data-testid="admin-users-delete-button"]').click()
                cy.wait(2000)
            }
        },

        productsManage: {
            goToProductsManage() {
                cy.get('button[data-testid="admin-dashboard-manage-products-button"]').click()
            },

            creerProduit(produit) {
                cy.get('button[data-testid="admin-products-new-product-button"]').click()

                cy.get('input[data-testid="admin-products-name-input"]').type(produit.name)
                cy.get('textarea[data-testid="admin-products-description-input"]').type(produit.description)
                cy.get('input[data-testid="admin-products-purchase-price-input"]').type(produit.price)
                cy.get('input[data-testid="admin-products-margin-rate-input"]').clear().type(produit.margin)
                cy.get('input[data-testid="admin-products-stock-input"]').type(produit.stock)
                cy.get('input[data-testid="admin-products-category-input"]').type(produit.category)

                cy.get('input[data-testid="admin-products-image-input"]').selectFile(produit.img, {force: true})
                cy.wait(2000)

                cy.get('button[data-testid="admin-products-submit-button"]').click()
            },

            deleteProduit(name) {
                cy.on('window:confirm', () => true)
                cy.get('tbody tr:nth-child(1) button[data-testid="admin-products-delete-button"]').click()
                cy.wait(2000)
            }
        },
    },

    products: {
        selectProduct(name) {
            cy.get('h3').contains(name).click()
        },

        addCart(quantity) {
            for (let i = 1; i < quantity; i++) {
                cy.get('button[data-testid="product-quantity-increase"]').click()
            }
            cy.get('button[data-testid="product-add-to-cart-button"]').click()
        },
    },

    cart: {
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

    checkout: {
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

        success: {
            checkSuccess() {
                cy.get('h1').contains("Commande confirmée !").should('be.visible')
            },

            backToHome() {
                cy.get('a[data-testid="checkout-home-button"]').click()
            }
        }
    },
}


