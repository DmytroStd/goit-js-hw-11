import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29456964-f9d4d1660510bfc9fb16f8b0f';


export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    fetchhits() {
    
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

       return fetch(url)
        .then(r => r.json())
        .then(({hits}) => {
        //  console.log(hits)
        this.incrementPage()
        // console.log(this)
        return hits;
        });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery
    }

    createGallery() {
        this.gallery = new SimpleLightbox('.gallery a');
  }

    updateGallery() {
        this.gallery.refresh();
  }
}