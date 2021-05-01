import * as Remote from './voicemeeter-remote'

/**
 * Represents a Voicemeeter strip
 */
class Strip {

	/**
	 * Constructs a strip
	 * @param {Voicemeeter} voicemeeter The Voicemeeter instance that created
	 * the strip
	 * @param {number} index The index of the strip
	 */
	constructor(voicemeeter, index){

		/**
		 * The Voicemeeter instance that created the strip
		 * @type {Voicemeeter}
		 */
		this.voicemeeter = voicemeeter;

		/**
		 * The index of the strip
		 * @type {number}
		 */
		this.index = index;

		/**
		 * Whether the strip is virtual
		 *
		 * `true` if the strip is virtual, `false` if it is physical
		 * @type {boolean}
		 */
		this.isVirtualStrip = index >= Strip.Lengths[voicemeeter.type].physical;

		/**
		 * Defines a property on `this` that automatically gets/sets the
		 * corresponding property on Voicemeeter
		 *
		 * @private
		 * @param {string} name The name of the property
		 * @param {string} [vmName=name] The name of the Voicemeeter property (defaults to `name`)
		 * @returns {void}
		 */
		const generateNumericProperty = (name, vmName) => Object.defineProperty(this, name, {
			get: () => Remote.getParameter(`Strip[${this.index}].${vmName || name}`),
			set: (value) => Remote.setParameter(`Strip[${this.index}].${vmName || name}`, Number(value))
		});

		/**
		 * Defines a property on `this` that accepts a string value and
		 * automatically gets/sets the corresponding property on Voicemeeter
		 *
		 * @private
		 * @param {string} name The name of the property
		 * @param {string} [vmName=name] The name of the Voicemeeter property (defaults to `name`)
		 * @returns {void}
		 */
		 const generateStringProperty = (name, vmName) => Object.defineProperty(this, name, {
			get: () => !!Remote.getParameter(`Strip[${this.index}].${vmName || name}`),
			set: (value) => Remote.setParameter(`Strip[${this.index}].${vmName || name}`, String(value))
		});

		/**
		 * Defines a property on `this` that accepts a boolean value and
		 * automatically gets/sets the corresponding property on Voicemeeter
		 *
		 * @private
		 * @param {string} name The name of the property
		 * @param {string} [vmName=name] The name of the Voicemeeter property (defaults to `name`)
		 * @returns {void}
		 */
		const generateBooleanProperty = (name, vmName) => Object.defineProperty(this, name, {
			get: () => !!Remote.getParameter(`Strip[${this.index}].${vmName || name}`),
			set: (value) => Remote.setParameter(`Strip[${this.index}].${vmName || name}`, value ? 1 : 0)
		});

		/**
		 * Whether the strip is forced to be monophonic
		 *
		 * @name Strip#Mono
		 * @type {boolean}
		 */

		/**
		 * Whether the strip is muted
		 *
		 * @name Strip#Mute
		 * @type {boolean}
		 */

		/**
		 * Whether the strip is soloed
		 *
		 * @name Strip#Solo
		 * @type {boolean}
		 */

		/**
		 * Whether the center channel of the strip is muted
		 *
		 * @name Strip#MC
		 * @type {boolean}
		 */

		/**
		 * The value of the gain slider of the strip (in dB)
		 *
		 * Range of this value is -60 to +12 dB
		 *
		 * @name Strip#Gain
		 * @type {number}
		 */

		// TODO: GainLayer

		/**
		 * Left-right pan of the strip
		 *
		 * Range of this value is -0.5 to +0.5
		 *
		 * @name Strip#Pan_x
		 * @type {number}
		 */

		/**
		 * Front-back pan of the strip
		 *
		 * On virtual strips (which are 7.1), this pans the surround audio back
		 * and front. In that case, this value ranges between -0.5 and +0.5. On
		 * physical strips, psychoacoustic effects are used to "move" the audio
		 * away from the listener. In that case, this value ranges from 0 to 1.
		 *
		 * @name Strip#Pan_y
		 * @type {number}
		 */

		/**
		 * The x position of the color panel of the strip
		 *
		 * This value ranges from -0.5 to +0.5.
		 *
		 * Available only in physical strips
		 *
		 * @name Strip#Color_x
		 * @type {number}
		 */

		/**
		 * The y position of the color panel of the strip
		 *
		 * This value ranges from 0 to 1.
		 *
		 * Available only in physical strips
		 *
		 * @name Strip#Color_y
		 * @type {number}
		 */

		/**
		 * The x position of the effect panel of the strip
		 *
		 * This value ranges from -0.5 to +0.5.
		 *
		 * Available only in physical strips
		 *
		 * @name Strip#Color_x
		 * @type {number}
		 */

		/**
		 * The y position of the effect panel of the strip
		 *
		 * This value ranges from 0 to 1.
		 *
		 * Available only in physical strips
		 *
		 * @name Strip#Color_y
		 * @type {number}
		 */

		/**
		 * The audibility of the strip
		 *
		 * Available only in simple Voicemeeter
		 *
		 * @name Strip#Audibility
		 * @type {number}
		 */

		/**
		 * The compression level of the strip
		 *
		 * Available only in Voicemeeter Banana and Potato
		 *
		 * @name Strip#Comp
		 * @type {number}
		 */

		/**
		 * The gate level of the strip
		 *
		 * Available only in Voicemeeter Banana and Potato
		 *
		 * @name Strip#Gate
		 * @type {number}
		 */

		/**
		 * The karaoke algorithm of the strip
		 *
		 * Available only in virtual strips on Voicemeeter Banana and
		 * Potato
		 *
		 * @name Strip#Karaoke
		 * @type {number}
		 */

		/**
		 * The limiter level of the strip
		 *
		 * Available only in Voicemeeter Banana and Potato
		 *
		 * @name Strip#Limit
		 * @type {number}
		 */

		// TODO: Find which EQ number corresponds to what frequency

		/**
		 * The label of the strip
		 *
		 * @name Strip#Level
		 * @type {string}
		 */

		/**
		 * Whether the strip sends audio to output A1
		 *
		 * @name Strip#A1
		 * @type {boolean}
		 */

		/**
		 * Whether the strip sends audio to output A2
		 *
		 * Available only on Voicemeeter Banana and Potato
		 *
		 * @name Strip#A2
		 * @type {boolean}
		 */

		/**
		 * Whether the strip sends audio to output A3
		 *
		 * Available only on Voicemeeter Banana and Potato
		 *
		 * @name Strip#A3
		 * @type {boolean}
		 */

		/**
		 * Whether the strip sends audio to output A4
		 *
		 * Available only on Voicemeeter Potato
		 *
		 * @name Strip#A4
		 * @type {boolean}
		 */

		/**
		 * Whether the strip sends audio to output A5
		 *
		 * Available only on Voicemeeter Potato
		 *
		 * @name Strip#A5
		 * @type {boolean}
		 */

		/**
		 * Whether the audio is sent to the Reverb effect before or after the
		 * fader
		 *
		 * Available only on Voicemeeter Potato
		 *
		 * @name Strip#PostReverb
		 * @type {boolean}
		 */

		/**
		 * Whether the audio is sent to the Delay effect before or after the
		 * fader
		 *
		 * Available only on Voicemeeter Potato
		 *
		 * @name Strip#PostDelay
		 * @type {boolean}
		 */

		/**
		 * Whether the audio is sent to the FX1 effect before or after the
		 * fader
		 *
		 * Available only on Voicemeeter Potato
		 *
		 * @name Strip#PostFx1
		 * @type {boolean}
		 */

		/**
		 * Whether the audio is sent to the FX2 effect before or after the
		 * fader
		 *
		 * Available only on Voicemeeter Potato
		 *
		 * @name Strip#PostFx2
		 * @type {boolean}
		 */

		[
			'Mono',
			'Mute',
			'Solo',
			'MC',
			'A1',
			voicemeeter.type >= Remote.Types.Banana && 'A2',
			voicemeeter.type >= Remote.Types.Banana && 'A3',
			voicemeeter.type >= Remote.Types.Potato && 'A4',
			voicemeeter.type >= Remote.Types.Potato && 'A5',
			'B1',
			voicemeeter.type >= Remote.Types.Banana && 'B2',
			voicemeeter.type >= Remote.Types.Potato && 'B3',
			voicemeeter.type >= Remote.Types.Potato && 'PostReverb',
			voicemeeter.type >= Remote.Types.Potato && 'PostDelay',
			voicemeeter.type >= Remote.Types.Potato && 'PostFx1',
			voicemeeter.type >= Remote.Types.Potato && 'PostFx2',
		].filter(name => !!name).forEach(name => generateBooleanProperty(name));

		[
			'Gain',
			'Pan_x',
			'Pan_y',
			!this.isVirtualStrip && 'Color_x',
			!this.isVirtualStrip && 'Color_y',
			!this.isVirtualStrip && voicemeeter.type >= Remote.Types.Banana && 'fx_x',
			!this.isVirtualStrip && voicemeeter.type >= Remote.Types.Banana && 'fx_y',
			voicemeeter.type == Remote.Types.Normal && 'Audibility',
			voicemeeter.type >= Remote.Types.Banana && 'Comp',
			voicemeeter.type >= Remote.Types.Banana && 'Gate',
			voicemeeter.type >= Remote.Types.Banana && 'Karaoke',
			voicemeeter.type >= Remote.Types.Banana && 'Limit',
			this.isVirtualStrip && 'EQGain1',
			this.isVirtualStrip && 'EQGain2',
			this.isVirtualStrip && 'EQGain3',
			voicemeeter.type >= Remote.Types.Potato && 'Reverb',
			voicemeeter.type >= Remote.Types.Potato && 'Delay',
			voicemeeter.type >= Remote.Types.Potato && 'Fx1',
			voicemeeter.type >= Remote.Types.Potato && 'Fx2',
		].filter(name => !!name).forEach(name => generateNumericProperty(name));

		[
			'Label'
		].filter(name => !!name).forEach(name => generateStringProperty(name));

	}
}

