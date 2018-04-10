import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

class DashboardContent extends Component {
  render() {
    return (
      <Card style={{ margin: '1em' }}>
        <CardHeader
          title={this.props.title}
          subtitle={this.props.subtitle}
          titleStyle={{
            fontWeight: 'bold',
            fontSize: '18px',
            color: '#757575'
          }}
          actAsExpander={true}
          showExpandableButton={true}
          avatar={this.props.icon}
        />

        <CardText expandable={true} style={{ padding: '0px 16px 0' }}>
          <p className="desc" style={{ fontWeight: 'bold', marginTop: '0' }}>
            {this.props.desc}
          </p>
          <ul className="fields">
            {this.props.fields.map(li => <li>{li}</li>)}
          </ul>
          {this.props.hints.length ? (
            <div>
              <p className="hint" style={{ fontWeight: 'bold' }}>
                Bitte beachten Sie bei der Erstellung und Bearbeitung folgende
                Hinweise.
              </p>

              <ul className="hints">
                {this.props.hints.map(li => <li>{li}</li>)}
              </ul>
            </div>
          ) : null}
        </CardText>
      </Card>
    );
  }
}

export default DashboardContent;
