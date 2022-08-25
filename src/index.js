import './sass/index.scss'
//import Notiflix from 'notiflix';
//import SimpleLightbox from "simplelightbox";
//import "simplelightbox/dist/simple-lightbox.min.css";

//import NewsApiService from './js/components/fetch-api'
import { refs } from './js/components/refs.js'
import onSearch from './js/components/onsearch-hits'
import fetchHits from './js/components/fetch-hits';
//import appendTotalHitsMarkup from './js/components/append-hits'
//import clearTotalHitsContainer from './js/components/clear-container'
import LoadMoreBtn from './js/components/load-more-btn';

// const loadMoreBtn = new LoadMoreBtn({
//     selector: '.load-more-btn',
//     hidden: true,
// });
// const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.refs.button.addEventListener('click', fetchHits);

// async function onSearch(e) {
//     e.preventDefault();
//     newsApiService.setQuery(e.currentTarget.elements.query.value);
//     clearTotalHitsContainer();
   
//     if (newsApiService.getQuery() === '') {
//         Notiflix.Notify.warning('введіть щось для пошуку')
//         loadMoreBtn.disabled();
//         return appendTotalHitsMarkup('');
//     } else {
//         const data = await newsApiService.fetchhits();

//         if (data.hits.length === 0) {
//             Notiflix.Notify.failure('Вибачте, немає заображень по вашому запиту. Будь-ласка спробуйте ще раз!');
//             loadMoreBtn.hide();
//         } else {
//             Notiflix.Notify.success(`Уиии! Ми знайшли ${data.total} зображень.`);
//             loadMoreBtn.show();
//             loadMoreBtn.enable();
//             newsApiService.resetPage();
//             appendTotalHitsMarkup(data.hits);
//             newsApiService.incrementPage();
//         }
//     };
// }

// async function fetchHits() {
//     newsApiService.incrementPage();
//     loadMoreBtn.disabled();

//     const callNewHits = await newsApiService.fetchhits();
//     const { hits } = callNewHits;
//     appendTotalHitsMarkup(hits);
//     loadMoreBtn.enable();

//     if (newsApiService.currentPage + 1 > newsApiService.totalPage) {
//        loadMoreBtn.disabled(); 
//     }
// }

// function appendTotalHitsMarkup(hits) {
//     refs.hitsConteiner.insertAdjacentHTML('beforeend', hitTpl(hits));
//     newsApiService.createGallery();
// }

// function clearTotalHitsContainer() {
//     refs.hitsConteiner.innerHTML = '';
// }





