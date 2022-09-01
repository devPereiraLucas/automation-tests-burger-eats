describe('Cadastro', ()=> {
    it('Usuario deve se tornar um entregador', ()=> {
        cy.viewport(1440, 900)
        cy.visit('https://buger-eats.vercel.app')
        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
        
        var entregador = {
            nome: 'Lucas Pereira',
            cpf: '10903587589',
            email: 'lucas@gmail.com',
            whatsapp: '11999999999',
            endereco: {
                cep: '88350610',
                rua: 'Rua Frederico Petrusky',
                numero: '1347',
                complemento: 'Casa',
                bairro: 'Guarani',
                cidade_uf: 'Brusque/SC', 
            },
            metodo_entrega: 'Moto',
            cnh: 'cnh-digital.jpg'
        }

        cy.get('input[name="name"]').type(entregador.nome)
        cy.get('input[name="cpf"]').type(entregador.cpf)
        cy.get('input[name="email"]').type(entregador.email)
        cy.get('input[name="whatsapp"]').type(entregador.whatsapp)

        cy.get('input[name="postalcode"]').type(entregador.endereco.cep)
        cy.get('input[type="button"][value="Buscar CEP"]').click()

        cy.get('input[name="address-number"]').type(entregador.endereco.numero)
        cy.get('input[name="address-details"]').type(entregador.endereco.complemento)

        cy.get('input[name="address"]').should('have.value', entregador.endereco.rua)
        cy.get('input[name="district"]').should('have.value', entregador.endereco.bairro)
        cy.get('input[name="city-uf"]').should('have.value', entregador.endereco.cidade_uf)

        cy.contains('.delivery-method li', entregador.metodo_entrega).click()

        cy.get('input[accept^="image"]').attachFile('/images/' + entregador.cnh)

        cy.get('form button[type="submit"]').click()

        const expected_message = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        cy.get('.swal2-container .swal2-html-container').should('have.text', expected_message)
        
    })
})