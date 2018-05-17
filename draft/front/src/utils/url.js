export default function formatUrl(string) {
    const regex = /\[([\s\S]*?)\]\(([\s\S]+?)\)/ig
    return string.replace(regex, (match, name, url) => {
        // const [, name, url] = regex.exec(match)
        const urlName = url.replace(/https?:\/\//,'')
        const shortUrl = urlName.slice(0, 15)
        return `<a href="${url}" target="_blank"${!name && urlName !== shortUrl ? ` class="ellipsis"` :''}><i class="iconfont">&#xe66a;</i>${name ? name : shortUrl.replace(/\/$/, '')}</a>`
    })
}