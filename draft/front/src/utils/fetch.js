const stitch = window.stitch

export default class fetchMongo {
    constructor() {
        this.client = null
        this.database = null
    }
    init = async () => {
        this.client = await stitch.StitchClientFactory.create('micro-note-sstqf')
        this.database = this.client.service('mongodb', 'mongodb-atlas').db('microNote')
        await this.client.login()
    }
    fetch = async (count) =>{
        console.log(this.client.authedId())
        return await this.database.collection('micronotes').find({create_at: {$lt: Date.now()}}).sort( {create_at: -1} ).limit(20).execute()
    }
}