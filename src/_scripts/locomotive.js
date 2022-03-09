import LocomotiveScroll from 'locomotive-scroll'

import sheet from '../../node_modules/locomotive-scroll/dist/locomotive-scroll.css' assert { type: 'css' }
document.adoptedStyleSheets = [sheet]

const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  direction: 'horizontal',
})
