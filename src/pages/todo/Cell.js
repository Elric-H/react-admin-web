import React, { useEffect, useRef } from 'react';
import styles from '@/pages/todo/index.less';
import get from 'lodash/get';
import AutoSizer from 'react-virtualized-auto-sizer';

const DateCell = ({ value, onChecked, onHover, onMouseUp, list, isChecking }) => {
  const cellRef = useRef();
  const dom = cellRef?.current;

  const handleHover = () => onHover(value);
  const handleClick = () => onChecked(value);
  const handleUp = () => onMouseUp(value);

  useEffect(() => {
    if (dom) {
      dom.addEventListener('mousedown', handleClick, true);
      dom.addEventListener('mouseup', handleUp, true);
      return () => {
        dom.removeEventListener('mousedown', handleClick);
        dom.removeEventListener('mouseup', handleUp);
      };
    }
    return () => null;
  }, [dom]);

  useEffect(() => {
    if (dom) {
      if (isChecking) {
        dom.addEventListener('mouseover', handleHover, true);
        return () => dom.removeEventListener('mouseover', handleHover, true);
      }
      if (!isChecking) {
        dom.removeEventListener('mouseover', handleHover, true);
      }
    }
    return () => {};
  }, [dom, isChecking]);

  const renderTodo = (width) => {
    // 根据是否同一周进行分组
    const arr = [];
    list.forEach((day) => {
      // 找出与当前日期周数相等的日期
      const isEqual = day.format('w') === value.format('w');
      if (isEqual) arr.push(day);
    });
    // 如果当前日期为该周数的数组中的第一个日期
    const first = get(arr, '[0]');
    if (first?.format('DDD') === value?.format('DDD')) {
      const w = width * arr.length + 24 * (arr.length - 1);
      return <span className={styles.todoLine} style={{ width: w }} />;
    }
    return null;
  };

  return (
    <div ref={cellRef} className={styles.cellWrapper}>
      <AutoSizer>
        {({ width, height }) => (
          <ul className={styles.events} style={{ height, width }}>
            {renderTodo(width)}
            {/* {listData.map((item) => (
              <li key={item.id}>
                <Badge status={item.type} text={item.content} />
              </li>
            ))} */}
          </ul>
        )}
      </AutoSizer>
    </div>
  );
};

export default DateCell;
