class documentstorage{

    plusButton(){   
        return cy.get('.MuiFab-root')
    }
    assetType(){
        return cy.get('[aria-haspopup="listbox"]')
    }
}
export default documentstorage