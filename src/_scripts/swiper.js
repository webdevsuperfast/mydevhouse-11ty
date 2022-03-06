import Swiper, { Navigation } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'

let slider = document.getElementsByClassName('swiper')

for (var i = 0; i < slider.length; i++) {
  let swiper = new Swiper(slider[i], {
    modules: [Navigation],
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 0,
    loop: true,
    watchSlidesVisibility: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 2000,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
  })
}
