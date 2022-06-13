import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Collect values from the each dashboard page and calculate the sum', function () {
  const mainpage = new MainPage()
  const myfinance = new myFinance()
  const currency = 'USD '
  const newValue = 1000
  const internationalNumberFormat = new Intl.NumberFormat('en-US')

  it('Go to the MyFinance page and create the Cash account', function () {
    cy.goToLoginPage()
    cy.loginCommand("automationtests5@gmail.com", "testuser1")
    mainpage.homePageUrl()

   // cy.wait(10000)

     // wait for a full firebase API list loading
      cy.contains('Last updated: 06/13/2022', { timeout: 50000 }).should('exist')

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

    myfinance.cbValueWidget().then($widgetvalue => {
        const widgetvaluetext = $widgetvalue.text().replace(currency, "");
        cy.log(widgetvaluetext)
        cy.wrap(widgetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapBelongingsValue')
      })
    mainpage.goToMyCollection().click()

    myfinance.cbValueWidget().then($widgetvalue => {
        const widgetvaluetext = $widgetvalue.text().replace(currency, "");
        cy.log(widgetvaluetext)
        cy.wrap(widgetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapCollectionValue')
      })
    mainpage.goToMyProperty().click()

    myfinance.cbValueWidget().then($widgetvalue => {
        const widgetvaluetext = $widgetvalue.text().replace(currency, "");
        cy.log(widgetvaluetext)
        cy.wrap(widgetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapPropertyValue')
      })

    mainpage.goToMyDashboard().click()

    myfinance.cbValueWidget().then($widgetvalue => {
        const widgetvaluetext = $widgetvalue.text().replace(currency, "");
        cy.log(widgetvaluetext)
        cy.wrap(widgetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapDashboardValue')
      })
  })

  it('Check the value widget', function () {
    cy.log('wrap result is :' + 'C&B value : ' + this.wrapFinanceValue + '. ' + 'Belongings value: ' + this.wrapBelongingsValue + '. ' + 'MyCollection value: ' + this.wrapCollectionValue + '. ' + 'Property value: ' + this.wrapPropertyValue + '. ' + 'Portfolio value: ' + this.wrapPortfolioValue + '. ' + 'My dashboard total value: ' + this.wrapDashboardValue)
    const wrapvalueconst = Number(this.wrapFinanceValue) +  Number(this.wrapBelongingsValue) +  Number(this.wrapCollectionValue) +  Number(this.wrapPropertyValue) + Number(this.wrapPortfolioValue)
    cy.log(wrapvalueconst)
    expect(wrapvalueconst).to.equal(Number(this.wrapDashboardValue))
    
 //   myfinance.cbValueWidget().should('have.text', currency + internationalNumberFormat.format(wrapvalueconst))
 //expect(idText, 'ID').to.equal(titleText)
  })

})

