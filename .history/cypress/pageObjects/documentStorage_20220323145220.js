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
    skipButton(){
        return cy.contains('Skip')
    }
    modalTitle(){
        return cy.get('#customized-dialog-title')   
    }
}
export default documentstorage


