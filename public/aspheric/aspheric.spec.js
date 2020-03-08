import { getLinksWithoutListeners, getFormsWithoutListeners } from './selectors'
import { expect } from 'chai'
import { JSDOM } from 'jsdom';
import Renderer from './renderer.js';

describe('Testing selectors.', () => {


    it('getLinksWithoutListeners_1linksWithOnclick_returns1elemt', () => {
        //Arrange
        const document = new JSDOM().window.document

        const div = document.createElement('div')
        const a1 = document.createElement('a')
        const a2 = document.createElement('a')
        div.appendChild(a1)
        div.appendChild(a2)
        a2.onclick = (event) => console.log('a2 clicked')

        //Act
        const notProcessedLinks = getLinksWithoutListeners(div)

        //Assert
        expect(notProcessedLinks.length).to.equal(1)
    })

    it('getLinksWithoutListeners_0linksWithOnclick_returns2elemt', () => {
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

    it('getFormsWithoutListeners_1linksWithOnclick_returns1elemt', () => {
        //Arrange
        const document = new JSDOM().window.document

        const form = document.createElement('form')
        const button = document.createElement('button')
        button.setAttribute('type', 'submit')
        form.appendChild(button)

        //Act
        const notProcessedButton = getFormsWithoutListeners(form)

        //Assert
        expect(notProcessedButton.length).to.equal(1)
    })
})

describe('Testing templating', () => {


    it('ph-data on select renders dropdown', async () => {

        //Arrange
        const document = new JSDOM().window.document
        global.document = document
        const div = document.createElement('div')
        div.innerHTML = '<select class="some_class" name="category" ph-data="categories"></select>'
        
        const renderer = new Renderer(div)
        const option1value = 'some_value_1'
        const option2value = 'some_value_2'

        //Act
        await renderer.init()
        renderer.push('categories',[{value:option1value, text:''},{value:option2value, text:''}])

        //Assert
        const options = Array.from(div.querySelectorAll('option'))
        expect(options.length).to.equal(2)

        const option1ValueRes = option[0].querySelector('[value]').text
        expect(option1ValueRes).to.equal(option1value)

        const option2ValueRes = option[1].querySelector('[value]').text
        expect(option2ValueRes).to.equal(option2value)
        
    })
})