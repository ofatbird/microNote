const request = require('request')

// request('https://api.imjad.cn/cloudmusic/?type=search&search_type=1&s=cocoon', function (err, status, body) {
//     if (err) {
//         console.log(err)
//     } else {
//         const data = JSON.parse(body)
//         console.log(data.result.songs.length)
//     }
// })

function getSong(song, artist) {
    return new Promise((resolve, reject) => {
        console.log(song)
        request(`https://api.imjad.cn/cloudmusic/?type=search&search_type=1&s=${song}`, function (err, status, body) {
            if (err) {
                reject(err)
            } else {
                console.log(body)
                const data = JSON.parse(body)
                const {songs} = data.result
                const hit = {}
                for (let i = 0; i < songs.length; i++) {
                    if (songs[i].ar[0].name.toLowerCase() == artist.toLowerCase()) {
                        hit['id'] = songs[i].id
                        hit['singer'] = songs[i].ar[0].name
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
// getSong('everytime', 'shane filan')