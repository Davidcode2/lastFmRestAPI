import axios from 'axios';
import { Artists } from './artists';

export class Save {

  private artists: Artists;
  private saveButton: HTMLAnchorElement = document.querySelector(".saveButton");

  constructor(artists: Artists) {
    this.artists = artists;
  }

  start() {
    //this.getFilePath();
    this.createButton(this.saveArtists);
  }

  saveArtists() {
    //  let path = this.getFilePath();
    let artistValues = this.artistValues();
    let headerArray = this.makeHeaderArray();
    let csv = this.formatCsv(headerArray, ",", artistValues);
    this.download(csv);
  }

  createButton(callback: Function) {
    if (this.saveButton) {
      //let fileContent = this.artists.Artists;
      this.saveButton.addEventListener('click', callback.bind(this));
    }
  }

  formatCsv(arrayHeader, delimiter, arrayData) {
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


  artistValues() {
    let artistsRaw = this.artists.Artists;
    let values = [];
    for (let i = 0; i < artistsRaw.length; i++) {
     values.push(Object.values(artistsRaw[i]));
    }
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
