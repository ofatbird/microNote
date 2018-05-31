import { throttle } from './utils'
let viewportHeight = window.innerHeight

window.addEventListener('resize', throttle(() => {
    viewportHeight = window.innerHeight
}, 500))

export { viewportHeight }