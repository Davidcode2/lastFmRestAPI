import axios from "axios";

export class Search {

  public artists;

  public callback() {
    let searchArgument = document.querySelector("input")!.value;
    console.log(searchArgument);
    let apiString = `/api/get?artist=${searchArgument}`;
    console.log(apiString);
    axios
      .get(apiString)
      .then(res => {
        this.artists = this.extractArtists(res);
        console.log(artists);
      });
  }

  extractArtists(res) {
    return res.data.artist;
  }



}
