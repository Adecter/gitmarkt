import { expect } from 'chai'
const chai = require('chai')
import chaiAsPromised from 'chai-as-promised'
import ServiceUseCase from '../domain/use-cases/service'
import { serviceSchema } from '../domain/models/service-schema'
import sinon from 'sinon'
import ServiceRepository from '../infrastructure/repositories/service-repository'
chai.use(chaiAsPromised)

afterEach(() => {
    // Restore the default sandbox here
    sinon.restore();
});

describe('Service use case spec.', async () => {


    it('prepareService_validData_ReturnsDto', async () => {

        //Arrange
        sinon.stub(ServiceRepository.prototype,'persistService').resolves(Promise.resolve())

        const dto = {
            name: 'asddsa',
            category: 123,
            logo: 'some binary string',
            keywords: 'cars detailing'
        }


        const serviceUseCase = new ServiceUseCase(new ServiceRepository(), serviceSchema)

        //Act, Assert
        const a = serviceUseCase.createService(dto);
        return expect(a).to.eventually.be.fulfilled
    })

})