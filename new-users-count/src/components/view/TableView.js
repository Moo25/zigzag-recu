import React from 'react';
import styles from './TableView.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const TableView = () => (
  <div className={cx('hi')}>
    저는 테이블 뷰입니다
  </div>
);

export default TableView;