import chai from 'chai';
import sinonChai from 'sinon-chai';
import { JSDOM } from 'jsdom';

before(function () {
  chai.use(sinonChai);

  const dom = new JSDOM(
    `<html>
         <body>
         </body>
       </html>`,
    { url: 'http://localhost' },
  );
  global.window = dom.window as unknown as Window & typeof globalThis;
  global.document = dom.window.document;
  global.CustomEvent = dom.window.CustomEvent;
});
