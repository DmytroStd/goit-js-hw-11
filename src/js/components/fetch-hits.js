
import LoadMoreBtn from './load-more-btn';
import NewsApiService from './fetch-api'
import appendTotalHitsMarkup from './append-hits'
import { refs } from './refs';

// const loadMoreBtn = new LoadMoreBtn({
//     selector: '.load-more-btn',
//     hidden: true,
// });
// const newsApiService = new NewsApiService();

export default async function fetchHits() {
    refs.newsApiService.incrementPage();
    refs.loadMoreBtn.disabled();

    const callNewHits = await refs.newsApiService.fetchhits();
    const { hits } = callNewHits;
    appendTotalHitsMarkup(hits);
    refs.loadMoreBtn.enable();

    if (refs.newsApiService.currentPage + 1 > refs.newsApiService.totalPage) {
       refs.loadMoreBtn.disabled(); 
    }
}