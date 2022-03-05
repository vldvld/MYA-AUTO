class login{
    email(){
        return cy.get('[name="email"]')
    }
    password(){
        return cy.get('[name="password"]')
    }
    submitButton(){
        return cy.get('[data-cy=login-btn]')
    }
}
export default login