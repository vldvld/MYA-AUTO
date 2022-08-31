class mycollection{

myCollectionPlusButton(){
    return cy.get('[data-cy="add-btn"]')
}
purcasePriceArt(){
    return cy.get('#purchasePrice')
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
    return cy.get('#wineVintageText')
}
amountOfBottles(){
    return cy.get('#amountOfBottles')
}
pricePerBottle(){
    return cy.get('#purchasePrice')
}
bottleStatus(){
    return cy.get('#bottleStatus')
}
wineCreatedNotification(){
    return cy.contains('Wine was created', {timeout: 30000})
}
createButton(){
    return cy.contains('Create', {timeout: 20000})
}
otherCollectablesTab(){
    return cy.get('[data-cy=collectibles-other-tab-btn]')
}
collectionTypeField(){
    return cy.get('#collectionType')
}
manufactureField(){
    return cy.get('#manufacture')
}
modelTypeField(){
    return cy.get('#modelType')
}
OtherCollectablesAssetCreatedNotification(){
    return cy.contains('Other Collectibles Asset was created', { timeout: 30000})
}
shouldExistPropertySearch(){
    return cy.contains(/AUTOMATEDPROPERTY/, { timeout: 50000 })
}
winePropertyLocation(){
    return cy.get('#linkedPropertyAsLocation')
}
artCarouselValue(){
    return cy.get('[data-cy=art-dashboard-collectibles-value]')
}
artCarouselLiability(){
    return cy.get('[data-cy=art-dashboard-collectibles-liabilities]')
}
artCarouselNetValue(){
    return cy.get('[data-cy=art-dashboard-collectibles-net-value]')
}



}
export default mycollection