import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { changeLocale as changeLocaleAction } from 'admin-on-rest';

class LocaleSwitcher extends Component {
  switchToGerman = () => this.changeLocale('de');
  switchToEnglish = () => this.changeLocale('en');

  render() {
    const { changeLocale } = this.props;
    return (
      <div>
        <div style={styles.label}>Language</div>
        <RaisedButton
          style={styles.button}
          label="en"
          onClick={this.switchToEnglish}
        />
        <RaisedButton
          style={styles.button}
          label="de"
          onClick={this.switchToGerman}
        />
      </div>
    );
  }
}

export default connect(undefined, { changeLocale: changeLocaleAction })(
  LocaleSwitcher
);
