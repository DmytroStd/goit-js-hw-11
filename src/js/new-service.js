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

    async fetchhits() {
        const responce = await  axios.request(this.options);
        const { hits, total } = responce.data;
        return { hits, total };
    }
      
    incrementPage() {
        this.options.params.page += 1;
    }

    resetPage() {
         this.options.params.page = 1;
    }

    getQuery() {
        return this.options.params.q 
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

   // constructor() {
    //     // this.searchQuery = '';
    //     // this.page = 1;
    // };

  //const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

    //    return fetch(url)
    //     .then(r => r.json())
    //     .then(({hits, total}) => {
    //     //  console.log(hits,  total)
    //     this.incrementPage()
    //     // console.log(this)
    //     return {hits, total};
    //     });