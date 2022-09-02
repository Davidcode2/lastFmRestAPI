import { Express } from 'express';
import { ArtistData } from './artistData';
import fs from 'fs';

export class CsvSaver {

  private artistData: ArtistData;
  private app: Express;

  constructor(app: Express, artistData: ArtistData) {
    this.app = app;
    this.artistData = artistData;
  }

  postFileNameEndpoint() {
    this.app.post('/api/post', (req, res) => {
      let filename = req.query.filepath;
      if (this.artistData.ArtistMatches) {
        fs.writeFile(filename as string, this.artistData.ArtistMatches, () => {
          console.log(`file written: ${filename}`);
        })
      }

    });
  }

}
