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

		describe('Strip', function(){

			it('Should be a property of Voicemeeter instances', function(){
				expect(VM).to.have.property('Strip');
			})

			it('Should be an array', function(){
				expect(VM.Strip).to.be.an('array');
			})

			it('Should have the correct length', function(){
				const stripLengths = {
					[Voicemeeter.Types.Normal]: 3,
					[Voicemeeter.Types.Banana]: 5,
					[Voicemeeter.Types.Potato]: 8,
					[Voicemeeter.Types.Potato64]: 8
				};

				expect(VM.Strip.length).to.equal(stripLengths[VM.type]);
			})

			VM.Strip.forEach((strip, index) => {
				describe(`Strip #${index}`, function(){

					it('Should have an `index` property', function(){
						expect(strip).to.have.property('index').that.equals(index);
					})

					it('Should have a `isVirtualStrip` property', function(){
						expect(strip).to.have.property('isVirtualStrip').that.is.a('boolean');
					})

					function testProperty(prop, type){
						it(`Should have a \`${prop}\` property, that is a ${type}`, function(){
							expect(strip).to.have.property(prop).that.is.a(type);
						})
					}

					function testPropertyNegative(prop){
						it(`Should not have a \`${prop}\` property`, function(){
							expect(strip).to.not.have.property(prop);
						})
					}

					testProperty('Mono', 'boolean');
					testProperty('Mute', 'boolean');
					testProperty('Solo', 'boolean');
					testProperty('MC', 'boolean');
					testProperty('Gain', 'number');
					testProperty('Pan_x', 'number');
					testProperty('Pan_y', 'number');
					strip.isVirtualStrip ? testPropertyNegative('Color_x') : testProperty('Color_x', 'number')
					strip.isVirtualStrip ? testPropertyNegative('Color_y') : testProperty('Color_y', 'number')
					VM.type >= Voicemeeter.Types.Banana ? (strip.isVirtualStrip ? testPropertyNegative('fx_x') : testProperty('fx_x', 'number')) : testPropertyNegative('fx_x')
					VM.type >= Voicemeeter.Types.Banana ? (strip.isVirtualStrip ? testPropertyNegative('fx_y') : testProperty('fx_y', 'number')) : testPropertyNegative('fx_y')
					VM.type == Voicemeeter.Types.Normal ? testProperty('Audibility', 'number') : testPropertyNegative('Audibility');
					VM.type >= Voicemeeter.Types.Banana ? testProperty('Comp', 'number') : testPropertyNegative('Comp');
					VM.type >= Voicemeeter.Types.Banana ? testProperty('Gate', 'number') : testPropertyNegative('Gate');
					VM.type >= Voicemeeter.Types.Banana ? testProperty('Karaoke', 'number') : testPropertyNegative('Karaoke');
					VM.type >= Voicemeeter.Types.Banana ? testProperty('Limit', 'number') : testPropertyNegative('Limit');
					strip.isVirtualStrip ? testProperty('EQGain1') : testPropertyNegative('EQGain1');
					strip.isVirtualStrip ? testProperty('EQGain2') : testPropertyNegative('EQGain2');
					strip.isVirtualStrip ? testProperty('EQGain3') : testPropertyNegative('EQGain3');
					testProperty('Label', 'string');
					testProperty('A1', 'boolean');
					VM.type >= Voicemeeter.Types.Banana ? testProperty('A2', 'boolean') : testPropertyNegative('A2');
					VM.type >= Voicemeeter.Types.Banana ? testProperty('A3', 'boolean') : testPropertyNegative('A3');
					VM.type >= Voicemeeter.Types.Potato ? testProperty('A4', 'boolean') : testPropertyNegative('A4');
					VM.type >= Voicemeeter.Types.Potato ? testProperty('A5', 'boolean') : testPropertyNegative('A5');
					testProperty('B1', 'boolean');
					VM.type >= Voicemeeter.Types.Banana ? testProperty('B2', 'boolean') : testPropertyNegative('B2');
					VM.type >= Voicemeeter.Types.Potato ? testProperty('B3', 'boolean') : testPropertyNegative('B3');
					VM.type >= Voicemeeter.Types.Potato ? testProperty('Reverb', 'number') : testPropertyNegative('Reverb');
					VM.type >= Voicemeeter.Types.Potato ? testProperty('Delay', 'number') : testPropertyNegative('Delay');
					VM.type >= Voicemeeter.Types.Potato ? testProperty('Fx1', 'number') : testPropertyNegative('Fx1');
					VM.type >= Voicemeeter.Types.Potato ? testProperty('Fx2', 'number') : testPropertyNegative('Fx2');
					VM.type >= Voicemeeter.Types.Potato ? testProperty('PostReverb', 'boolean') : testPropertyNegative('PostReverb');
					VM.type >= Voicemeeter.Types.Potato ? testProperty('PostDelay', 'boolean') : testPropertyNegative('PostDelay');
					VM.type >= Voicemeeter.Types.Potato ? testProperty('PostFx1', 'boolean') : testPropertyNegative('PostFx1');
					VM.type >= Voicemeeter.Types.Potato ? testProperty('PostFx2', 'boolean') : testPropertyNegative('PostFx2');

					it('Should have a `FadeTo` method', function(){
						expect(strip).to.have.property('FadeTo').that.is.a('function');
					})

					it('Should have a `FadeBy` method', function(){
						expect(strip).to.have.property('FadeBy').that.is.a('function');
					})

				})

			})

		})

	})

})
