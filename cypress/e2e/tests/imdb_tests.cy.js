import HomePage from '../../support/pages/HomePage';
import SearchPage from '../../support/pages/SearchPage';
import ActorPage from '../../support/pages/ActorPage';
import MenuPage from '../../support/pages/MenuPage';
import TopBoxOfficePage from '../../support/pages/TopBoxOfficePage';
import MoviePage from '../../support/pages/MoviePage';
import TopTVShowsPage from '../../support/pages/TopTVShowsPage';
import BornTodayPage from '../../support/pages/BornTodayPage';

describe('IMDb Automation with POM', () => {
    beforeEach(() => {
        cy.viewport(1280, 800); // ✅ Set resolution to a stable desktop size
        cy.visit('/');
        cy.acceptCookiesIfVisible(); // <-- Accept cookies if banner is shown
    });
    it('1. Nicolas Cage > Upcoming > Completed Movie', () => {
        HomePage.open();
        HomePage.search('Nicolas Cage');
        SearchPage.clickFirstResult('Nicolas Cage');
        ActorPage.expandUpcoming();
        ActorPage.clickFirstCompletedMovie();
    });

    it('2. Top Box Office > 2nd Movie > Rate 5 stars', () => {
        HomePage.open();
        HomePage.openMenu();
        MenuPage.goToTopBoxOffice();
        TopBoxOfficePage.clickSecondMovie();
        MoviePage.rateMovieWithFiveStars();
    });

    it('3. Top 250 TV Shows > Breaking Bad > Danny Trejo > 2nd Photo', () => {
        HomePage.open();
        HomePage.openMenu();
        MenuPage.goToTopTVShows();
        TopTVShowsPage.clickBreakingBad();
        TopTVShowsPage.goToPhotos();
        TopTVShowsPage.openPhotoGallery();
        TopTVShowsPage.filterPhotosBy('Danny Trejo');
        TopTVShowsPage.clickSecondPhoto();
    });

    it('4. Born Yesterday > 3rd Celeb > Screenshot', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const mm = String(yesterday.getMonth() + 1).padStart(2, '0');
        const dd = String(yesterday.getDate()).padStart(2, '0');
        const birthday = `${mm}-${dd}`;
        HomePage.open();
        HomePage.openMenu();
        MenuPage.goToBornToday();
        BornTodayPage.clearSearch();
        BornTodayPage.selectBirthdayOption(birthday);
        BornTodayPage.clickThirdLink(2); // 3rd item
        cy.screenshot('born-yesterday-3rd-celeb');
    });

    it('5. Born 40 Years Ago Today > 1st Result > 1st Link > Screenshot', () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // MM
        const year = today.getFullYear() - 40;

        HomePage.open();
        HomePage.openMenu();
        MenuPage.goToBornToday();
        BornTodayPage.clearSearch();
        BornTodayPage.selectBirthDate(day, month, year);
        BornTodayPage.clickFirstLinkInDescription(0);
        cy.screenshot('born-40-years-ago-first-link');
    });
});
