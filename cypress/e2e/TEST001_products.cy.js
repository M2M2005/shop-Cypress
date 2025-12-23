describe('Shop Application Tests', () => {
    let quantity = 3
    let price

    before(() => {
        price = cy.dataSet.products[0].price * ((cy.dataSet.products[0].margin / 100) + 1)
    })

    it.skip('Connexion Admin', () => {
        cy.commands.connexion(cy.dataSet.users.admin.login, cy.dataSet.users.admin.password)
    })

    it.skip('Création d\'une commande dans le dashboard Admin', () => {
        cy.commands.goToDashboardAdmin()
        cy.commands.creerProduit(cy.dataSet.products[0])
    })

    it('Connexion Users', () => {
        // cy.commands.deconnexion()
        cy.commands.connexion(cy.dataSet.users.user1.login, cy.dataSet.users.user1.password)
    })

    it('Sélectionnez le produit créer', () => {
        cy.commands.selectProduct(cy.dataSet.products[0].name)
        cy.commands.addCart(quantity)
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
});

it('test', function() {});