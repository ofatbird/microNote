const stitch = window.stitch

export default class fetchMongo {
    constructor() {
        this.client = null
        this.database = null
    }
    static isLogin = false

    init = async () => {
        if (fetchMongo.isLogin) return
        this.client = await stitch.StitchClientFactory.create('micro-note-sstqf')
        this.database = this.client.service('mongodb', 'mongodb-atlas').db('microNote')
        await this.client.login()
        fetchMongo.isLogin = true
    }

    fetch = async (query) => {
        return await this.database.collection('micronotes').find(query||{ create_at: { $lt: Date.now() } }).sort({ create_at: -1 }).limit(20).execute()
    }
}