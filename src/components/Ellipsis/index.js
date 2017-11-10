import React, { Component } from 'react';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

/* eslint react/no-did-mount-set-state: 0 */
/* eslint no-param-reassign: 0 */

const isSupportLineClamp = (document.body.style.webkitLineClamp !== undefined);

const EllipsisText = ({ text, length, tooltip, ...other }) => {
  if (typeof text !== 'string') {
    throw new Error('Ellipsis children must be string.');
  }
  if (text.length <= length || length < 0) {
    return <span {...other}>{text}</span>;
  }
  const tail = '...';
  let displayText;
  if (length - tail.length <= 0) {
    displayText = '';
  } else {
    displayText = text.slice(0, (length - tail.length));
  }

  if (tooltip) {
    return <Tooltip title={text}><span>{displayText}{tail}</span></Tooltip>;
  }

  return (
    <span {...other}>
      {displayText}{tail}
    </span>
  );
};

export default class Ellipsis extends Component {
  state = {
    text: '',
    targetCount: 0,
  }

  componentDidMount() {
    if (this.node) {
      this.computeLine();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lines !== nextProps.lines) {
      this.computeLine();
    }
  }

  computeLine = () => {
    const { lines } = this.props;
    if (lines && !isSupportLineClamp) {
      const fontSize = parseInt(window.getComputedStyle(this.node).fontSize, 10) || 14;
      const text = this.shadowChildren.innerText;
      const targetWidth = (this.node.offsetWidth || this.node.parentNode.offsetWidth) * lines;
      const shadowNode = this.shadow.firstChild;

      // bisection
      const tw = (targetWidth - (lines * (fontSize / 2)) - fontSize);
      const len = text.length;
      const mid = Math.floor(len / 2);

      const count = this.bisection(tw, mid, 0, len, text, shadowNode);

      this.setState({
        text,
        targetCount: count,
      });
    }
  }

  bisection = (tw, m, b, e, text, shadowNode) => {
    let mid = m;
    let end = e;
    let begin = b;
    shadowNode.innerHTML = text.substring(0, mid);
    let sw = shadowNode.offsetWidth;

    if (sw < tw) {
      shadowNode.innerHTML = text.substring(0, mid + 1);
      sw = shadowNode.offsetWidth;
      if (sw >= tw) {
        return mid;
      } else {
        begin = mid;
        mid = Math.floor((end - begin) / 2) + begin;
        return this.bisection(tw, mid, begin, end, text, shadowNode);
      }
    } else {
      if (mid - 1 < 0) {
        return mid;
      }
      shadowNode.innerHTML = text.substring(0, mid - 1);
      sw = shadowNode.offsetWidth;
      if (sw <= tw) {
        return mid;
      } else {
        end = mid;
        mid = Math.floor((end - begin) / 2) + begin;
        return this.bisection(tw, mid, begin, end, text, shadowNode);
      }
    }
  }

  handleRef = (n) => {
    this.node = n;
  }

  handleShadow = (n) => {
    this.shadow = n;
  }

  handleShadowChildren = (n) => {
    this.shadowChildren = n;
  }

  render() {
    const { text, targetCount } = this.state;
    const {
      children,
      lines,
      length,
      className,
      tooltip,
      ...restProps
    } = this.props;


    const cls = classNames(styles.ellipsis, className, {
      [styles.lines]: (lines && !isSupportLineClamp),
      [styles.lineClamp]: (lines && isSupportLineClamp),
    });

    if (!lines && !length) {
      return (<span className={cls} {...restProps}>{children}</span>);
    }

    // length
    if (!lines) {
      return (<EllipsisText className={cls} length={length} text={children || ''} tooltip={tooltip} {...restProps} />);
    }

    const id = `antd-pro-ellipsis-${`${new Date().getTime()}${Math.floor(Math.random() * 100)}`}`;

    // support document.body.style.webkitLineClamp
    if (isSupportLineClamp) {
      const style = `#${id}{-webkit-line-clamp:${lines};}`;
      return (
        <div id={id} className={cls} {...restProps}>
          <style>{style}</style>
          {
            tooltip ? (<Tooltip title={text}>{children}</Tooltip>) : children
          }
        </div>);
    }

    const childNode = (
      <span>
        {
          (targetCount > 0) && text.substring(0, targetCount)
        }
        {
          (targetCount > 0) && (targetCount < text.length) && '...'
        }
      </span>
    );

    return (
      <div
        {...restProps}
        ref={this.handleRef}
        className={cls}
      >
        {
          tooltip ? (
            <Tooltip title={text}>{childNode}</Tooltip>
          ) : childNode
        }
        <div className={styles.shadow} ref={this.handleShadowChildren}>{children}</div>
        <div className={styles.shadow} ref={this.handleShadow}><span>{text}</span></div>
      </div>
    );
  }
}