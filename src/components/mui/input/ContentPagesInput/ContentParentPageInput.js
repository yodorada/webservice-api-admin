import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import Theme from '../../../../utils/Theme';
import ContentSubPageInput from './ContentSubPageInput';

class ContentParentPageInput extends Component {
  constructor(props) {
    super(props);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    this.handleSubCheckboxClick = this.handleSubCheckboxClick.bind(this);
    this.state = {
      checked: this.props.active
    };
  }

  handleCheckboxClick(evt, checked) {
    var subActive = false;
    for (var ref in this.refs) {
      if (this.refs[ref].state.checked) {
        subActive = true;
      }
    }
    if (subActive === false && checked === true) {
      for (var subref in this.refs) {
        if (
          this.refs[subref].setState({
            checked: checked,
            parentChecked: checked
          })
        );
      }
    }
    this.setState({ checked: checked });
  }

  componentDidUpdate() {
    this.props.onChange(this);
  }

  handleSubCheckboxClick(targ) {
    var subActive = false;
    for (var ref in this.refs) {
      if (this.refs[ref].state.checked) {
        subActive = true;
      }
    }
    if (
      targ.state.checked === true &&
      targ.state.parentChecked !== true &&
      this.state.checked !== true
    ) {
      this.setState({ checked: true });
    } else if (subActive === false && this.state.checked === true) {
      this.setState({ checked: false });
    } else {
      this.props.onChange(this);
    }
  }

  render() {
    const { num, label } = this.props;

    return (
      <div key={`page_parent_${num}`} className={`parentWrapper wrap_${num}`}>
        <Checkbox
          checkedIcon={<Visibility style={Theme.svgStyles} />}
          uncheckedIcon={<VisibilityOff style={Theme.svgStyles} />}
          label={label}
          checked={this.state.checked}
          labelPosition="left"
          labelStyle={Theme.contentPageStyles.labelStyle}
          style={Theme.contentPageStyles.checkbox}
          onCheck={(evt, checked) => this.handleCheckboxClick(evt, checked)}
        />
        <div className="subpages" style={Theme.contentPageStyles.subpageStyles}>
          {this.props.subpages.map((sub, n) => (
            <ContentSubPageInput
              ref={`pagecontent_sub_${n}`}
              key={`pagecontent_sub_${n}`}
              num={n}
              alias={sub.key}
              label={sub.label}
              active={sub.active}
              parentActive={this.state.checked}
              onChange={targ => this.handleSubCheckboxClick(targ)}
            />
          ))}
        </div>
      </div>
    );
  }
}

ContentParentPageInput.propTypes = {
  num: PropTypes.number.isRequired,
  label: PropTypes.string,
  alias: PropTypes.string,
  active: PropTypes.bool,
  subpages: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

ContentParentPageInput.defaultProps = {
  active: true
};

export default ContentParentPageInput;
