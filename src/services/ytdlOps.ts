import ytdl from "ytdl-core";
import ytpl from "ytpl";

class Ytdl {
    async getVideoInfo(link: string) {
        let info = await ytdl.getBasicInfo(link)
        return info
    }

    async getPlaylistInfo(link: string) {
        let info = await ytpl(link, {limit: Infinity})
        return info
    }
}

export default new Ytdl()
