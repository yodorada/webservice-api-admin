import React from 'react';
import Divider from 'material-ui/Divider';

const defaultStyle = { marginTop: 10, marginBottom: 10 };

const WrappedDivider = () => {
  return (
    <div>
      <Divider style={defaultStyle} />
    </div>
  );
};
export default WrappedDivider;
