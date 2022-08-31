import axios from 'axios';

let searchButton = document.querySelector(".searchButton");
if (searchButton) {
  searchButton.addEventListener('click', () => {
    console.log("worked");
    axios
    .get('/api/search-artist')
    .then(res => console.log(res));
  });
}
