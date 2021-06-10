import React, { useReducer, useState } from 'react';
import { Calendar, Row, Col, DatePicker, Radio, Timeline, Modal } from 'antd';
import { LeftOutlined, RightOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { flatten } from 'lodash';
import moment from 'moment';

import locale from './locale';
import styles from './index.less';
import DateCell from '@/pages/todo/Cell';

const StandardCalendar = ({ ...props }) => {
  const { events } = props;
  console.log(events);

  const [type, setType] = useState('month');
  const [date, setDate] = useState(moment());
  const [visible, setVisible] = useState(false);
  const initaialState = { list: [], checking: false };

  const formatList = (list, d) => {
    // 插入新的日期
    let arr = flatten(list);
    arr.push(d);
    // 根据最大日期和最小日期生成新数组
    const max = arr.reduce((p, n) => (p.isBefore(n) ? n : p));
    const min = arr.reduce((p, n) => (p.isBefore(n) ? p : n));
    arr = [];
    for (let i = 0; i <= max.dayOfYear() - min.dayOfYear(); i += 1) {
      arr.push(moment(min).add(i, 'day'));
    }
    return arr;
  };

  const numReducer = (state, action) => {
    const { payload = {} } = action;
    const { checking } = payload;
    if (action.type === 'hover') {
      return {
        ...state,
        list: formatList(state.list, payload.date),
      };
    }
    if (action.type === 'up') {
      return {
        ...state,
        list: [],
        checking: false,
      };
    }
    return {
      list: formatList(state.list, payload.date),
      checking: checking || false,
    };
  };

  const [state, dispatch] = useReducer(numReducer, initaialState);
  const { list, checking } = state;

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
    return null;
  };

  const monthCellRender = (value) => {
    const n = getMonthData(value);
    return n ? (
      <div className="notes-month">
        <section>{n}</section>
        <span>本月待办事项</span>
      </div>
    ) : null;
  };

  const handleChecked = (day) => {
    dispatch({
      type: 'checked',
      payload: {
        checking: true,
        date: day,
      },
    });
  };

  const handleHover = (day) => {
    dispatch({
      type: 'hover',
      payload: {
        date: day,
      },
    });
  };

  const handleMouseUp = () => {
    setVisible(true);
    dispatch({
      type: 'up',
    });
  };

  const renderByType = () => {
    if (type === 'timeline') {
      return (
        <section className={styles.timeline}>
          <Timeline mode="alternate">
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
            <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo.
            </Timeline.Item>
            <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
              Technical testing 2015-09-01
            </Timeline.Item>
          </Timeline>
        </section>
      );
    }
    return (
      <Calendar
        locale={locale}
        monthCellRender={monthCellRender}
        dateCellRender={(v) => (
          <DateCell
            onChecked={handleChecked}
            onHover={handleHover}
            onMouseUp={handleMouseUp}
            value={v}
            list={list}
            isChecking={checking}
          />
        )}
        headerRender={() => null}
        value={date}
        mode={type}
      />
    );
  };

  return (
    <div className={styles.cal}>
      <Modal title="新建日程" visible={visible} onCancel={() => setVisible(false)}>
        <p>添加日程</p>
        <p>添加日程</p>
        <p>添加日程</p>
        <p>添加日程</p>
      </Modal>
      <div style={{ padding: 8 }}>
        <Row gutter={8} justify="space-between">
          <Col className={styles.operate}>
            <LeftOutlined
              onClick={() => {
                const d = date.clone();
                setDate(d?.subtract(1, 'months'));
              }}
            />
            <DatePicker
              picker="month"
              inputReadOnly
              value={date}
              suffixIcon={null}
              bordered={false}
              allowClear={false}
              format="YYYY年MM月"
              onChange={(v) => setDate(v)}
            />
            <RightOutlined
              onClick={() => {
                const d = date.clone();
                setDate(d?.add(1, 'months'));
              }}
            />
          </Col>
          <Col className={styles.right}>
            <Radio.Group
              onChange={(e) => {
                const checked = e.target.value;
                setType(checked);
              }}
              className={styles.radio}
              value={type}
              buttonStyle="solid"
            >
              <Radio.Button value="timeline">时间轴</Radio.Button>
              <Radio.Button value="year">年</Radio.Button>
              <Radio.Button value="month">月</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
      </div>
      {renderByType()}
    </div>
  );
};

export default StandardCalendar;
