import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from '../messages';
import Footer from '../index';
import A from 'components/A';

describe('<Footer />', () => {
  it('should render the credits', () => {
    const renderedComponent = shallow(<Footer />);
    expect(renderedComponent.contains(
      <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            author: <A href="https://github.com/belongapp/belong">Belong</A>,
          }}
        />
      </section>
    )).toEqual(true);
  });
});
