/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';

import messages from './messages';
import { FormattedMessage } from 'react-intl';
import H2 from 'components/H2';

import styles from './styles.css';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <article>
        <Helmet
          meta={[
            { name: 'description', content: 'A prototype meditation timer' },
          ]}
        />
        <div>
          <section className={`${styles.textSection} ${styles.centered}`}>
            <H2>
              <FormattedMessage {...messages.homePageHeader} />
            </H2>
            <p>
              <FormattedMessage {...messages.homePageSubHeader} />
            </p>
          </section>
        </div>
      </article>
    );
  }
}

export default HomePage;
