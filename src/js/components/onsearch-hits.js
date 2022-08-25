import Notiflix from 'notiflix';

import LoadMoreBtn from './load-more-btn';
//import NewsApiService from './fetch-api';
import appendTotalHitsMarkup from './append-hits';
import clearTotalHitsContainer from './clear-container';
import { refs } from './refs';

// const loadMoreBtn = new LoadMoreBtn({
//     selector: '.load-more-btn',
//     hidden: true,
// });
// const newsApiService = new NewsApiService();

export default async function onSearch(e) {
    e.preventDefault();
    refs.newsApiService.setQuery(e.currentTarget.elements.query.value);
    clearTotalHitsContainer();
   
    if (refs.newsApiService.getQuery() === '') {
        Notiflix.Notify.warning('введіть щось для пошуку')
        refs.loadMoreBtn.disabled();
        return appendTotalHitsMarkup('');
    } else {
        const data = await refs.newsApiService.fetchhits();

        if (data.hits.length === 0) {
            Notiflix.Notify.failure('Вибачте, немає заображень по вашому запиту. Будь-ласка спробуйте ще раз!');
            refs.loadMoreBtn.hide();
        } else {
            Notiflix.Notify.success(`Уиии! Ми знайшли ${data.total} зображень.`);
            refs.loadMoreBtn.show();
            refs.loadMoreBtn.enable();
            refs.newsApiService.resetPage();
            appendTotalHitsMarkup(data.hits);
            refs.newsApiService.incrementPage();
        }
    };
}
