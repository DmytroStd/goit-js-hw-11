import NewsApiService from './fetch-api'
import { refs } from './refs'
import hitTpl from '../templates/hit.hbs';

// const newsApiService = new NewsApiService();

export default function appendTotalHitsMarkup(hits) {
    refs.hitsConteiner.insertAdjacentHTML('beforeend', hitTpl(hits));
    refs.newsApiService.createGallery();
}