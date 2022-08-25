import LoadMoreBtn from './load-more-btn';
import NewsApiService from './fetch-api'



const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more-btn',
    hidden: true,
});

export const refs = {
    searchForm: document.querySelector('.js-search-form'),
    hitsConteiner: document.querySelector('.gallery'),
    loadMoreBtn: loadMoreBtn,
    newsApiService: newsApiService
        //const newsApiService= () => new NewsApiService(),
};
