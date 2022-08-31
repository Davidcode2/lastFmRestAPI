import axios from 'axios'

export class ArtistData {

  API_KEY: string = "e127749bf371f1ce1ed7da239ed7b5ec";

  signIn() {
    axios
      .get(`http://www.last.fm/api/auth/?api_key=e127749bf371f1ce1ed7da239ed7b5ec`)
      .then(res => {
        console.log(res.status);
      });
  }

  getArtist(name: string) {
    axios
      .get(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${name}&api_key=${this.API_KEY}&format=json`)
      .then(res => {
        console.log(`statusCode: ${res.status}`);
        console.log(res.data.results.artistmatches);
      })
      .catch(error => {
        console.error(error);
      });
  }
}