/**
 * How many strips each type of Voicemeeter has
 */
Strip.Lengths = {
	[Remote.Types.Normal]: {
		physical: 2,
		virtual: 1,
		total: 3
	},
	[Remote.Types.Banana]: {
		physical: 3,
		virtual: 2,
		total: 5
	},
	[Remote.Types.Potato]: {
		physical: 5,
		virtual: 3,
		total: 8
	},
	[Remote.Types.Potato64]: {
		physical: 5,
		virtual: 3,
		total: 8
	}
}

/**
 * A handler for a connection to the Voicemeeter API
 */
class Voicemeeter {

	/**
	 * Constructs a Voicemeeter instance and connects to Voicemeeter
	 */
	constructor(){

		/**
		 * An array holding all the strips of the Voicemeeter
		 * @type {Strip[]}
		 */
		this.Strip = new Array(Strip.Lengths[this.type].total).fill().map((_, i) => new Strip(this, i));
	}

	/**
	 * Voicemeeter's version
	 *
	 * @type {string}
	 */
	get version(){
		return Remote.getVoicemeeterVersion();
	}

	/**
	 * The type of the Voicemeeter application currently running
	 *
	 * @type {Remote.Types}
	 */
	get type(){
		return Remote.getVoicemeeterType();
	}

	/**
	 * Whether any parameter has changed since last check
	 *
	 * @type {boolean}
	 */
	get haveParametersChanged(){
		return Remote.isParametersDirty();
	}

	/**
	 * Information about the input devices currently available
	 *
	 * @type {DeviceInfo[]}
	 */
	get inputDevices(){
		return Remote.getInputDeviceInfo();
	}

	/**
	 * Information about the output devices currently available
	 *
	 * @type {DeviceInfo[]}
	 */
	get outputDevices(){
		return Remote.getOutputDeviceInfo();
	}

}

/**
 * The possible types of Voicemeeter applications
 *
 * @enum {number}
 */
Voicemeeter.Types = Remote.Types;

export default Voicemeeter;
