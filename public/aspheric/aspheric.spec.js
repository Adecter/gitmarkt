import { getLinksWithoutListeners, getFormsWithoutListeners } from './selectors'
import { expect } from 'chai'
import { JSDOM } from 'jsdom';
import Renderer from './renderer.js';
import { renderDropdown } from './templator';
import { DataConfig, DataOrigin } from './data';

describe('Selectors tests.', () => {


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

describe('Renderer tests.', () => {
    it('renderDropdown_2option_returnsCorrectHtml', async () => {

        //Arrange
        const document = new JSDOM().window.document
        global.document = document
        const select = document.createElement('select')

        // '<select ph-data="categories"></select>'
        select.setAttribute('ph-data', 'categories')
        const data = [{ value: 'some-value', text: 'some-text' },
        { value: 'some-value2', text: 'some-text2' }]

        //Act
        var newSelect = Renderer.renderDropdown(select, data)

        //Assert
        expect(newSelect).to.not.be.undefined
        expect(Array.from(newSelect.options).length).to.equal(2)
        expect(newSelect.querySelector('option[value="some-value"]'))
    })
})

describe('DataConfig tests', () => {



    it('init_someDataKeys_mustFillLast', async () => {

        //Arrange
        let servicesData = '{"data":"hello from service"}'
        let categoriesData = '{"data":"hello from categories"}'

        const servicesAfterPostData = '{"data":"hello from service 2"}'
        const categoriesAfterPostData = '{"data":"hello from categories 2"}'

        const config = {
            'categories': {
                type: DataOrigin.Http,
                endpoint: '/categories'
            },
            'services': {
                type: DataOrigin.Http,
                endpoint: '/services'
            }
        }
        const fetcherMock = async (endpoint, post) => {
            if(post){
                if (endpoint === '/services') {
                    return new Promise((res, rej)=>{
                        servicesData = servicesAfterPostData
                        res({ok:true})
                    })
                }
                else if (endpoint === '/categories') {
                    return new Promise((res, rej)=>{
                        categoriesData = categoriesAfterPostData
                        res({ok:true})
                    })
                }
                else{
                    throw new Error('Wrong datakey.')
                }
            }


            if (endpoint === '/services') {
                return new Promise((res, rej)=>{
                    res(Promise.resolve({text:()=>servicesData}))
                })
            }
            else if (endpoint === '/categories') {
                return new Promise((res, rej)=>{
                    res(Promise.resolve({text:()=>categoriesData}))
                })
            }
            else{
                throw new Error('Wrong datakey.')
            }
        }

        const dataConfig = new DataConfig(config, fetcherMock)


        //Act
        await dataConfig.init()
        let categoriesToFullfill
        let servicesToFullfill
        dataConfig.subscribe('categories', (data) => categoriesToFullfill = data)
        dataConfig.subscribe('services', (data) => servicesToFullfill = data)

        //Assert
        expect(categoriesToFullfill).to.not.be.null
        expect(servicesToFullfill).to.not.be.null
        expect(categoriesToFullfill.data).to.equal('hello from categories')
        expect(servicesToFullfill.data).to.equal('hello from service')

        await dataConfig.push('services', 'hello')
        expect(servicesToFullfill.data).to.equal('hello from service 2')
        await dataConfig.push('categories', 'hello')
        expect(categoriesToFullfill.data).to.equal('hello from categories 2')
    })
})