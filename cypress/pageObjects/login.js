class login{
    email(){
        return cy.get('[name="email"]')
    }
    password(){
        return cy.get('[name="password"]')
    }
    submitButton(){
        return cy.get(':nth-child(4) > .MuiButtonBase-root')
    }
}
export default login