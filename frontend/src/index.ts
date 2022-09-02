import { Csv } from './csv';
import { Artists } from './artists';
import './style.css'

class App {

  private artists = new Artists();

  start() {
    this.artists.start();
  }

}

let app = new App();
app.start();
