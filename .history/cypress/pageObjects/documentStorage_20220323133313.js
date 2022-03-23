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
        return cy.get('[tabindex="0"]')
    }
    modalTitle(){
        return cy.get(':nth-child(5) > [data-layer="Content"]')
    }
}
export default documentstorage


