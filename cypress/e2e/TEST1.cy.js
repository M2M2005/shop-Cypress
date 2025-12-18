describe('Shop Application Tests', () => {

    it('Connexion Admin', () => {
        cy.commands.connexion(cy.getConfig().users.admin.login, cy.getConfig().users.admin.password)
    })

    it('Création d\'une commande dans le dashboard Admin', () => {
        cy.commands.goToDashboardAdmin()
        cy.commands.creerProduit(cy.getConfig().products[0])
    })
})