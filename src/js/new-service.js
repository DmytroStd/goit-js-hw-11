import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios"

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29456964-f9d4d1660510bfc9fb16f8b0f';
export default class NewsApiService {
    options = {
        url: '',
        method: 'get',
        baseURL: BASE_URL,
        params: {
            key: API_KEY,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 40,
            page: 1,
            q:'',
        },
        timeout: 1000,
        responseType: 'json',
    };
    // constructor() {
    //     // this.searchQuery = '';
    //     // this.page = 1;
    // };

    async fetchhits() {
        const responce = await  axios.request(this.options);
        const { hits, totalHits } = responce.data;
        return { hits, totalHits };
    }
      
    incrementPage() {
        this.options.params.page += 1;
    }

    resetPage() {
         this.options.params.page = 1;
    }

    getQuery() {
        return this.searchQuery
    }

    setQuery(newQuery) {
        this.options.params.q = newQuery;
    }

    createGallery() {
        this.gallery = new SimpleLightbox('.gallery a',{
            captions: true,
            captionsData: 'alt',
            captionDelay: 250,
        });
  }

    updateGallery() {
        this.gallery.refresh();
  }
    }

  //const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

    //    return fetch(url)
    //     .then(r => r.json())
    //     .then(({hits, totalHits}) => {
    //     //  console.log(hits,  totalHits)
    //     this.incrementPage()
    //     // console.log(this)
    //     return {hits, totalHits};
    //     });