import React from 'react';
import PropTypes from 'prop-types';
import { Store } from '../';
import { slideWidth, slideTrayWidth } from '../helpers';

export default class CarouselProvider extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    currentSlide: PropTypes.number,
    hasMasterSpinner: PropTypes.boolean,
    step: PropTypes.number,
    totalSlides: PropTypes.number,
    visibleSlides: PropTypes.number,
  }

  static defaultProps = {
    currentSlide: 0,
    hasMasterSpinner: false,
    step: 1,
    totalSlides: 0,
    visibleSlides: 1,
  }

  static childContextTypes = {
    store: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);
    const options = {
      currentSlide: props.currentSlide,
      hasMasterSpinner: props.hasMasterSpinner,
      imageErrorCount: 0,
      imageSuccessCount: 0,
      slideTrayWidth: slideTrayWidth(props.totalSlides, props.visibleSlides),
      slideWidth: slideWidth(props.totalSlides),
      step: props.step,
      totalSlides: props.totalSlides,
      visibleSlides: props.visibleSlides,
    };
    this.store = new Store(options);
  }

  getChildContext() {
    return { store: this.store };
  }

  render() {
    return <div className="carousel">{this.props.children}</div>;
  }
}
