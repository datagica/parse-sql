const chai = require('chai')
chai.use(require('chai-fuzzy'))
const expect = chai.expect

const parseSQL = require("../lib/parse-sql");

describe('@datagica/parse-sql', function () {

  it('should extract the data from SQ inserts', function(done) {

    Promise.all(
      [{

        input: `
        INSERT INTO cable (id, date, refid, classification, origin, destination, header, content) VALUES (1, '1966-12-28 00:00:00', '66BUENOSAIRES2481', 'UNCLASSIFIED', 'Embassy Buenos Aires', '66STATE106206', 'P R 281848Z DEC 66
        FM AMEMBASSY BUENOS AIRES
        TO SECSTATE WASHDC PRIORITY
        INFO USCINCSO
        CINCLANT
        AMEMBASSY RIO DE JANEIRO
        AMEMBASSY SANTIAGO
        AMEMBASSY MONTEVIDEO
        AMEMBASSY QUITO
        AMEMBASSY LIMA
        AMEMBASSY MEXICO
        AMEMBASSY OTTAWA
        AMEMBASSY LONDON
        STATE GRNC', '
        UNCLASSIFIED BUENOS AIRES 2481

        Original Telegram was Confidential but has since been
        de-classified');
        INSERT INTO cable (id, date, refid, classification, origin, destination, header, content) VALUES (2, '1666-12-28 00:00:00', 'TEST', 'CLASSIFIED', 'Embassy Poudlard', '666', 'P R 281848Z DEC 66
        this is another test.
        ');
        `,

        output: null
      }].map(test => {
        return parseSQL(test.input).then(output => {
          console.log(JSON.stringify(output));
          //expect(output).to.be.like(test.output)
          return Promise.resolve(true)
        })
      })).then(finished => {
      done()
    }).catch(exc => {
      console.error(exc)
    })
  })
})
