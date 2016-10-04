/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import Helmet from 'react-helmet';

import messages from './messages';
import { FormattedMessage } from 'react-intl';
import H1 from 'components/H1';

import styles from './styles.css';

export default class FeaturePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Feature Page"
          meta={[
            { name: 'description', content: 'Feature page of React.js Boilerplate application' },
          ]}
        />
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <p className={styles.listItemTitle}>
              <FormattedMessage {...messages.scaffoldingHeader} />
            </p>
            <p>
              <FormattedMessage {...messages.scaffoldingMessage} />
            </p>
          </li>

          <li className={styles.listItem}>
            <p className={styles.listItemTitle}>
              <FormattedMessage {...messages.feedbackHeader} />
            </p>
            <p>
              <FormattedMessage {...messages.feedbackMessage} />
            </p>
          </li>

          <li className={styles.listItem}>
            <p className={styles.listItemTitle}>
              <FormattedMessage {...messages.routingHeader} />
            </p>
            <p>
              <FormattedMessage {...messages.routingMessage} />
            </p>
          </li>

          <li className={styles.listItem}>
            <p className={styles.listItemTitle}>
              <FormattedMessage {...messages.networkHeader} />
            </p>
            <p>
              <FormattedMessage {...messages.networkMessage} />
            </p>
          </li>

          <li className={styles.listItem}>
            <p className={styles.listItemTitle}>
              <FormattedMessage {...messages.intlHeader} />
            </p>
            <p>
              <FormattedMessage {...messages.intlMessage} />
            </p>
          </li>
        </ul>
      </div>
    );
  }
}
