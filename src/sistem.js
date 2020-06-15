const { msgTypes, reset } = require('./baglanti'); 

class Sistem {

  /**
   * @param {*} [options={}] 
   * 
   * @memberof Sistem
   */

  constructor(options = {}) {
    const defaults = {
      colors: true,
      timestamps: true,
      trace: true
    };
    for (let key in defaults) {
      if (!(key in options)) {
        options[key] = defaults[key];
      }
    }

    this._validateOptions(options);

    this.colored = options.colors;
    this.timestamps = options.timestamps;
    this.trace = options.trace;
  }

  /**
   * @memberof Sistem
   * @param {...*} messages
   * @returns {void}
   */

  info(/**/) {
    const args = Array.prototype.slice.call(arguments).join(' ');
    this._logstdout(args, msgTypes.info);
  }

  /**
   * @memberof Sistem
   * @param {...*} messages
   * @returns {void}
   */

  warn(/**/) {
    const args = Array.prototype.slice.call(arguments).join(' ');
    this._logstderr(args, msgTypes.warn);
  }

  /**
   * @memberof Sistem
   * @param {...*} messages
   * @returns {void}
   */
  error(/**/) {
    const args = Array.prototype.slice.call(arguments);
    const parsedArgs = this.trace ? args.map(arg => arg.stack || arg).join(' ') : args.join(' ');
    this._logstderr(parsedArgs, msgTypes.error)
  }

  /**
   * @memberof Sistem
   * @param {...*} messages
   * @returns {void}
   */

  debug(/**/) {
    const args = Array.prototype.slice.call(arguments).join(' ');
    this._logstdout(args, msgTypes.debug);
  }

  /**
   * @memberof Sistem
   * @returns {void}
   */

  clear() {
    console.clear();
  }

  _validateOptions(options) {
    const { colors, timestamps, trace } = options;

    if (typeof (colors) != 'boolean' ||
      typeof (timestamps) != 'boolean' ||
      typeof (trace) != 'boolean'
    ) {
      throw new TypeError('Yapıcı seçenekleri geçerli değil!');
    }
  }

  _logstdout(msg, msgType) {
    const { type, color } = msgType;

    switch ([this.colored, this.timestamps].join(' ')) {
      case 'true true':
        console.log(this._applyColor(color), `(${new Date().toLocaleTimeString()}) - [${type}] - ${msg}`);
        break;
      case 'true false':
        console.log(this._applyColor(color), `[${type}] - ${msg}`);
        break;
      case 'false true':
        console.log(`(${new Date().toLocaleTimeString()}) - [${type}] - ${msg}`);
        break;
      case 'false false':
        console.log(`[${type}] - ${msg}`);
        break;
      default:
        throw new Error('Beklenmeyen Bir Hata Gerçekleşti!');
    }
  }


  _logstderr(msg, msgType) {
    const { type, color } = msgType;

    switch ([this.colored, this.timestamps].join(' ')) {
      case 'true true':
        if (type == 'ERROR') {
          console.error(this._applyColor(color), `(${new Date().toLocaleTimeString()}) - [${type}] - ${msg}`);
        } else {
          console.warn(this._applyColor(color), `(${new Date().toLocaleTimeString()}) - [${type}] - ${msg}`);
        }
        break;
      case 'true false':
        if (type == 'ERROR') {
          console.error(this._applyColor(color), `[${type}] - ${msg}`);
        } else {
          console.warn(this._applyColor(color), `[${type}] - ${msg}`);
        }
        break;
      case 'false true':
        if (type == 'ERROR') {
          console.error(`(${new Date().toLocaleTimeString()}) - [${type}] - ${msg}`);
        } else {
          console.warn(`(${new Date().toLocaleTimeString()}) - [${type}] - ${msg}`);
        }
        break;
      case 'false false':
        if (type == 'ERROR') {
          console.error(`[${type}] - ${msg}`);
        } else {
          console.warn(`[${type}] - ${msg}`);
        }
        break;
      default:
        throw new Error('Beklenmeyen Bir Hata Gerçekleşti!');
    }
  }

  _applyColor(color) {
    if (this.colored) {
      return `${color}%s${reset}`;
    }

    return '';
  }

}

module.exports = {
  Sistem
}