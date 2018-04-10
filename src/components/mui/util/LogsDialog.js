/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import { TextField, ReferenceField, DateField } from 'admin-on-rest';

import Theme from '../../../utils/Theme';

const customContentStyle = {
  width: '100%',
  maxWidth: '1200px'
};

class LogsDialog extends Component {
  render() {
    const { record, onLogHide, locales } = this.props;
    const actions = [
      <FlatButton label="Ok" primary={true} onClick={() => onLogHide()} />
    ];

    return (
      <Dialog
        title={`Log #${record.id}`}
        actions={actions}
        modal={true}
        contentStyle={customContentStyle}
        open={record.dialogOpen}
      >
        <Table selectable={false} multiSelectable={false}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn style={Theme.tableProps.headerColumn}>
                Created
              </TableHeaderColumn>
              <TableHeaderColumn style={Theme.tableProps.headerColumn}>
                Method
              </TableHeaderColumn>
              <TableHeaderColumn style={Theme.tableProps.headerColumn}>
                Controller
              </TableHeaderColumn>
              <TableHeaderColumn style={Theme.tableProps.headerColumn}>
                Resource
              </TableHeaderColumn>
              <TableHeaderColumn style={Theme.tableProps.headerColumn}>
                Code
              </TableHeaderColumn>
              <TableHeaderColumn style={Theme.tableProps.headerColumn}>
                Status
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn style={Theme.tableProps.rowColumn}>
                <DateField source="created" showTime {...this.props} />
              </TableRowColumn>
              <TableRowColumn style={Theme.tableProps.rowColumn}>
                <TextField source="method" {...this.props} />
              </TableRowColumn>
              <TableRowColumn style={Theme.tableProps.rowColumn}>
                <TextField source="controller" {...this.props} />
              </TableRowColumn>
              <TableRowColumn style={Theme.tableProps.rowColumn}>
                <TextField source="resource" {...this.props} />
              </TableRowColumn>
              <TableRowColumn style={Theme.tableProps.rowColumn}>
                <TextField source="httpStatusCode" {...this.props} />
              </TableRowColumn>
              <TableRowColumn style={Theme.tableProps.rowColumn}>
                <TextField source="status" {...this.props} />
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
        <div className="message">
          {record.message !== '' ? (
            <div style={{ paddingLeft: '12px' }}>
              <span style={{ color: 'rgb(158, 158, 158)', fontSize: '13px' }}>
                {' '}
                Message:{' '}
              </span>
              <br />
              <TextField source="message" {...this.props} />
            </div>
          ) : null}
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { logs, locales } = state;
  return {
    record: logs,
    locales
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogHide: () => {
      dispatch({ type: 'LOGS_HIDE' });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LogsDialog);
