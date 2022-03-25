import Login from '../../../pageObjects/login'
import Signup from '../../../pageObjects/signup'
import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'
import myProperty from '../../../pageObjects/myProperty'
import myCollection from '../../../pageObjects/myCollection'
import myBelongings from '../../../pageObjects/myBelongings'
import myContacts from '../../../pageObjects/myContacts'
import documentStorage from '../../../pageObjects/documentStorage'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Document Storage page test`s', function () 
{
    const login = new Login()
    const signup = new Signup()
    const mainpage = new MainPage()
    const myfinance = new myFinance()
    const myproperty = new myProperty()
    const mycollection = new myCollection()
    const mybelongings = new myBelongings()
    const mycontacts = new myContacts()
    const documentstorage = new documentStorage()

   it('Go to the Document storage page and add a tests documents', function()
    {
        cy.goToLoginPage()
        cy.loginCommand("automationtests3@gmail.com", "testuser1")
        mainpage.homePageUrl()

        mainpage.goToDocumentVault().click()
        cy.url().should('eq', `${Cypress.config().baseUrl}documents/list`)
        documentstorage.plusButton().click()
        documentstorage.skipButton().click()

        cy.contains('Drop files here or chose files').should('exist')
        cy.contains('Storage space 0%').should('exist')
        documentstorage.uploadButton().should('be.disabled')

        documentstorage.dropFilesButton().attachFile('png-test.png', { subjectType: 'drag-n-drop' })
        documentstorage.dropFilesButton().attachFile('pdf-test.pdf', { subjectType: 'drag-n-drop' })
    //  documentstorage.dropFilesButton().attachFile('mp4-test.mp4', { subjectType: 'drag-n-drop' })
        documentstorage.dropFilesButton().attachFile('jpg-test.jpg', { subjectType: 'drag-n-drop' })
        documentstorage.dropFilesButton().attachFile('doc-test.doc', { subjectType: 'drag-n-drop' })

        cy.contains('png-test.png', { timeout: 10000 }).should('exist')
        cy.contains('0.0210 MB').should('exist')
        cy.contains('pdf-test.pdf', { timeout: 10000 }).should('exist')
        cy.contains('5.32 MB').should('exist')
        cy.contains('jpg-test.jpg', { timeout: 10000 }).should('exist')
        cy.contains('0.0305 MB').should('exist')
        cy.contains('doc-test.doc', { timeout: 10000 }).should('exist')
        cy.contains('0.192 MB').should('exist')
        cy.contains('Storage space 5.57%').should('exist')

        documentstorage.uploadButton().should('be.enabled').click()
        documentstorage.documentAddedNotification().should('exist')
    })   
    })  

    

