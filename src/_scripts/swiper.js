import Swiper, { Navigation } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'

const slider = document.getElementsByClassName('swiper')

$params = {
  slidesPerView: 1,
  modules: [Navigation],
  centeredSlides: true,
  spaceBetween: 0,
  loop: true,
  watchSlidesVisibility: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  effect: 'creative',
  creativeEffect: {
    prev: {
      translate: [0, 0, -400],
      scale: '75%',
      opacity: '75%',
    },
    next: {
      translate: ['100%', 0, 0],
      scale: '75%',
      opacity: '75%',
    },
  },
}

for (let i = 0; i < slider.length; i++) {
  if (slider[i].classList.contains('featured-portfolio')) {
    const swiper = new Swiper(slider[i], $params)
  } else {
    const swiper = new Swiper(slider[i], {
      slidesPerView: 3,
      spaceBetween: 30,
    })
  }
}
