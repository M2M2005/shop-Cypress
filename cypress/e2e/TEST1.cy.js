describe('Shop Application Tests', () => {

    it('Connexion Admin', () => {
        cy.commands.connexion(cy.getConfig().users.admin.login, cy.getConfig().users.admin.password)
    })

    it('Création d\'une commande dans le dashboard Admin', () => {
        const produit1 = cy.getConfig().products[0]
        cy.commands.creerProduit(produit1)
    })
})
