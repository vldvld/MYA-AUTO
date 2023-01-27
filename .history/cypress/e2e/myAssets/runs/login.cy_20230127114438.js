// import MainPage from '../../../pageObjects/mainPage'
// import myCollection from '../../../pageObjects/myCollection'

// Cypress.on('uncaught:exception', (err, runnable) => {
//   return false
// })

// describe('Creating an Art asset', function () {

//   const mainpage = new MainPage()
//   const mycollection = new myCollection()

//   const newValue = 1000
//   const currency = 'USD '
//   const internationalNumberFormat = new Intl.NumberFormat('en-US')

//   // Create a random Asset name
//   const name = () => Cypress._.random(0, 1e6)
//   const id = name()
//   const testName = "AUTOMATEDART #" + `${id}`
  
//   //firebase auth
  

//   it('Go to the My collectibles page and create an art asset', function () {  
//     cy.goToLoginPage()
//     cy.callFirestore('add', 'test_hello_world', { some: 'value' });
//     cy.login()
//     mainpage.goToMyCollection().click()



// //   cy.goToLoginPage()
// //   cy.loginCommand("mya-automated-tests@gmail.com", "mya-automated-tests@gmail.com")
//   mainpage.goToMyCollection().click()
//   mycollection.artTab().click()

//   })

// })
