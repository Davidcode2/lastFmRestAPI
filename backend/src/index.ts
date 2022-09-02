import { ArtistData } from "./artistData";
import express from 'express';
import bodyParser from 'body-parser';

class Program {

  static PORT: number = 8081;
  app = express();
  artistData: ArtistData;

  constructor() {
    this.artistData = new ArtistData();
  }

  start() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    this.app.get('/api/get', (req, response) => {
      let artist = req.query.artist;
      Promise.all([this.artistData.getArtists(artist as any)])
        .then(res => {
          response.send(res[0].data.results.artistmatches);
        })
        .catch(error => {
          console.error(error);
        });
    });
    this.app.listen(Program.PORT, function() {
      console.log(`Node server is running on ${Program.PORT}`);
    });
  }
}

let app = new Program();

app.start();
