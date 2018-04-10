import React from 'react';
import { translate } from 'admin-on-rest';

const TranslationUtils = ({ translate, label, obj = {} }) => (
  <span>{translate(label, obj)}</span>
);

export default translate(TranslationUtils);
