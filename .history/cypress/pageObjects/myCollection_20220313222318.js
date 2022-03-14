class mycollection{

myCollectionPlusButton(){
    return cy.get('.MuiFab-root')
}
artistField(){
    return cy.get('#artist')
}
titleField(){
    return cy.get('#title')
}
artTypeField(){
    return cy.get('#artType')
}
nextButton(){
    return cy.contains('Next')
}
listPriceField(){
    return cy.get('#listPrice') 
}   
purchaseDateField(){
    return cy.get('[placeholder="MM/DD/YYYY"]').first()
}
saveAndClose(){
    return cy.contains('Save and Close')
}
artCreatedNotification(){
    return cy.contains('Art Asset was created', { timeout: 30000})
}
winesTab(){
    return cy.contains('Wines')
}
createNewWine(){
    return cy.contains('Create a new wine')
}
wineProducer(){
    return cy.get('#wineProducer')
}
wineName(){
    return cy.get('#wineName')
}
wineVintage(){
    return cy.get('#wineVintage')
}
amountOfBottles(){
    return cy.get('#amountOfBottles')
}
pricePerBottle(){
    return cy.get('#pricePerBottle')
}
bottleStatus(){
    return cy.get('#bottleStatus')
}
wineCreatedNotification(){
    return cy.contains('Wine was created', {timeout: 30000})
}



}
export default mycollection