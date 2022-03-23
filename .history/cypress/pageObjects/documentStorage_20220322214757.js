class documentstorage{

    plusButton(){   
        return cy.get('.MuiFab-root')
    }
    assetType(){
        return cy.get('[aria-haspopup="listbox"]')
    }
    artAssetType(){
        return cy.get('[data-value="ART"]')
    }
}
export default documentstorage