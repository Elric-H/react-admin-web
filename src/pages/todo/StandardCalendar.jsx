import React, { useState } from 'react';
import { Calendar, Badge, Row, Col, DatePicker, Radio, Timeline } from 'antd';
import { LeftOutlined, RightOutlined, ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

import locale from './locale';
import styles from './index.less';

const StandardCalendar = ({ ...props }) => {
  const { events } = props;
  console.log(events);

  const [type, setType] = useState('month');
  const [date, setDate] = useState(moment());
  const formatCell = (value) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { id: '1', type: 'warning', content: '这是一个代办事项' },
          { id: '2', type: 'success', content: '这是一个代办事项' },
        ];
        break;
      case 10:
        listData = [
          { id: '1', type: 'warning', content: '这是一个代办事项' },
          { id: '2', type: 'success', content: '这是一个代办事项' },
          { id: '3', type: 'error', content: '这是一个代办事项' },
        ];
        break;
      case 15:
        listData = [{ id: '1', type: 'warning', content: '这是一个代办事项' }];
        break;
      default:
    }
    return listData || [];
  };

  const dateCellRender = (value) => {
    const listData = formatCell(value);
    return (
      <ul className={styles.events}>
        {listData.map((item) => (
          <li key={item.id}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
    return null;
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>本月待办事项</span>
      </div>
    ) : null;
  };

  const handleSelectData = (d) => {
    const str = d.format('YYYY-MM-DD');
    console.log(d, str);
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
        onSelect={handleSelectData}
        monthCellRender={monthCellRender}
        dateCellRender={dateCellRender}
        headerRender={() => null}
        value={date}
        mode={type}
      />
    );
  };

  return (
    <div className={styles.cal}>
      <div style={{ padding: 8 }}>
        <Row gutter={8} justify="space-between">
          <Col className={styles.operate}>
            <LeftOutlined />
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
            <RightOutlined />
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
