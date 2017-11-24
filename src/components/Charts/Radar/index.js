import React, { PureComponent } from 'react';
import G2 from 'g2';
import { Row, Col } from 'antd';
import equal from '../equal';
import styles from './index.less';

/* eslint react/no-danger:0 */
class Radar extends PureComponent {
  state = {
    legendData: [],
  }

  componentDidMount() {
    this.renderChart(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    if (!equal(this.props, nextProps)) {
      this.renderChart(nextProps.data);
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  handleRef = (n) => {
    this.node = n;
  }

  handleLegendClick = (item, i) => {
    const newItem = item;
    newItem.checked = !newItem.checked;

    const { legendData } = this.state;
    legendData[i] = newItem;

    if (this.chart) {
      const filterItem = legendData.filter(l => l.checked).map(l => l.name);
      this.chart.filter('name', filterItem);
      this.chart.repaint();
    }

    this.setState({
      legendData,
    });
  }

  renderChart(data) {
    const { height = 0,
      hasLegend = true,
      fit = true,
      tickCount = 4,
      margin = [24, 30, 16, 30] } = this.props;

    const colors = [
      '#1890FF', '#FACC14', '#2FC25B', '#8543E0', '#F04864', '#13C2C2', '#fa8c16', '#a0d911',
    ];

    if (!data || (data && data.length < 1)) {
      return;
    }

    // clean
    this.node.innerHTML = '';

    const chart = new G2.Chart({
      container: this.node,
      forceFit: fit,
      height: height - (hasLegend ? 80 : 22),
      plotCfg: {
        margin,
      },
    });

    this.chart = chart;

    chart.source(data, {
      value: {
        min: 0,
        tickCount,
      },
    });

    chart.coord('polar');
    chart.legend(false);

    chart.axis('label', {
      line: null,
      labelOffset: 8,
      labels: {
        label: {
          fill: 'rgba(0, 0, 0, .65)',
        },
      },
      grid: {
        line: {
          stroke: '#e9e9e9',
          lineWidth: 1,
          lineDash: [0, 0],
        },
      },
    });

    chart.axis('value', {
      grid: {
        type: 'polygon',
        line: {
          stroke: '#e9e9e9',
          lineWidth: 1,
          lineDash: [0, 0],
        },
      },
      labels: {
        label: {
          fill: 'rgba(0, 0, 0, .65)',
        },
      },
    });

    chart.line().position('label*value').color('name', colors);
    chart.point().position('label*value').color('name', colors).shape('circle')
      .size(3);

    chart.render();

    if (hasLegend) {
      const geom = chart.getGeoms()[0]; // 获取所有的图形
      const items = geom.getData(); // 获取图形对应的数据
      const legendData = items.map((item) => {
        /* eslint no-underscore-dangle:0 */
        const origin = item._origin;
        const result = {
          name: origin[0].name,
          color: item.color,
          checked: true,
          value: origin.reduce((p, n) => p + n.value, 0),
        };

        return result;
      });

      this.setState({
        legendData,
      });
    }
  }

  render() {
    const { height, title, hasLegend } = this.props;
    const { legendData } = this.state;

    return (
      <div className={styles.radar} style={{ height }}>
        <div>
          {title && <h4>{title}</h4>}
          <div ref={this.handleRef} />
          {
            hasLegend && (
              <Row className={styles.legend}>
                {
                  legendData.map((item, i) => (
                    <Col
                      span={(24 / legendData.length)}
                      key={item.name}
                      onClick={() => this.handleLegendClick(item, i)}
                    >
                      <div className={styles.legendItem}>
                        <p>
                          <span className={styles.dot} style={{ backgroundColor: !item.checked ? '#aaa' : item.color }} />
                          <span>{item.name}</span>
                        </p>
                        <h6>{item.value}</h6>
                      </div>
                    </Col>
                  ))
                }
              </Row>
            )
          }
        </div>
      </div>
    );
  }
}

export default Radar;
