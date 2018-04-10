import React from 'react';
import { connect } from 'react-redux';
import { translate, MenuItemLink, getResources } from 'admin-on-rest';
import inflection from 'inflection';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import FaceIcon from 'material-ui/svg-icons/action/face';
import LogsIcon from 'material-ui/svg-icons/action/track-changes';
import Divider from 'material-ui/Divider';

import LocalStorageUtils from './LocalStorageUtils';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%'
  }
};

const LogEntry = ({ onMenuTap, primaryText }) => (
  <span>
    <Divider />
    <MenuItemLink
      to="/logs"
      primaryText={primaryText}
      leftIcon={<LogsIcon />}
      onClick={onMenuTap}
    />
  </span>
);

const translatedResourceName = (resource, translate) => {
  let label = resource.name;
  return translate(`resources.${label}.name`, {
    smart_count: 2,
    _:
      resource.options && resource.options.label
        ? translate(resource.options.label, {
            smart_count: 2,
            _: resource.options.label
          })
        : inflection.humanize(inflection.pluralize(resource.name))
  });
};

const Menu = ({ resources, translate, onMenuTap, logout }) => (
  <div style={styles.main}>
    <MenuItemLink
      to="/"
      primaryText={translate('aor.page.dashboard')}
      leftIcon={<DashboardIcon />}
      onClick={onMenuTap}
    />
    <Divider />
    <MenuItemLink
      to={`/account/${LocalStorageUtils.get('userId')}`}
      primaryText={translate('yodorada.page.account')}
      leftIcon={<FaceIcon />}
      onClick={onMenuTap}
    />
    <Divider />
    {resources
      .filter(r => r.list && !r.options.hiddenInNav)
      .map(resource => (
        <MenuItemLink
          key={resource.name}
          to={`/${resource.name}`}
          primaryText={translatedResourceName(resource, translate)}
          leftIcon={<resource.icon />}
          onClick={onMenuTap}
        />
      ))}
    <LogEntry
      onMenuTap={onMenuTap}
      primaryText={translate('yodorada.page.logs')}
    />

    <Divider />
    {logout}
  </div>
);
const mapStateToProps = state => ({
  resources: getResources(state)
});
export default connect(mapStateToProps)(translate(Menu));
