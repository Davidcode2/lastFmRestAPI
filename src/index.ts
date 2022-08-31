import { ArtistData } from "./artistData";

class App {

  artistData: ArtistData;

  constructor() {
    this.artistData = new ArtistData();
  }

  start() {
    this.artistData.getArtist("drake");
  }
}

let app = new App();
app.start();
