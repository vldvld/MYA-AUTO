import Login from '../../../pageObjects/login'
import Signup from '../../../pageObjects/signup'
import Mainpage from '../../../pageObjects/mainPage'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

const login = new Login()
const signup = new Signup()
const mainpage = new Mainpage()

const defaultFirebaseTimeout = 30000
// Create random email and use it for the registration and login flows
const uuid = () => Cypress._.random(0, 1e6)
const id = uuid()
const testemail = `testStripeEmail${id}` + "@nonexistentdomain.com"
const password = 'testuser1'

describe('Go to the login page and check the list of a valid stripe cards', function () {
    it('Go to the login page', function () {
        cy.goToLoginPage()
        cy.title().should('eq', 'MyAssets.com - The Best Life Organisational Tool')
    })
    it('Create a new user, log the created user credentials', function () {
        signup.createNewAccountButton().click()
        signup.userName().type('VISA').should('have.value', 'VISA')
        signup.email().type(testemail).should('have.value', testemail)
        signup.submitButton().should('be.disabled')
        signup.password().should('not.be.disabled').type(password).should('have.value', password)
        signup.termsCheckBox().click()
        signup.submitButton().click()
        cy.log('Created a new user, email:' + testemail + ', password:' + password )
        cy.contains('Choose your plan')
    })

    // it('Log in using created credentials to unsubsribed account', function () {
    //     login.email().type(testemail).should('have.value', testemail)
    //     login.password().should('not.be.disabled').type(password).should('have.value', password)
    //     login.submitButton().click()
    //     cy.get('[type="radio"], [value="200"]', { timeout: defaultFirebaseTimeout }).should('exist')
    //     signup.nextButton().trigger('mouseover').trigger('click')
    //     cy.log(Cypress.config().baseUrl)
    //     cy.url().should('eq', `${Cypress.config().baseUrl}`)
    // })
    // it('Test the Annual subscription flow', function () {
    //     signup.stripeEmail().type(testemail, { timeout: defaultFirebaseTimeout }).should('have.value', testemail)
    //     signup.stripeCard().type('4242424242424242', { timeout: defaultFirebaseTimeout })
    //     signup.stripeExpDate().type('1232', { timeout: defaultFirebaseTimeout })
    //     signup.stripeCvc().type('987', { timeout: defaultFirebaseTimeout })
    //     signup.stripePostal().type('12345', { timeout: defaultFirebaseTimeout })
    //     signup.subscribeButton().click()
    //     cy.contains('Your account is ready!', { timeout: defaultFirebaseTimeout }).should('exist')
    //     cy.contains('Start MyAssets').click()
    //     cy.contains('Welcome to MyAssets', { timeout: defaultFirebaseTimeout }).should('exist')
    //     cy.contains(/No Data To Display/, { timeout: defaultFirebaseTimeout })
    //     cy.wait(500)
    //     signup.selectButton({ timeout: defaultFirebaseTimeout }).trigger("click")
    // })
    // it('Test the Logout feature', function () {
    //     mainpage.personalAccountMenu().should('not.be.disabled', { timeout: defaultFirebaseTimeout }).click()
    //     cy.contains('Personal Account').should('exist')
    //     mainpage.signOut().click()
    //     mainpage.homePageUrl()
    // })
    // it('Log in using created credentials using a prepared subscribed account', function () {
    //     cy.goToLoginPage()
    //     login.email().type(testemail).should('have.value', testemail)
    //     login.password().type(password).should('have.value', password)
    //     login.submitButton().click()
    //     mainpage.homePageUrl()
    // })
    // it('Account settings - Check the default user settings', function () {
    //     mainpage.personalAccountMenu().click()
    //     mainpage.accountSettings().click()
    //     cy.contains('TestAutoFirstName').should('exist')
    //     cy.contains(testemail).should('exist')
    //     cy.contains('USD').should('exist')
    //     cy.contains('50,015,000.00').should('exist')
    //     cy.contains('EN').should('exist')
    //     cy.contains('MM/DD/YYYY').should('exist')
    // })
    // it('Billing and Subscription - Check the default user settings', function () {
    //     mainpage.personalAccountMenu().click()
    //     mainpage.billingAndSubscription().click()
    //     cy.contains('Annual plan').should('exist')
    //     cy.contains('USD 200 per year').should('exist')
    //     cy.contains('Trial').should('exist')
    //     cy.contains('4242').should('exist')
    //     cy.contains(testemail).should('exist')
    // })
    // it('Logout', function () {
    //     mainpage.personalAccountMenu().click()
    //     mainpage.signOut().click()
    //     mainpage.homePageUrl()
    // })
})