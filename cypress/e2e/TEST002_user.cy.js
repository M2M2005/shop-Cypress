describe('User Management Tests', () => {
    it('Création d\'un compte utilisateur', () => {
        cy.commands.register.inscription(
            cy.dataSet.users.user2.pseudo,
            cy.dataSet.users.user2.login,
            cy.dataSet.users.user2.password
        )
    })

    it('Vérification des informations sur la page profil', () => {
        cy.commands.profil.goToProfil()
        cy.commands.profil.checkInformation(
            cy.dataSet.users.user2.pseudo,
            cy.dataSet.users.user2.login
        )
    })

    it('Déconnexion de l\'utilisateur', () => {
        cy.commands.deconnexion()
    })

    it('Reconnexion avec le compte créé', () => {
        cy.commands.login.connexion(
            cy.dataSet.users.user2.login,
            cy.dataSet.users.user2.password
        )
        cy.commands.profil.goToProfil()
        cy.commands.profil.checkInformation(
            cy.dataSet.users.user2.pseudo,
            cy.dataSet.users.user2.login
        )
    })

    it('Modification du pseudo de l\'utilisateur', () => {
        let newPseudo = cy.dataSet.users.user2.pseudo + '-updated'

        cy.commands.profil.updateInformation(newPseudo)
        cy.commands.profil.checkInformation(
            newPseudo,
            cy.dataSet.users.user2.login
        )
    })

    it('Modification de l\'utilisateur par l\'admin', () => {
        cy.commands.deconnexion()
        cy.commands.login.connexion(
            cy.dataSet.users.admin.login,
            cy.dataSet.users.admin.password
        )
        cy.commands.admin.goToDashboardAdmin()
        cy.commands.admin.usersManage.goToUsersManage()

        let newPseudoAdmin = cy.dataSet.users.user2.pseudo + '-admin-edit'
        cy.commands.admin.usersManage.editUser(cy.dataSet.users.user2.login, newPseudoAdmin)
        cy.commands.admin.usersManage.checkUserInTable(newPseudoAdmin, cy.dataSet.users.user2.login)
    })

    it('Suppression de l\'utilisateur par l\'admin', () => {
        cy.commands.admin.usersManage.deleteUser(cy.dataSet.users.user2.login)
    })
});
