import mixitup from 'mixitup'

const containerEl = document.querySelector('.collections')
if (containerEl) {
  const mixer = mixitup(containerEl, {
    callbacks: {
      onMixStart: function (state, futureState) {},
    },
  })
}
