import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'

const mainpage = new MainPage()
const myfinance = new myFinance()
const currency = 'USD '
const newValue = 1000
const internationalNumberFormat = new Intl.NumberFormat('en-US')

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Go to the cryptocurrency dashboard page and create a new crypto account', function () {


  it('Collect a values from the collectables widgets', function () {
    cy.goToLoginPage()
    cy.loginCommand("automatedtests@gmai.com", "automatedtests@gmai.com")
    mainpage.homePageUrl()

    mainpage.goToMyFinance().click()
    cy.contains('Cryptocurrencies').click()
})
})