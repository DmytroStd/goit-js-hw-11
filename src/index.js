import './sass/index.scss'
import NewsApiService from './js/new-service'
import hitTpl from './js/templates/hit.hbs';
import LoadMoreBtn from './js/components/load-more-btn';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    hitsConteiner: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more-btn',
    hidden: true,
});
const newsApiService = new NewsApiService();
refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);

function onSearch(e) {
    e.preventDefault(); 
    console.log(e.currentTarget.elements.query.value);
    newsApiService.setQuery(e.currentTarget.elements.query.value);

    if (newsApiService.getQuery() === '') {
        Notiflix.Notify.warning('введіть щось для пошуку')
        loadMoreBtn.disabled();
        return appendTotalHitsMarkup('');
    } else if (newsApiService.fetchhits().then(({ hits }) => {
        console.log(hits);
    
        if (hits.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no more images matching your search query. Please try new search.',
            );
            loadMoreBtn.hide();
        }
    
        //  loadMoreBtn.disabled();
        // return appendTotalHitsMarkup('');
    }
    ));
   newsApiService.fetchhits().then(({ totalHits }) => {
        // console.log(hits);
        // if (hits.length >= 40) {
            // console.log('inside >=40');
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
            loadMoreBtn.show();
            newsApiService.resetPage();
            clearTotalHitsContainer()
            fetchHits()
        //}
        });
}

function fetchHits() {
    newsApiService.incrementPage();
    loadMoreBtn.disabled();
    newsApiService.fetchhits().then(({ hits }) => {
        console.log({ hits });
        console.log(hits);
        appendTotalHitsMarkup(hits);
        loadMoreBtn.enable();
});
}

function appendTotalHitsMarkup(hits) {
    refs.hitsConteiner.insertAdjacentHTML('beforeend', hitTpl(hits));
    newsApiService.createGallery();
}

function clearTotalHitsContainer() {
    refs.hitsConteiner.innerHTML = '';
}





