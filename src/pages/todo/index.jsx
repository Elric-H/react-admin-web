import React, { useEffect, useState } from 'react';
import StandardCalendar from './StandardCalendar';

import styles from './index.less';

const Todo = () => {
  const [events, setEvents] = useState({});

  useEffect(() => {
    setEvents({});
  }, []);

  return (
    <section className={styles.wrapper}>
      <StandardCalendar events={events} />
    </section>
  );
};

export default Todo;
