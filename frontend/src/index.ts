import axios from 'axios';
import { Csv } from './csv';
import './style.css'

class App {

  private output = document.querySelector(".output");
  private searchButton = document.querySelector(".searchButton");

  callback() {
    let searchArgument = document.querySelector("input")!.value;
    console.log(searchArgument);
    let apiString = `/api/get?artist=${searchArgument}`;
    console.log(apiString);
    axios
      .get(apiString)
      .then(res => {
        let artists = this.extractArtists(res);
        this.clearOutput();
        this.renderArtists(artists);
        console.log(artists);
      });
  }

  onSubmit() {
    let form = document.querySelector("form");
    form.onSubmit = function() {
      console.log("submitted");
    }
  }

  clearOutput() {
    this.output.innerHTML = "";
  }

  createButton(callback) {
    if (this.searchButton) {
      this.searchButton.addEventListener('click', callback.bind(this));
    }
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

  start() {
    this.createButton(this.callback);
  }
}

let app = new App();
app.start();
