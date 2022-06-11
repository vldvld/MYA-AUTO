// import MainPage from '../../../pageObjects/mainPage'
// import myFinance from '../../../pageObjects/myFinance'

// Cypress.on('uncaught:exception', (err, runnable) => {
//     return false
// })

// describe('Creating a Portfolio account', function () 
// {
//     const mainpage = new MainPage()
//     const myfinance = new myFinance()
//     const currency = 'USD '
//     const newValue = 1000
//     const internationalNumberFormat = new Intl.NumberFormat('en-US')

//     // Create a random Portfolio name
//     const name = () => Cypress._.random(0, 1e6)
//     const id = name()
//     const testName = "AutoPortfolio #" +`${id}`

//     it('Go to the Traditional page and create the portfolio', function()
//     {
//         cy.goToLoginPage()
//         cy.loginCommand("automationtests5@gmail.com", "testuser1")
//         mainpage.homePageUrl()
        
//         mainpage.goToMyFinance().click()
//         myfinance.TITab().click()
//         myfinance.myFinancePlusButton().click()

//         myfinance.TIName().type(testName).should('have.value', testName)
//         myfinance.TIPremium().type(newValue).should('have.value', '1,000')
//         myfinance.TIPortfolioType().click()
//         cy.get('#portfolioType-option-0').click()
//         myfinance.TICompany().type('TestAutoCompany '+`${id}`)
//         cy.contains('Add company: TestAutoCompany '+`${id}`, { timeout: 5000 }).click()
//         myfinance.TICompany().should('have.value', 'TestAutoCompany '+`${id}`)
//         myfinance.TIProduct().type('TestAutoProduct '+`${id}`)
//         cy.contains('Add product: TestAutoProduct '+`${id}`, { timeout: 5000 }).click()
//         myfinance.TIProduct().should('have.value', 'TestAutoProduct '+`${id}`)
//         myfinance.TISaveAndCloseButton().click()
//     })      
//     it('Check the created Portfolio notifications and created data', function()
//     {  
//         myfinance.portfolioWasCreatedNotification().should('exist')
//         cy.contains(testName).should('exist')
//         cy.contains("TestAutoProduct "+`${id}`).should('exist')
//         cy.contains("TestAutoCompany "+`${id}`).should('exist')
//         myfinance.transactionCreatedNotification().should('exist')
//     })
// })


//     // it('Check the collectibles Value widget', function()
//     // {
   
//     // })

//     // it('Check the collectibles Value widget', function()
//     // {
//     //     myfinance.cbValueWidget().then($valueState => {
//     //     const previousValueCBWidget = $valueState.text() 
//     //     myfinance.cbValueWidget().should('have.text', previousValueCBWidget) 
//     //     const previousValueInt = previousValueCBWidget.substr(4)  
//     //     const resultValueCBWidget = parseInt(previousValueInt.replace(",", "") ) + newValue 
//     //     myfinance.cbValueWidget().should('have.text', currency + internationalNumberFormat.format(resultValueCBWidget, { timeout: 18000 }))   
//     // })


