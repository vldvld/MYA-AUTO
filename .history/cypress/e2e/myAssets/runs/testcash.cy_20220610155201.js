import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Creating Cash account', function () {
  const mainpage = new MainPage()
  const myfinance = new myFinance()
  const currency = 'USD '
  const newValue = Number("1000")
  const internationalNumberFormat = new Intl.NumberFormat('en-US')

  const name = () => Cypress._.random(0, 1e6)
  const id = name()
  const testName = "AUTOMATEDCASH #" + `${id}`



  it('Go to the MyFinance page and create the Cash account', function () {
    cy.goToLoginPage()
    cy.loginCommand("automationtests5@gmail.com", "testuser1")
    mainpage.homePageUrl()

    myfinance.cbValueWidget().should('eq', 'USD 0', { timeout: 40000 })
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

    // cy.wait(10000) //I use this wait to prevent the 0 asset balance issue 
   

  
    cy.contains('My Net Worth').should('exist')

    myfinance.cbValueWidget().then($widgetvalue => {
      const widgetvaluetext = $widgetvalue.text().replace(currency, "");
      cy.log(widgetvaluetext)
      cy.wrap(widgetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapvalue')
    })

    myfinance.cbLiabilityWidget().then($widgetliability => {
      const widgetliabilitytext = $widgetliability.text().replace(currency, "")
      cy.log(widgetliabilitytext)
      cy.wrap(widgetliabilitytext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapliability')
    })

    myfinance.cbNetValueWidget().then($widgetnetvalue => {
      const widgetnetvaluetext = $widgetnetvalue.text().replace(currency, "")
      cy.log(widgetnetvaluetext)
      cy.wrap(widgetnetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapnetvalue')
    })


  myfinance.cashAccountCreatedNotification().should('exist')
  myfinance.transactionCreatedNotification().should('exist')

  })

  it('Check the value widget', function() {
    cy.log('wrap result is ' +this.wrapvalue)
    const wrapvalueconst = Number(this.wrapvalue) + newValue
    cy.log(wrapvalueconst)
  

    myfinance.cbValueWidget().should('have.text', currency + internationalNumberFormat.format(wrapvalueconst))
  
})

  it('Check the liability widget', function() {
    cy.log('wrap result is ' +this.wrapliability)

    const wrapliabilityconst = Number(this.wrapliability)
    cy.log(wrapliabilityconst)
    
    myfinance.cbLiabilityWidget().should('have.text', currency + '(' + internationalNumberFormat.format(wrapliabilityconst) + ')' )   

  })

  it('Check the Net value widget', function() {
    cy.log('wrap result is ' +this.wrapnetvalue)

    const wrapnetvaluetyconst = Number(this.wrapnetvalue) - newValue
    cy.log(wrapnetvaluetyconst)
    
    myfinance.cbNetValueWidget().should('have.text', currency + '(' + internationalNumberFormat.format(wrapnetvaluetyconst) + ')' )   

  })




  })
