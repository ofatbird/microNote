import { debounce } from './utils'
let viewportHeight = window.innerHeight

window.addEventListener('resize', debounce(() => {
    viewportHeight = window.innerHeight
}, 500, 2000))

export{ viewportHeight }