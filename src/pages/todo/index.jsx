import React, { useState } from 'react';
import StandardCalendar from './StandardCalendar';

import styles from './index.less';

const Todo = () => {
  const [events, setEvents] = useState({});
  setEvents({});

  return (
    <section className={styles.wrapper}>
      <StandardCalendar events={events} />
    </section>
  );
};

export default Todo;
