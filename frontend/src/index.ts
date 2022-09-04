import { Save } from './csv';
import { Artists } from './artists';
import './style.css'

class App {

  constructor(
    private artists = new Artists(),
    private save = new Save(artists),
  ) { }

  start() {
    this.artists.start();
    this.save.start();
  }

}

let app = new App();
app.start();
