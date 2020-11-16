import React, { PureComponent } from 'react';
import styles from './index.less';

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
    };
  }

  componentDidMount() {
    const width = 2 * this.container.getBoundingClientRect().width;
    this.setState({ width });
  }

  render() {
    const { width } = this.state;
    return (
      <div style={{ width: 300, height: 450 }}>
        <div
          ref={(r) => {
            this.container = r;
          }}
          className={styles.container}
        >
          <canvas
            ref={(r) => {
              this.recorder = r;
            }}
            width={width}
            height={width}
          />
        </div>
      </div>
    );
  }
}

export default Index;
