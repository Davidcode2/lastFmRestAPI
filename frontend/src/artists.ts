import axios from 'axios';

export class Artists {

  private output = document.querySelector(".output");
  private searchButton = document.querySelector(".searchButton");
  private artists;

  start() {
    this.createButton(this.getArtists);
  }

  createButton(callback) {
    if (this.searchButton) {
      this.searchButton.addEventListener('click', callback.bind(this));
      this.confirmOnEnter();
    }
  }

  getArtists() {
    let searchArgument = document.querySelector("input")!.value;
    console.log(searchArgument);
    let apiString = `/api/get?artist=${searchArgument}`;
    console.log(apiString);
    axios
      .get(apiString)
      .then(res => {
        this.artists = this.extractArtists(res);
        this.clearOutput();
        this.renderArtists(this.artists);
        console.log(this.artists);
      });
  }

  confirmOnEnter() {
    let input = document.querySelector("#artist-name");
    input.addEventListener("keyup", event => {
      let keyboardEvent = <KeyboardEvent>event;
      if (keyboardEvent.key === "Enter") {
        this.getArtists();
      }
    });
  }

  clearOutput() {
    this.output.innerHTML = "";
  }

  extractArtists(res) {
    return res.data.artist;
  }

  renderArtists(artists) {
    for (let artist of artists) {
      this.createCardForArtist(artist);
    }
  }

  createCardForArtist(artist) {
    let card = document.createElement("div");
    card.classList.add("card");
    for (const [key, value] of Object.entries(artist)) {
      let p = document.createElement("p");
      p.innerHTML += `${key}: ${value}`;
      card.appendChild(p);
    }
    this.output.appendChild(card);
  }

  get Artists() {
    return this.artists;
  }
}
