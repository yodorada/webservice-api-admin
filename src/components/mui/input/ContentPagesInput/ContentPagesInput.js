import React, { Component } from 'react';
import PropTypes from 'prop-types';
import inflection from 'inflection';
import ContentParentPageInput from './ContentParentPageInput';

class ContentPagesInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(t) {
    var contentpages = [],
      page,
      sub;

    for (var ref in this.refs) {
      sub = [];
      for (var subref in this.refs[ref].refs) {
        sub.push({
          active: this.refs[ref].refs[subref].state.checked,
          label: this.refs[ref].refs[subref].props.label,
          key: this.refs[ref].refs[subref].props.alias
        });
      }
      page = {
        active: this.refs[ref].state.checked,
        label: this.refs[ref].props.label,
        key: this.refs[ref].props.alias,
        subpages: sub
      };
      contentpages.push(page);
    }
    this.props.input.onChange(contentpages);
  }

  render() {
    const {
      label,
      source,
      touched,
      error,
      elStyle,
      options,
      input
    } = this.props;

    return (
      <div className="contentpagesinput" style={{ marginTop: 20 }}>
        <div style={{ paddingBottom: 15 }}>
          <label style={{ fontSize: 18, fontWeight: 700 }}>
            {label || inflection.humanize(source)}
          </label>
        </div>
        {input.value.map((page, n) => (
          <ContentParentPageInput
            ref={`pagecontent_parent_${n}`}
            key={`pagecontent_parent_${n}`}
            num={n}
            alias={page.key}
            subpages={page.subpages}
            label={page.label}
            active={page.active}
            onChange={targ => this.handleChange(targ)}
          />
        ))}
      </div>
    );
  }
}

ContentPagesInput.propTypes = {
  addField: PropTypes.bool.isRequired,
  label: PropTypes.string,
  options: PropTypes.object,
  source: PropTypes.string,
  input: PropTypes.object
};

ContentPagesInput.defaultProps = {
  addField: true
};

export default ContentPagesInput;
