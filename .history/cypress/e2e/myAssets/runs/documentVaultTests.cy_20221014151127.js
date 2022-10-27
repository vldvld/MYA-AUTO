import MainPage from '../../../pageObjects/mainPage'
import documentStorage from '../../../pageObjects/documentStorage'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Document Storage page tests', function () {
    const mainpage = new MainPage()
    const documentstorage = new documentStorage()

    it('Go to the Document storage page and add png/pdf/doc documents', function () {
        cy.goToLoginPage()
        cy.loginCommand("automatedassets7@gmail.com", "testuser1")
        mainpage.homePageUrl()

        mainpage.goToDocumentVault().click()
        cy.url().should('eq', `${Cypress.config().baseUrl}documents/list`)
        documentstorage.plusButton().click()
        documentstorage.skipButton().click()

        cy.contains('Drop file(s) here or choose file(s)').should('exist')
        cy.contains('Storage space 0%').should('exist')
        documentstorage.uploadButton().should('be.disabled')

        documentstorage.dropFilesButton().attachFile('png-test.png', { subjectType: 'drag-n-drop' })
        documentstorage.dropFilesButton().attachFile('pdf-test.pdf', { subjectType: 'drag-n-drop' })
        documentstorage.dropFilesButton().attachFile('doc-test.doc', { subjectType: 'drag-n-drop' })

        cy.contains('png-test.png', { timeout: 10000 }).should('exist')
        cy.contains('0.0210 MB').should('exist')
        cy.contains('pdf-test.pdf', { timeout: 10000 }).should('exist')
        cy.contains('0.0305 MB').should('exist')
        cy.contains('doc-test.doc', { timeout: 10000 }).should('exist')
        cy.contains('0.192 MB').should('exist')
        cy.contains('Storage space 0.244%').should('exist')

        documentstorage.uploadButton().should('be.enabled').click()
        documentstorage.documentAddedNotification().should('exist')
    })
})



