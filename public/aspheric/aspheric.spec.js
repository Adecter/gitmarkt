import { getLinksWithoutListeners, getFormsWithoutListeners } from './selectors'
import { expect } from 'chai'
import { JSDOM } from 'jsdom';
const jsdom = require("jsdom");


describe('Testing selectors.', () => {


    it('getLinksWithoutListeners_1linksWithOnclick_returns1elemt', ()=>{
        //Arrange
        const document = new JSDOM().window.document

        const div = document.createElement('div')
        const a1 = document.createElement('a')
        const a2 = document.createElement('a')
        div.appendChild(a1)
        div.appendChild(a2)
        a2.onclick = (event)=> console.log('a2 clicked')

        //Act
        const notProcessedLinks = getLinksWithoutListeners(div)

        //Assert
        expect(notProcessedLinks.length).to.equal(1)
    })

    it('getLinksWithoutListeners_0linksWithOnclick_returns2elemt', ()=>{
        //Arrange
        const document = new JSDOM().window.document

        const div = document.createElement('div')
        const a1 = document.createElement('a')
        const a2 = document.createElement('a')
        div.appendChild(a1)
        div.appendChild(a2)

        //Act
        const notProcessedLinks = getLinksWithoutListeners(div)

        //Assert
        expect(notProcessedLinks.length).to.equal(2)
    })

    it('getFormsWithoutListeners_1linksWithOnclick_returns1elemt', ()=>{
        //Arrange
        const document = new JSDOM().window.document

        const form = document.createElement('form')
        const button = document.createElement('button')
        button.setAttribute('type','submit')
        form.appendChild(button)

        //Act
        const notProcessedButton = getFormsWithoutListeners(form)

        //Assert
        expect(notProcessedButton.length).to.equal(1)
    })
})