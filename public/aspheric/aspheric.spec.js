import { expect } from 'chai'
import { JSDOM } from 'jsdom';
import { DataConfig, DataOrigin, DataModes } from './data.js';
import { renderDropdown } from './templator.js';


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
        renderDropdown(select, data)

        //Assert
        expect(select).to.not.be.undefined
        expect(Array.from(select.options).length).to.equal(2)
        expect(select.querySelector('option[value="some-value"]'))
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
                endpoint: '/categories',
                mode: DataModes.ReadWrite
            },
            'services': {
                type: DataOrigin.Http,
                endpoint: '/services',
                mode: DataModes.ReadWrite
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