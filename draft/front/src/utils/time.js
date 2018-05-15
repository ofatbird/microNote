export default function format(time) {
    const date = new Date(time)
    const cur_date = new Date()
    const isThisYear = cur_date.getFullYear() === date.getFullYear()
    const isThisMonth = isThisYear && (cur_date.getMonth() === date.getMonth())
    const year = isThisYear ? `` : `${date.getFullYear()}-`
    const hour_minute = isThisYear ? `${date.getHours()}:${date.getMinutes()}`: ``
    let month_day = !isThisYear ?`${date.getMonth() + 1}-${date.getDate()}` : `${date.getMonth() + 1}月${date.getDate()}日`
    if (isThisMonth) {
        switch(cur_date.getDate() - date.getDate()) {
            case 0: month_day = `今天`
                    break
            case 1: month_day = `昨天`
                    break
            case 2: month_day = `前天`
                    break
            default: void 0
        }
    }
    return `${year}${month_day} ${hour_minute}`.replace(/^\s|\s$/g, ``)
}