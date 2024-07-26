Feature('searcing in cuaca menu search bar');

Scenario('Liking a restaurant', async ({ I }) => {
    // Menyiapkan halaman
     I.amOnPage('/');
     I.see('Cuaca', '.nav-link');
     I.click('Cuaca');
     I.seeElement('#search-loc');
     I.fillField('#search-loc', 'bogor');
     I.wait(5)

    // I.click(locate('li.nav__item').find('a').withText('Favorite'));
    // I.seeElement('#no-favorite');
    // I.click(locate('li.nav__item').find('a').withText('Home'));
  
    // I.seeElement('.post-item__title a');
    // const firstRestaurant = locate('.post-item__title a').first();
    // const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
    // I.see(firstRestaurantTitle);
    // I.click(firstRestaurantTitle);
  
    // I.seeElement('#likeButton');
    // I.seeElement('.fa.fa-heart-o');
    // I.click('#likeButton');
    // I.seeElement('.fa.fa-heart');
  
    // I.click(locate('li.nav__item').find('a').withText('Favorite'));
    // const likedRestaurantTitle = await I.grabTextFrom('.post-item__title a');
    // I.see(likedRestaurantTitle);
    // I.dontSeeElement('#no-favorite');
    // assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
  });
