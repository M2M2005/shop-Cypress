describe('Shop Application Tests', () => {
    let quantity = 3
    let price = cy.dataSet.products[0].price * ((cy.dataSet.products[0].margin / 100) + 1)

    it('Création d\'une commande dans le dashboard Admin', () => {
        cy.commands.login.connexion(cy.dataSet.users.admin.login, cy.dataSet.users.admin.password)
        cy.commands.admin.goToDashboardAdmin()
        cy.commands.admin.productsManage.goToProductsManage()
        cy.commands.admin.productsManage.creerProduit(cy.dataSet.products[0])
    })

    it('Sélectionnez le produit créer en tant que User', () => {
        cy.commands.deconnexion()
        cy.commands.login.connexion(cy.dataSet.users.user1.login, cy.dataSet.users.user1.password)

        cy.commands.products.selectProduct(cy.dataSet.products[0].name)
        cy.commands.products.addCart(quantity)
    })

    it('Passer la commande', () => {
        cy.commands.cart.open()
        cy.commands.cart.checkInformation(quantity, cy.dataSet.products[0].name, price)
        cy.commands.cart.goToCheckOut()

        cy.commands.checkout.checkInformation(quantity, cy.dataSet.products[0].name, price, cy.dataSet.users.user1.pseudo, cy.dataSet.users.user1.login)
        cy.commands.checkout.buyOrder()

        cy.commands.checkout.success.checkSuccess()
        cy.commands.checkout.success.backToHome()
    })

    it('Vérification et suppression commande dans le dashboard Admin', () => {
        cy.commands.deconnexion()
        cy.commands.login.connexion(cy.dataSet.users.admin.login, cy.dataSet.users.admin.password)

        cy.commands.admin.goToDashboardAdmin()
        cy.commands.admin.checkInformation(quantity, price, cy.dataSet.users.user1.pseudo, cy.dataSet.users.user1.login, "En attente")
        cy.commands.admin.clickManageOrderModalButton()
        cy.commands.admin.checkInformationManageOrderModal(quantity, price, cy.dataSet.users.user1.pseudo, cy.dataSet.users.user1.login)
        cy.commands.admin.changeOrderStatus("Validation payment")

        cy.commands.admin.checkInformation(quantity, price, cy.dataSet.users.user1.pseudo, cy.dataSet.users.user1.login, "Validation payment")
        cy.commands.admin.clickManageOrderModalButton()
        cy.commands.admin.checkInformationManageOrderModal(quantity, price, cy.dataSet.users.user1.pseudo, cy.dataSet.users.user1.login)
        cy.commands.admin.changeOrderStatus("Livré")

        cy.commands.admin.checkInformation(quantity, price, cy.dataSet.users.user1.pseudo, cy.dataSet.users.user1.login, "Livré")
        cy.commands.admin.deleteOrder()
    })

    it('Suppression produit dans le dashboard Admin', () => {
        cy.commands.admin.productsManage.goToProductsManage()
        cy.commands.admin.productsManage.deleteProduit()
    })
});