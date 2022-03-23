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

describe('Creating an Other asset', function () 
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

   it('Log in, go to the contacts page, create a new contact', function()
    {
        cy.goToLoginPage()
        cy.loginCommand("automationtests3@gmail.com", "testuser1")
        mainpage.homePageUrl()

        mainpage.goToDocumentVault().click()
        cy.url().should('eq', `${Cypress.config().baseUrl}documents/list`)
        documentstorage.plusButton().click()
    //    documentstorage.modalTitle().should('eq','Asset')
    //  documentstorage.assetType().click()
        documentstorage.skipButton().click()
        cy.contains('Drop files here or chose files').should('exist')
        cy.contains('Storage space 0%').should('exist')
        documentstorage.uploadButton().should('be.disabled')
        documentstorage.dropFilesButton().trigger("click").trigger("click")
        cy.wait(3000)
        documentstorage.dropFilesButton().click().click()

        cy.fixture('Users/user/MYASSETSAUTOMATION/cypress/fixtures/example.json').as('logo')
        documentstorage.dropFilesButton().then(function(el) {
    return Cypress.Blob.base64StringToBlob(this.logo, 'example.json')
      .then(blob => {
        el[0].files[0] = blob
        el[0].dispatchEvent(new Event('change', {bubbles: true}))
      })
  })
    })  

//    it('test', () => {
//     cy.get('iframe').then(function ($ele) {
//         const myFile = $ele.contents().find(documentstorage.dropFilesButton())
//         const fileName = '000019.JPG'
//         cy.fixture(fileName).then((fileContent) => {
//           cy.wrap(myFile).attachFile(fileName, fileContent)
//         })
        
//     })

// })
        
    })  

        // it('Testing picture uploading', () => {
        //     cy.fixture('000019.JPG').then(fileContent => {
        //         documentstorage.dropFilesButton().attachFile({
        //             fileContent: fileContent.toString(),
        //             fileName: '000019.JPG',
        //             mimeType: 'image/jpg'
        //         });
        //     });
        // });


        // mycontacts.plusButton().click()
        // mycontacts.createButton().should('be.disabled')
        // mycontacts.firstName().type(testName).should('have.value', testName)
        // mycontacts.lastName().type('TEST_LAST_NAME').should('have.value', 'TEST_LAST_NAME').tab().type('{enter}')
        // cy.get('#menu-').contains('Supplier', { timeout: 30000 }).click()
        // mycontacts.companyField().type('QA').should('have.value', 'QA')
        // mycontacts.positionField().type('QA_ENGINEER').should('have.value', 'QA_ENGINEER')
        // mycontacts.emailField().type('QA_ENGINEER@TESTMAIL.COM').should('have.value', 'QA_ENGINEER@TESTMAIL.COM')
        // mycontacts.phoneField().type('+380999999999').should('have.value', '+380999999999')
        // mycontacts.addressSearchField().type('London')
        // mycontacts.createButton().click()
        // mycontacts.contactCreatedNotification().should('exist')
        // cy.contains(testName+' TEST_LAST_NAME').should('exist')

    

