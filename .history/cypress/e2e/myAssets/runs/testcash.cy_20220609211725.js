import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Creating Cash account', function () {
  const mainpage = new MainPage()
  const myfinance = new myFinance()
  const currency = 'USD '
  const newValue = 1000
  const internationalNumberFormat = new Intl.NumberFormat('en-US')

  const name = () => Cypress._.random(0, 1e6)
  const id = name()
  const testName = "AUTOMATEDCASH #" + `${id}`



  it('Go to the MyFinance page and create the Cash account', function () {
    cy.goToLoginPage()
    cy.loginCommand("automationtests5@gmail.com", "testuser1")
    mainpage.homePageUrl()

    mainpage.goToMyFinance().click()
    myfinance.cashAndBankingTab().click()
    myfinance.myFinancePlusButton().click()
    cy.contains('Account').should('exist')
    myfinance.selectAccountDropDown().click()
    myfinance.selectCashAccont().click()
    myfinance.nextButton().click()
    mainpage.modalTitle().should('have.text', 'Cash')
    myfinance.accountNameField().type(testName)
    myfinance.balanceFieldCash().type(newValue).should('have.value', '1,000')

    cy.wait(1000) //I use this wait to prevent the 0 asset balance issue 
    
    myfinance.createButton().should('not.be.disabled').click()

    myfinance.cbValueWidget().invoke('text').as('CBvalue')
    myfinance.cbValueWidget().invoke('text').as('CBliability')
    myfinance.cbValueWidget().invoke('text').as('CBnetvalue')
    
    myfinance.cashAccountCreatedNotification().should('exist')
    myfinance.transactionCreatedNotification().should('exist')

  })
  it('values check', function () {
    cy.log(this.CBvalue)
    cy.log(this.CBliability)
    cy.log(this.CBnetvalue)
    })

  })
