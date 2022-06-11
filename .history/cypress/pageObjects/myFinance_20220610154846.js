class myfinance{

//C&B module selectors:

myFinancePlusButton(){
    return cy.get('[data-cy="add-btn"]')
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
savingAccountCreatedNotification(){
    return cy.contains('Saving Account was created')
}
mortgageCreatedNotification(){
    return cy.contains('Mortgage Account was created')
}
cashAccountCreatedNotification(){
    return cy.contains('Cash Account was created', { timeout: 30000 })
}
creditAccountCreatedNotification(){
    return cy.contains('Credit Card Account was created', { timeout: 30000 })
}
loanAccountCreatedNotification(){
    return cy.contains('Loan Account was created', { timeout: 30000 })
}
currentAccountCreatedNotification(){
    return cy.contains('Current Account was created', { timeout: 30000 })
}
transactionCreatedNotification(){
    return cy.contains('Transaction was created', { timeout: 30000 })
}
cbValueWidget(){
    return cy.get('[data-cy=summary-widget-value]',{ timeout: 30000 })
}
cbLiabilityWidget(){
    return cy.get('[data-cy=summary-widget-liabilities]',{ timeout: 30000 })
}
cbNetValueWidget(){
    return cy.get('[data-cy=summary-widget-net-value]',{ timeout: 30000 })
}
ziaBankInstitution(){
    return cy.get('[role=menu]').contains('Zions Bank - Mortgage', { timeout: 30000 })
}
outstandingAmmount(){
    return cy.get('#outstandingAmount')
}
cashAndBankingTab(){
    return cy.get('[href="/finances/accounts"]')
}
//Portfolio module selectors:

TITab(){
    return cy.get('[href="/finances/traditional-investments"]') 
}
TIName(){
    return cy.get('#name')
}
TIPortfolioType(){
    return cy.get('#portfolioType')
}
TIPremium(){
    return cy.get('#premium')
}
TICompany(){
    return cy.get('#company')
}
TIProduct(){
    return cy.get('#product')
}
TISaveAndCloseButton(){
    return cy.contains('Save and Close')
}
portfolioWasCreatedNotification(){
    return cy.contains('Portfolio was created', { timeout: 30000 })
}
TIInvestmentsAmountField(){
    return cy.get('#investmentAmount')
}
TIHoldingName(){
    return cy.get('#holding')
}
TIUnits (){
    return cy.get('#units')
}
TIPricePerUnit(){
    return cy.get('#pricePerUnit')
}
TIAddHoldingButton(){
    return cy.get('.MuiFormControl-root > .MuiGrid-container > .MuiGrid-root > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root')
}
creditCardType(){
    return cy.get('[data-cy="summary-widget-value"]')
}
creditCardTypeLast4(){
    return cy.get('#cardType')
}
}
    export default myfinance