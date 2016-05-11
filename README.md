Parse a SQL dump file into JSON


```javascript

parseSQL(`
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
`).then(result => console.log(result))

// output:
[{
  id: 1,
  date: "1966-12-28 00:00:00",
  refid: "66BUENOSAIRES2481",
  classification: "UNCLASSIFIED",
  origin: "Embassy Buenos Aires",
  destination: "66STATE106206",
  header: `P R 281848Z DEC 66
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
        STATE GRNC`,
  content: `
        UNCLASSIFIED BUENOS AIRES 2481

        Original Telegram was Confidential but has since been
        de-classified`
}, {
  id: 2,
  date: "1666-12-28 00:00:00",
  refid: "TEST",
  classification: "CLASSIFIED",
  origin: "Embassy Poudlard",
  destination: "666",
  header: `P R 281848Z DEC 66
          this is another test.
        `
}]
```
