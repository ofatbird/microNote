const request = require('request')
const utf8 = require('utf8')

// request('https://api.imjad.cn/cloudmusic/?type=search&search_type=1&s=cocoon', function (err, status, body) {
//     if (err) {
//         console.log(err)
//     } else {
//         const data = JSON.parse(body)
//         console.log(data.result.songs.length)
//     }
// })

function getSong(song, artist) {
    const songName = utf8.encode(song)
    return new Promise((resolve, reject) => {
        request(`https://api.imjad.cn/cloudmusic/?type=search&search_type=1&s=${songName}`, function (err, status, body) {
            if (err) {
                reject(err)
            } else {
                const data = JSON.parse(body)
                const {songs} = data.result
                const hit = {}
                for (let i = 0; i < songs.length; i++) {
                    if (songs[i].ar[0].name.toLowerCase() == artist.toLowerCase()) {
                        hit['id'] = songs[i].id
                        hit['name'] = `${songs[i].name}-${songs[i].ar[0].name}`
                        hit['url'] = songs[i].al.picUrl
                        break;
                    }
                }
                resolve(hit)
            }
        })
    })

}

module.exports = getSong
// getSong('相思无解', '熊天平').then(music => console.log(music))