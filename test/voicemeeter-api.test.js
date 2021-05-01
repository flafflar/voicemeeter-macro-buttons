const { expect } = require('chai');

import Voicemeeter from '../src/lib/voicemeeter-api'

describe('Voicemeeter API', function(){

	it('Should export a class', function(){
		expect(typeof Voicemeeter).to.equal('function');
		expect(() => Voicemeeter()).to.throw("cannot be invoked without 'new'")
		expect(new Voicemeeter()).to.be.instanceOf(Voicemeeter);
	})

	describe('Voicemeeter class', function(){

		it('Should have a `Types` enum', function(){
			expect(Voicemeeter).to.have.property('Types').that.is.an('object');
			expect(Voicemeeter.Types).to.have.property('Normal').that.is.a('number');
			expect(Voicemeeter.Types).to.have.property('Banana').that.is.a('number');
			expect(Voicemeeter.Types).to.have.property('Potato').that.is.a('number');
			expect(Voicemeeter.Types).to.have.property('Potato64').that.is.a('number');
		})

	})

	describe('Voicemeeter instances', function(){
		const VM = new Voicemeeter();

		it('Should have a `version` property', function(){
			expect(VM).to.have.property('version');
			expect(VM.version).to.be.a('string');
		})

		it('Should have a `type` property', function(){
			expect(VM).to.have.property('type');
			expect(VM.type).to.be.a('number');
			expect(VM.type).to.be.oneOf(Object.values(Voicemeeter.Types));
		})

		it('Should have an `inputDevices` property', function(){
			expect(VM).to.have.property('inputDevices');
			expect(VM.inputDevices).to.be.an('array');
			VM.inputDevices.forEach(device => {
				expect(device).to.have.property('type');
				expect(device.type).to.be.oneOf(['MME', 'KS', 'WDM', 'ASIO']);
				expect(device).to.have.property('name');
				expect(device.name).to.be.a('string');
				expect(device).to.have.property('hardwareId');
				expect(device.hardwareId).to.be.a('string');
			})
		})

		it('Should have an `outputDevices` property', function(){
			expect(VM).to.have.property('outputDevices');
			expect(VM.outputDevices).to.be.an('array');
			VM.outputDevices.forEach(device => {
				expect(device).to.have.property('type');
				expect(device.type).to.be.oneOf(['MME', 'KS', 'WDM', 'ASIO']);
				expect(device).to.have.property('name');
				expect(device.name).to.be.a('string');
				expect(device).to.have.property('hardwareId');
				expect(device.hardwareId).to.be.a('string');
			})
		})


	})

})
