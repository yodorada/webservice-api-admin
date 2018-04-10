import {
  grey100,
  grey300,
  grey400,
  grey500,
  white,
  darkBlack,
  fullBlack
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

import styles from '../media/scss/App.css';

const yodoradaColor = styles.yodoradaColor;
const brandPrimary = styles.brandPrimary;
const brandPrimaryDark = styles.brandPrimaryDark;

const yodorada = {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: brandPrimary,
    primary2Color: brandPrimaryDark,
    primary3Color: grey400,
    accent1Color: yodoradaColor,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: brandPrimary,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack
  },
  tabs: {
    backgroundColor: white,
    button: { color: brandPrimary }
  },
  appBar: {
    color: brandPrimary
  },
  tab: {
    button: { color: brandPrimary }
  },
  toggle: {
    thumbOnColor: brandPrimary,
    trackOnColor: fade(brandPrimary, 0.3)
  }
};

const tableProps = {
  rowColumn: {
    padding: '10px 12px 0',
    minHeight: '48px',
    height: 'auto',
    verticalAlign: 'top',
    textAlign: 'left',
    fontSize: '13px',
    overflow: 'visible',
    whiteSpace: 'wrap',
    backgroundColor: 'inherit'
  },
  headerColumn: {
    padding: '10px 12px 0',
    minHeight: '48px',
    height: 'auto',
    verticalAlign: 'top',
    textAlign: 'left',
    fontSize: '13px',
    overflow: 'visible',
    whiteSpace: 'wrap',
    backgroundColor: 'inherit'
  }
};

const textFieldStyles = {
  fullWidth: true,
  style: {
    maxWidth: 600
  }
};

const tabFormStyles = {
  style: {
    background: '#fff'
  }
};

const contentPageStyles = {
  block: {
    maxWidth: 150
  },
  checkbox: {
    marginBottom: 5
  },
  labelStyle: {
    fontWeight: 'bold'
  },
  subpageStyles: {
    borderBottom: '1px solid #ccc',
    marginBottom: 10
  }
};

const rightsInputStyles = {
  block: {
    maxWidth: 150
  },
  checkbox: {
    marginBottom: 5
  },
  labelStyle: {
    fontWeight: 'bold'
  },
  resourceStyles: {
    borderBottom: '1px solid #e2e2e2',
    marginBottom: 10
  },
  resourceRowStyles: {
    borderTop: '1px solid #e2e2e2'
  }
};

const referenceFieldStyles = {
  color: brandPrimary
};

const svgStyles = {
  hoverColor: brandPrimary
};

const datagridStyles = {
  table: {
    tableLayout: 'auto'
  },
  tbody: {
    height: 'inherit'
  },
  header: {
    th: {
      padding: 0,
      height: '46px'
    },
    'th:first-child': {
      padding: '0 0 0 8px',
      height: '46px'
    }
  },
  cell: {
    td: {
      padding: '4px 4px 4px 12px',
      whiteSpace: 'normal'
    },
    'td:first-child': {
      padding: '0 8px 0 12px',
      whiteSpace: 'normal'
    }
  }
};

const Theme = {
  yodorada,
  textFieldStyles,
  referenceFieldStyles,
  datagridStyles,
  tabFormStyles,
  contentPageStyles,
  rightsInputStyles,
  svgStyles,
  tableProps
};

export default Theme;
