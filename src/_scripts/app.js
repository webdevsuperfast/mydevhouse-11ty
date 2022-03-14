// Save navigation on click
// const activeNav = (window.activeNav = () => ({
//   value: '/',
//   clicked(e) {
//     window.localStorage.setItem('active', e.target.dataset('label'))
//     this.value = window.localStorage.getItem('active')
//     // console.log(e.target.)
//   },
// }))

const activeNav = document.querySelectorAll(
  'nav a[href^="/' + location.pathname.split('/')[1] + '"]'
)
activeNav[0].classList.add('active')
