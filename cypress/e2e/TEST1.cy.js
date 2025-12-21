describe('Shop Application Tests', () => {

    it('Connexion Admin', () => {
        cy.commands.connexion(cy.getConfig().users.admin.login, cy.getConfig().users.admin.password);
    })

    it('Création d\'une commande dans le dashboard Admin', () => {
        cy.commands.goToDashboardAdmin();
        cy.commands.creerProduit(cy.getConfig().products[0]);
    })

    it('Connexion Users', () => {
        cy.commands.deconnexion();
        cy.commands.connexion(cy.getConfig().users.user1.login, cy.getConfig().users.user1.password);
    })
})