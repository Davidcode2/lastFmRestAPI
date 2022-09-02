import axios from 'axios';

export class Csv {

  private artists;
  private saveButton = document.querySelector(".save");

  constructor(artists) {
    artists;
  }

  callback() {
    let path = this.getFilePath();
    let apiString = `/api/save`;
    console.log(apiString);
    axios
      .post(apiString, this.artists);
  }

  createButton(callback: Function) {
    if (this.saveButton) {
      this.saveButton.addEventListener('click', callback.bind(this));
    }
  }

  download(data, filename, type) {
    var file = new Blob([data], { type: type });
    var fileContent = "My epic novel that I don't want to lose.";
    var bb = new Blob([fileContent], { type: 'text/plain' });
    var a = document.createElement('a');
    a.download = 'download.txt';
    a.href = window.URL.createObjectURL(bb);
    a.click();
  }

  getFilePath() {
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {
      //var file = e.target.files[0];
    }

    input.click();
  }

}
