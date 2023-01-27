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

describe('Collect values from the each dashboard page and calculate a sum', function () {
  beforeEach(() => {
    cy.goToLoginPage()
    cy.loginCommand("mya-automated-tests@gmail.com", "mya-automated-tests@gmail.com")
    mainpage.homePageUrl()
  })

  it('Collect a values from the collectables widgets', function () {

    // wait for a full firebase API list loading
    myfinance.cbValueWidget().should('not.have.value', '0');
    mainpage.goToMyFinance().click()
    cy.contains('Cash & Banking').click()

    myfinance.cbValueWidget().then($widgetvalue => {
        const widgetvaluetext = $widgetvalue.text().replace(currency, "");
        cy.log(widgetvaluetext)
        cy.wrap(widgetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapFinanceValue')
      })
    cy.contains('Traditional Investments').click()

    myfinance.cbValueWidget().then($widgetvalue => {
        const widgetvaluetext = $widgetvalue.text().replace(currency, "");
        cy.log(widgetvaluetext)
        cy.wrap(widgetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapPortfolioValue')
      })

    mainpage.goToMyBelongings().click()
    myfinance.cbValueWidget().should('not.have.value', '0');
    myfinance.cbValueWidget().then($widgetvalue => {
        const widgetvaluetext = $widgetvalue.text().replace(currency, "");
        cy.log(widgetvaluetext)
        cy.wrap(widgetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapBelongingsValue')
      })
    mainpage.goToMyCollection().click()
    
    myfinance.cbValueWidget().should('not.have.value', '0');
    myfinance.cbValueWidget().then($widgetvalue => {
        const widgetvaluetext = $widgetvalue.text().replace(currency, "");
        cy.log(widgetvaluetext)
        cy.wrap(widgetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapCollectionValue')
      })
    mainpage.goToMyProperty().click()
    myfinance.cbValueWidget().should('not.have.value', '0');

    myfinance.cbValueWidget().then($widgetvalue => {
        const widgetvaluetext = $widgetvalue.text().replace(currency, "");
        cy.log(widgetvaluetext)
        cy.wrap(widgetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapPropertyValue')
      })

      mainpage.goToMyFinance().click()
      cy.contains('Cryptocurrencies').click()

      myfinance.cbValueWidget().then($widgetvalue => {
        const widgetvaluetext = $widgetvalue.text().replace(currency, "");
        cy.log(widgetvaluetext)
        cy.wrap(widgetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapCryptoValue')
      })

    
    mainpage.goToMyDashboard().click()

    myfinance.cbValueWidget().then($widgetvalue => {
        const widgetvaluetext = $widgetvalue.text().replace(currency, "");
        cy.log(widgetvaluetext)
        cy.wrap(widgetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapDashboardValue')
      })
      
  })

  it('Calculate values and compare the result of the MyFinance collectables Value widget ', function () {

    myfinance.cbValueWidget().should('not.have.value', '0');
    cy.log('wrap result is :' + 'Crypto value : ' + this.wrapCryptoValue + '. ' + 'C&B value : ' + this.wrapFinanceValue + '. ' + 'Belongings value: ' + this.wrapBelongingsValue + '. ' + 'MyCollection value: ' + this.wrapCollectionValue + '. ' + 'Property value: ' + this.wrapPropertyValue + '. ' + 'Portfolio value: ' + this.wrapPortfolioValue + '. ' + 'My dashboard total value: ' + this.wrapDashboardValue)
    const wrapvalueconst = Number(this.wrapFinanceValue) +  Number(this.wrapBelongingsValue) +  Number(this.wrapCollectionValue) +  Number(this.wrapPropertyValue) + Number(this.wrapPortfolioValue)
    cy.log(wrapvalueconst)
    expect(wrapvalueconst).to.equal(Number(this.wrapDashboardValue))
  })

})

