import { Button } from 'antd';
import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

const LoginSubmit = ({ className, ...rest }) => {
  const clsString = classNames(styles.submit, className);
  return <Button size="large" className={clsString} type="primary" htmlType="submit" {...rest} />;
};
export default LoginSubmit;
// # sourceMappingURL=LoginSubmit.jsx.map
