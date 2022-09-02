import { ArtistData } from "./artistData";
import { CsvSaver } from "./saveCsv";
import express, { Express } from 'express';
import bodyParser from 'body-parser';

class Program {

  private app: Express = express();
  private static PORT: number = 8081;

  start() {
    this.useBodyParser();
    this.startServer();
    let artistData = new ArtistData(this.app);
    let csvSaver = new CsvSaver(this.app, artistData);
    artistData.getArtistEndpoint();
  }

  startServer() {
    this.app.listen(Program.PORT, () => {
      console.log(`Node server is running on ${Program.PORT}`);
    });
  }

  useBodyParser() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }
}

let app = new Program();

app.start();
