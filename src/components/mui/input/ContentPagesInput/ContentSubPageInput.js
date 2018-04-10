import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import Theme from '../../../../utils/Theme';

class ContentSubPageInput extends Component {
  constructor(props) {
    super(props);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    this.state = {
      checked: this.props.active && this.props.parentActive,
      parentChecked: this.props.parentActive
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (
      this.props.parentActive !== nextProps.parentActive &&
      (nextProps.parentActive === false && this.props.active)
    ) {
      this.setState({
        checked: this.props.active && nextProps.parentActive,
        parentChecked: nextProps.parentActive
      });
    }
  }

  componentDidUpdate() {
    this.props.onChange(this);
  }

  handleCheckboxClick(evt, chk) {
    this.setState({ checked: chk });
  }

  render() {
    const getRowStyle = n =>
      n % 2 === 0
        ? {
            backgroundColor: '#e2e2e2',
            paddingLeft: 20,
            paddingTop: 2,
            paddingBottom: 1
          }
        : { paddingLeft: 20 };

    return (
      <div
        id={`page_subitem_${this.props.num}`}
        key={`page_subitem_${this.props.num}`}
        className={`subitem_${this.props.num}`}
        style={getRowStyle(this.props.num)}
      >
        <Checkbox
          checkedIcon={<Visibility style={Theme.svgStyles} />}
          uncheckedIcon={<VisibilityOff style={Theme.svgStyles} />}
          label={this.props.label}
          checked={this.state.checked}
          labelPosition="left"
          style={Theme.contentPageStyles.checkbox}
          onCheck={(evt, checked) => this.handleCheckboxClick(evt, checked)}
        />
      </div>
    );
  }
}

ContentSubPageInput.propTypes = {
  num: PropTypes.number.isRequired,
  label: PropTypes.string,
  alias: PropTypes.string,
  active: PropTypes.bool,
  parentActive: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

ContentSubPageInput.defaultProps = {
  active: true
};

export default ContentSubPageInput;
