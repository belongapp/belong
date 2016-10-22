import React from 'react';
import Relay from 'react-relay';

import A from 'components/A';
import Img from 'components/Img';
import ViewerWidget from 'containers/ViewerWidget';
import Banner from './banner.jpg';
import styles from './styles.css';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    viewer: React.PropTypes.object.isRequired,
    location: React.PropTypes.string.isRequired,
  };

  render() {
    return (
      <div>
        <A className={styles.logoWrapper} href="https://twitter.com/mxstbr">
          <Img className={styles.logo} src={Banner} alt="react-boilerplate - Logo" />
        </A>
        <div className={styles.buttons}>
          {this.props.location !== '/login' && <ViewerWidget viewer={this.props.viewer} />}
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(Header, {
  fragments: {
    viewer: () => Relay.QL`        
      fragment on Viewer {
        ${ViewerWidget.getFragment('viewer')}
      }
    `,
  },
});
