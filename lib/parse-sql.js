'use strict';

const Papa = require('papaparse');

class ParseSQL {

  constructor(){
    this.insertInto = /insert\s+into\s+(\w+)\s+\(\s*((?:\w+)(?:\s*,\s*\w+)*)\)\s+values\s+\(\s*((?:\d+|'[^']+')(?:\s*,\s*(?:\d+|'[^']+')?)*)\)/gi;
  }

  getElements(input){
    const matches = [];
    let match = this.insertInto.exec(input);
    while (match != null) {
      matches.push({
        table: match[1],
        columns: match[2],
        values: match[3].replace(/\n/gi, '\\n')
      });
      match = this.insertInto.exec(input);
    }
    return matches;
  }

  parse(input){
    return Promise.resolve(
      this.getElements(input).map(element => {
        const fakeCSV = `${element.columns}\n${element.values}`;
        const values = Papa.parse(fakeCSV, {
          preview: 1,
          header: true,
        	dynamicTyping: true,
          delimiter: ", "
        });
        const result = values.data[0];
        Object.keys(result).forEach(key => {
          if (typeof result[key] === 'string'){
            result[key] = result[key].replace(/\\n/gi, '\n').replace(/^'|'$/gi, '')
          }
        })
        return result;
      })
    )
  }
}

const singletonInstance = new ParseSQL();
const singletonMethod = function() {
  return singletonInstance.parse.apply(singletonInstance, arguments);
}

module.exports = singletonMethod;
module.exports.default = singletonMethod;
module.exports.parseSQL = singletonInstance;
module.exports.ParseSQL = ParseSQL;
