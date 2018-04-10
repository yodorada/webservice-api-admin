import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import AutoRenew from 'material-ui/svg-icons/action/autorenew';

import UsersIcon from 'material-ui/svg-icons/social/person';

import LocalStorageUtils from '../../../utils/LocalStorageUtils';
var AppConfig = require('../../../config.json');

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    window.location.reload();
  }
  render() {
    return (
      <div className="dashboardcontent">
        <Card style={{ margin: '1em' }}>
          <CardHeader
            title={`Willkommen ${LocalStorageUtils.get('username')}`}
            subtitle={AppConfig.adminTitle}
            style={{ padding: '16px 16px 0' }}
            titleStyle={{ fontWeight: 'bold', fontSize: '24px' }}
          />

          <CardText style={{ padding: '0px 16px 0' }}>
            {this.props.loginSuccess !== true ? (
              <p>
                Untenstehende Abschnitte enthalten eine kurze Anleitung zur
                Benutzung des Backends.<br />
                Sie können dabei Datensätze erstellen, bearbeiten und löschen.
              </p>
            ) : (
              <div>
                <p>
                  <strong>Hinweis!</strong>
                  <br />Bitte machen Sie nun zuerst einen Seiten-Reload,<br />indem
                  Sie folgenden Button klicken:
                </p>
                <RaisedButton
                  primary
                  label="Seite neu laden"
                  icon={<AutoRenew />}
                  onClick={this.handleClick}
                  style={{ overflow: 'inherit', marginBottom: '16px' }}
                />
              </div>
            )}
          </CardText>
        </Card>
        <div>
          {this.props.loginSuccess !== true ? (
            <Card style={{ margin: '1em' }}>
              <CardHeader
                title="Erklärung"
                subtitle="lorem ipsum"
                titleStyle={{
                  fontWeight: 'bold',
                  fontSize: '18px',
                  color: '#757575'
                }}
                actAsExpander={true}
                showExpandableButton={true}
                avatar={<UsersIcon />}
              />

              <CardText expandable={true} style={{ padding: '0px 16px 0' }}>
                <p
                  className="desc"
                  style={{ fontWeight: 'bold', marginTop: '0' }}
                >
                  Lorem ipsum
                </p>
              </CardText>
            </Card>
          ) : null}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loginSuccess: state.auth.loginSuccess
  };
};

export default connect(mapStateToProps, null)(DashboardPage);
