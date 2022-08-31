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
    this.app.get('/', (req, res) => {
      res.send("works");
    });
    this.app.get('/api/search-artist', (req, res) => {
      let artist = req.query.artist;
      res.json(this.artistData.getArtist(artist as any));
      console.log(req);
    });
    this.app.listen(Program.PORT, function() {
      console.log(`Node server is running on ${Program.PORT}`);
    });
  }
}

let app = new Program();

app.start();
