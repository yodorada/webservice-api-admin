const defaultLog = {
  id: '',
  created: '',
  usersId: '',
  resource: '',
  scope: '',
  method: '',
  controller: '',
  version: '',
  status: '',
  httpStatusCode: '',
  httpStatusString: '',
  message: '',
  dialogOpen: false
};

export default (log = defaultLog, action) => {
  if (action.type === 'LOGS_SHOW') {
    return { dialogOpen: true, ...action.record };
  }
  if (action.type === 'LOGS_HIDE') {
    return defaultLog;
  }
  return log;
};
