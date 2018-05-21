export default function _debounce(fn, wait, time) {
    let previous = null; //记录上一次运行的时间
    let timer = null;

    return function () {
        var now = +new Date();

        if (!previous) previous = now;
        //当上一次执行的时间与当前的时间差大于设置的执行间隔时长的话，就主动执行一次
        if (now - previous > time) {
            clearTimeout(timer);
            fn();
            previous = now;// 执行函数后，马上记录当前时间
        } else {
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn();
            }, wait);
        }
    }
}