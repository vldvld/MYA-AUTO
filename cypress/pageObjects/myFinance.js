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
selectMortgageAccount(){
    return cy.get('[data-value="MORTGAGE_ACCOUNT"]')
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
    return cy.get('#customized-dialog-title').find('span')
}
savingAccountCreatedNotification(){
    return cy.contains('Saving Account was created')
}
mortgageCreatedNotification(){
    return cy.contains('Mortgage Account was created')
}
cashAccountCreatedNotification(){
    return cy.contains('Cash Account was created', { timeout: 18000 })
}
creditAccountCreatedNotification(){
    return cy.contains('Credit Card Account was created', { timeout: 18000 })
}
transactionCreatedNotification(){
    return cy.contains('Transaction was created', { timeout: 18000 })
}
cbValueWidget(){
    return cy.get('[data-cy=cb-collectibles-value]',{ timeout: 18000 })
}
cbLiabilityWidget(){
    return cy.get('[data-cy=cb-collectibles-liabilities]',{ timeout: 18000 })
}
cbNetValueWidget(){
    return cy.get('[data-cy=cb-collectibles-net-value]',{ timeout: 18000 })
}
ziaBankInstitution(){
    return cy.get('[role=menu]').contains('ZIA Credit Union', { timeout: 18000 })
}
outstandingAmmount(){
    return cy.get('#outstandingAmount')
}

}
    export default myfinance