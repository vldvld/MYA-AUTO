class myfinance{

myFinancePlusButton(){
    return cy.get('.MuiFab-root')
    }
selectAccountDropDown(){
    return cy.contains('Select type')
}
selectMortgageAccount(){
    return cy.get('[data-value="MORTGAGE_ACCOUNT"]')
}
selectSavingAccount(){
    return cy.get('[data-value="SAVING_ACCOUNT"]')
}
selectCashAccont(){
    return cy.get('[data-value="CASH"]')
}
selectCreditAccount(){
    return cy.get('[data-value="CREDIT_ACCOUNT"]')
}
selectCurrentAccount(){
    return cy.get('[data-value="CURRENT_ACCOUNT"]')
}
selectLoanAccount(){
    return cy.get('[data-value="LOAN_ACCOUNT"]')
}
nextButton(){
    return cy.contains('Next')
}
createButton(){
    return cy.contains('Create')
}
accountNameField(){
    return cy.get('#accountName')
}
bankInstitutionField(){
    return cy.get('#bankInstitution')
}
balanceField(){
    return cy.get('#null')
}
balanceFieldCash(){
    return cy.get('#balance')
}
modalTitle(){
    return cy.get('#customized-dialog-title')
}
savingAccountCreatedNotification(){
    return cy.contains('Saving Account was created')
}
cashAccountCreatedNotification(){
    return cy.contains('Cash Account was created', { timeout: 14000 })
}
transactionCreatedNotification(){
    return cy.contains('Transaction was created', { timeout: 14000 })
}
cbValueWidget(){
    return cy.get('[data-cy=cb-collectibles-value]',{ timeout: 15000 })
}
cbLiabilityWidget(){
    return cy.get('data-cy="cb-collectibles-liabilities"')
}
cbNetValueWidget(){
    return cy.get('data-cy="cb-collectibles-net-value"')
}
}
    export default myfinance