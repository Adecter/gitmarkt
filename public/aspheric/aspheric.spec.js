import { getLinksWithoutListeners } from './selectors'
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
})