import Ytdl from "../../../src/services/ytdlOps";

jest.setTimeout(10000);
describe("Test for Youtube Node modules", () => {
  describe("ytdl module test", () => {
    it("should verify the duration in seconds of this youtube video ", async () => {
      const response = await Ytdl.getVideoInfo(
        "https://www.youtube.com/watch?v=HfACrKJ_Y2w"
      );
      expect(Number(response.videoDetails.lengthSeconds)).toEqual(42828);
      expect(response.videoDetails.videoId).toEqual("HfACrKJ_Y2w");
    });
  });
  describe("ytpl module test", () => {
    it("should return the number of videos in this youtube playlist", async () => {
      const response = await Ytdl.getPlaylistInfo(
        "https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O"
      );
      expect(Number(response.items.length)).toEqual(84);
    });
  });
});
