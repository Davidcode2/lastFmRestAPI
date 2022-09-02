import axios from 'axios';
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';

export class ArtistData {

  private artistMatches = null;
  private API_KEY: string = "e127749bf371f1ce1ed7da239ed7b5ec";
  private app: Express;

  constructor(app: Express) {
    this.app = app;
  }

  signIn() {
    axios
      .get(`http://www.last.fm/api/auth/?api_key=e127749bf371f1ce1ed7da239ed7b5ec`)
      .then(res => {
        console.log(res.status);
      });
  }

  getArtistEndpoint() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    this.app.get('/api/get', (req: Request, response: Response) => {
      let artist = req.query.artist;
      Promise.all([this.getArtists(artist as any)])
        .then(res => {
          this.artistMatches = res[0].data.results.artistmatches;
          response.send(this.artistMatches);
        })
        .catch(error => {
          console.error(error);
        });
    });
  }

  async getArtists(name: string) {
    console.log(name);
    return axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${name}&api_key=${this.API_KEY}&format=json`);
  }

  public get ArtistMatches() {
    return this.artistMatches;
  }
}
