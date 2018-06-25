import { throttle } from './utils'
let viewportHeight = window.innerHeight
let viewportWidth = window.innerWidth

window.addEventListener('resize', throttle(() => {
    viewportHeight = window.innerHeight
}, 500))

export { viewportWidth, viewportHeight }