describe('Shop Application Tests', () => {
    let quantity = 3
    let price = cy.dataSet.products[0].price * ((cy.dataSet.products[0].margin / 100) + 1)

    it.skip('Création d\'une commande dans le dashboard Admin', () => {
        cy.commands.login.connexion(cy.dataSet.users.admin.login, cy.dataSet.users.admin.password)
        cy.commands.admin.goToDashboardAdmin()
        cy.commands.admin.productsManage.goToProductsManage()
        cy.commands.admin.productsManage.creerProduit(cy.dataSet.products[0])
    })

    it.skip('Sélectionnez le produit créer en tant que User', () => {
        // cy.commands.deconnexion()
        cy.commands.login.connexion(cy.dataSet.users.user1.login, cy.dataSet.users.user1.password)

        cy.commands.cart.selectProduct(cy.dataSet.products[0].name)
        cy.commands.cart.addCart(quantity)
    })

    it.skip('Passer la commande', () => {
        cy.commands.cart.open()
        cy.commands.cart.checkInformation(quantity, cy.dataSet.products[0].name, price)
        cy.commands.cart.goToCheckOut()

        cy.commands.checkout.checkInformation(quantity, cy.dataSet.products[0].name, price, cy.dataSet.users.user1.pseudo, cy.dataSet.users.user1.login)
        cy.commands.checkout.buyOrder()

        cy.commands.checkout.success.checkSuccess()
        cy.commands.checkout.success.backToHome()
    })

    it('Vérification commande dans le dashboard Admin', () => {
        // cy.commands.deconnexion()
        cy.commands.login.connexion(cy.dataSet.users.admin.login, cy.dataSet.users.admin.password)

        cy.commands.admin.goToDashboardAdmin()
        cy.commands.admin.checkInformation(quantity, cy.dataSet.products[0].name, price, cy.dataSet.users.user1.pseudo, cy.dataSet.users.user1.login)
    })
});