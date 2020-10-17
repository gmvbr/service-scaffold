import {describe, it} from 'mocha';
import 'core-js/es7/reflect';

import {expect} from 'chai';
import Server from '../server';

describe('test Service', () => {
  it('test service', async () => {
    const response = await Server.inject({
      method: 'get',
      url: '/service',
    });
    expect(response.json).to.equal(true);
  });
});
