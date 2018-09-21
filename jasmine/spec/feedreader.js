/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has an unempty url', function () {
            // loops through each feed
            allFeeds.forEach(function (feedUrl) {
                // checks if url is defined
                expect(feedUrl.url).toBeDefined();
                // checks that url isn't empty
                expect(feedUrl.url.length).not.toBe(0);

            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('ensure name is defined and not empty', function () {
            // loops through each feed
            allFeeds.forEach(function (feedName) {
                // checks if name is defined
                expect(feedName.name).toBeDefined();
                // checks name isn't empty
                expect(feedName.name.length).not.toBe(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function () {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('ensure the menu is hidden by default', function () {

            // check menu-hidden class is added to body
            var menuClass = document.querySelector('body').classList.value;
            expect(menuClass).toContain('menu-hidden');
        });
        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('ensures the menu changes visibility when the menu icon is clicked', function () {
            // makes sure the menu display
            document.querySelector('.menu-icon-link').click();
            expect(document.querySelector('body').classList.contains('menu-hidden')).toBeFalsy();

            // make sure the menu doesn't display
            document.querySelector('.menu-icon-link').click();
            expect(document.querySelector('body').classList.contains('menu-hidden')).toBeTruthy();
        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        })
        it('at least a single entry', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {

        var prevFeed;
        var newFeed;
        beforeEach(function (done) {
            loadFeed(1, function () {
                prevFeed = $('.entry-link')[0].innerText;;

                loadFeed(2, function () {
                    newFeed = $('.entry-link')[0].innerText;;
                    done();
                });
            });
        });
        afterEach(function () {
            loadFeed(0);
        });



        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('when a new feed is loaded by the loadFeed function that the content actually changes', function (done) {
            expect(prevFeed).not.toBe(newFeed);
            done();
        });
    });
}());