export default function _throttle(fn, time) {

    let _self = fn,
        timer,
        firstTime = true //记录是否是第一次执行的flag

    return function () {
        let args = arguments, //解决闭包传参问题
            _me = this //解决上下文丢失问题

        if (firstTime) { //若是第一次，则直接执行
            _self.apply(_me, args)
            return firstTime = false
        }
        if (timer) { //定时器存在，说明有事件监听器在执行，直接返回
            return false
        }

        timer = setTimeout(function () {
            clearTimeout(timer)
            timer = null
            _self.apply(_me, args)
        }, time || 500)
    }
}