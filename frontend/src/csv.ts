import { Artists } from './artists';

export class Save {

  private artists: Artists;
  private saveButton: HTMLAnchorElement = document.querySelector(".saveButton");
  private headerFilter = ["name", "mbid", "url"];

  constructor(artists: Artists) {
    this.artists = artists;
  }

  start() {
    this.createButton(this.saveArtists);
  }

  createButton(callback: Function) {
    if (this.saveButton) {
      this.saveButton.addEventListener('click', callback.bind(this));
    }
  }

  saveArtists() {
    let headerArray = this.makeHeaderArray();
    headerArray = this.filterHeaders(this.headerFilter, headerArray);
    let artistValues = this.filterArtistValues(this.headerFilter);
    let csv: string = this.formatCsv(headerArray, artistValues, ",");
    this.download(csv);
  }

  makeHeaderArray() {
    let artistsRaw = this.artists.Artists;
    return Object.keys(artistsRaw[0]);
  }

  filterHeaders(headerFilter: Array<string>, arrayHeader: Array<string>) {
    return arrayHeader.filter((header) => headerFilter.includes(header));
  }

  filterArtistValues(headerFilter: Array<string>) {
    let artistsRaw = this.artists.Artists;
    let values = [];
    for (let i = 0; i < artistsRaw.length; i++) {
      let artist = []
      for (let header of headerFilter) {
        artist.push(artistsRaw[i][header]);
      }
      artist.push(this.artistImage(artistsRaw[i]));
      values.push(artist);
    }
    console.log(values);
    return values;
  }

  artistImage(artist) {
    let small_images = artist.image.filter(image => image.size === "small");
    console.log(small_images);
    if (small_images[0]) {
      let small_image = small_images[0]["#text"];
      console.log(small_images[0]["#text"]);
      return small_image;
    }
  }

  formatCsv(arrayHeader: Array<string>, arrayData: any[], delimiter: string) {
    let header = arrayHeader.join(delimiter) + '\n';
    let csv = header;
    arrayData.forEach(array => {
      csv += array.join(delimiter) + "\n";
    });
    return csv;
  }

  download(data: string, filename?: string) {
    let anchor = document.createElement('a');
    let fileContent = data;
    var blob = new Blob([fileContent], { type: 'text/csv' });
    anchor.href = window.URL.createObjectURL(blob);
    anchor.download = "artists.csv";
    anchor.click();
  }
}
