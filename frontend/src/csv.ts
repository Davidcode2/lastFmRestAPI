import axios from 'axios';
import { Artists } from './artists';

export class Save {

  private artists: Artists;
  private saveButton: HTMLAnchorElement = document.querySelector(".saveButton");
  private headerFilter = ["name", "mbid", "url"];

  constructor(artists: Artists) {
    this.artists = artists;
  }

  start() {
    //this.getFilePath();
    this.createButton(this.saveArtists);
  }

  saveArtists() {
    //  let path = this.getFilePath();
    let artistValues = this.artistValues(this.headerFilter);
    let headerArray = this.makeHeaderArray();
    let csv = this.formatCsv(this.headerFilter, headerArray, ",", artistValues);
    this.download(csv);
  }

  createButton(callback: Function) {
    if (this.saveButton) {
      //let fileContent = this.artists.Artists;
      this.saveButton.addEventListener('click', callback.bind(this));
    }
  }

  formatCsv(headerFilter, arrayHeader, delimiter, arrayData) {
    arrayHeader = arrayHeader.filter((header) => headerFilter.includes(header));
    let header = arrayHeader.join(delimiter) + '\n';
    let csv = header;
    arrayData.forEach(array => {
      csv += array.join(delimiter) + "\n";
    });
    return csv;
  }

  makeHeaderArray() {
    let artistsRaw = this.artists.Artists;
    let header = [];
    return Object.keys(artistsRaw[0]);
  }

  artistValues(headerFilter) {
    let artistsRaw = this.artists.Artists;
    let values = [];
    for (let i = 0; i < artistsRaw.length; i++) {
      let artist = []
      artist.push(artistsRaw[i].name);
      artist.push(artistsRaw[i].mbid);
      artist.push(artistsRaw[i].url);
      values.push(artist);
    }
    console.log(values);
    return values;
  }

  download(data, filename?: string) {
    let anchor = document.createElement('a');
    let fileContent = data;
    var blob = new Blob([fileContent], { type: 'text/csv' });
    anchor.href = window.URL.createObjectURL(blob);
    anchor.download = "artists.csv";
    anchor.click();
  }

  getFilePath() {
    let saveButton = document.querySelector(".saveButton");
    saveButton.addEventListener('click', () => {
      let myPrompt = prompt('Enter filepath here');
    });
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {
      //var file = e.target.files[0];
    }

    input.click();
  }

}
