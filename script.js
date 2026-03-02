/*
  Minimal JavaScript to toggle the mobile/overlay menu on the homepage.
  When the menu button is clicked, we toggle aria attributes and a CSS class.
*/

document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.menu');
  const panel = document.getElementById('menuPanel');

  /*
    Preloading sequence
    -------------------------------------------------------------------------
    When the page loads, the body has the `is-preloading` class which darkens,
    blurs and zooms the hero background image and hides the navigational
    elements. After three seconds we remove that class to allow the image to
    transition back to normal. Then we sequentially fade and slide the big
    titles into view, followed by the contact link and menu button. The
    timings of these animations are controlled via nested setTimeout calls.
  */
  const body = document.body;
  const titles = document.querySelectorAll('.title');
  const navLeft = document.querySelector('.navlink--left');
  const menuBtn = document.querySelector('.menu');
  // Brand element in the homepage header. Will be null on pages without it.
  const homeBrand = document.querySelector('.hero__header .brand');

  // Shorten the preloading period. Previously the intro lasted 3 seconds,
  // which felt a bit long. Reduce this delay to 1 second so the page
  // transitions more quickly from the blurry state into the final layout.
  setTimeout(() => {
    // End the preloading state on the body
    body.classList.remove('is-preloading');
    // Sequentially reveal each title link
    titles.forEach((el, idx) => {
      setTimeout(() => {
        el.classList.add('animate-in');
      }, idx * 300);
    });
    // Compute a base delay to reveal the navigation after the titles.
    const baseDelay = titles.length * 300;
    // Reveal the contact link slightly after the last title.
    setTimeout(() => {
      navLeft.classList.add('animate-in');
    }, baseDelay + 150);
    // If there is a brand element in the header, reveal it after the contact link.
    if (homeBrand) {
      setTimeout(() => {
        homeBrand.classList.add('animate-in');
      }, baseDelay + 300);
    }
    // Finally reveal the menu button.
    setTimeout(() => {
      menuBtn.classList.add('animate-in');
    }, baseDelay + 450);
  }, 1000);

  function setOpen(isOpen) {
    // Update ARIA state
    button.setAttribute('aria-expanded', String(isOpen));
    panel.setAttribute('aria-hidden', String(!isOpen));
    // Toggle CSS class for animation/visibility
    panel.classList.toggle('is-open', isOpen);
  }

  // Toggle menu on button click
  button.addEventListener('click', () => {
    const isCurrentlyOpen = button.getAttribute('aria-expanded') === 'true';
    setOpen(!isCurrentlyOpen);
  });

  // Close the menu when clicking outside the navigation links inside the overlay
  panel.addEventListener('click', (e) => {
    if (e.target === panel) {
      setOpen(false);
    }
  });

  // Close menu on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  });

  // Portfolio page animation and lazy loading
  const portfolioHero = document.querySelector('.portfolio-hero');
  if (portfolioHero) {
    // Apply a preloading class so CSS can blur and offset the hero image and hide the header.
    document.body.classList.add('is-preloading-portfolio');
    const playSection = document.querySelector('.portfolio-play');
    const gridSection = document.querySelector('.portfolio-grid');
    // Hide the play button and grid until the user scrolls down.
    if (playSection) playSection.classList.add('is-hidden');
    if (gridSection) gridSection.classList.add('is-hidden');
    const heroTitle = document.querySelector('.portfolio-hero-text h1');
    const heroByline = document.querySelector('.portfolio-hero-text p');
    const brand = document.querySelector('.portfolio-header .brand');
    const portfolioMenu = document.querySelector('.portfolio-header .menu');

    // After one second, remove the preloading class and animate the hero and texts.
    setTimeout(() => {
      document.body.classList.remove('is-preloading-portfolio');
      portfolioHero.classList.add('animate-in');
      // Stagger the entrance of the header and hero text elements.
      setTimeout(() => {
        if (brand) brand.classList.add('animate-in');
        if (portfolioMenu) portfolioMenu.classList.add('animate-in');
        if (heroTitle) heroTitle.classList.add('animate-in');
        // Finally, animate the byline.
        setTimeout(() => {
          if (heroByline) heroByline.classList.add('animate-in');
        }, 200);
      }, 300);
    }, 1000);

    // After the hero begins to shrink (1s), reveal the play button and gallery
    // so they move up along with the shrinking hero. This timing is shorter
    // than before to ensure the photos appear as the hero scales down.
    setTimeout(() => {
      if (playSection) playSection.classList.remove('is-hidden');
      if (gridSection) gridSection.classList.remove('is-hidden');
    }, 1300);
  }

  // Novel pages preloading and reveal
  // If the body has the novel-page class then we are either on the novel
  // listing page or an individual book reading page. We apply a custom
  // preloading state that hides the header and content until the intro
  // finishes. On the listing page, the book cards are animated in
  // sequentially; on the reading page, the entire article fades and slides
  // into place.
  if (document.body.classList.contains('novel-page') && !document.body.classList.contains('cosmos-page')) {
    // Always start in the preloading state
    document.body.classList.add('is-preloading-novel');
    const novelCards = document.querySelectorAll('.novel-card');
    const novelHeading = document.querySelector('.novel-heading');
    const novelBrand = document.querySelector('.novel-header .brand');
    const novelMenuBtn = document.querySelector('.novel-header .menu');
    const bookContent = document.querySelector('.book-content');
    setTimeout(() => {
      // Remove the preloading class to trigger CSS transitions
      document.body.classList.remove('is-preloading-novel');
      if (novelCards && novelCards.length > 0) {
        // First animate the section heading
        if (novelHeading) {
          novelHeading.classList.add('animate-in');
        }
        // Animate each novel card sequentially after the heading
        novelCards.forEach((card, idx) => {
          setTimeout(() => {
            card.classList.add('animate-in');
          }, idx * 300 + 300);
        });
        // After cards, reveal the header brand and menu
        const delay = novelCards.length * 300 + 300;
        setTimeout(() => {
          if (novelBrand) novelBrand.classList.add('animate-in');
        }, delay + 150);
        setTimeout(() => {
          if (novelMenuBtn) novelMenuBtn.classList.add('animate-in');
        }, delay + 300);
      } else {
        // Reading page: reveal brand, menu and content
        setTimeout(() => {
          if (novelBrand) novelBrand.classList.add('animate-in');
        }, 200);
        setTimeout(() => {
          if (novelMenuBtn) novelMenuBtn.classList.add('animate-in');
        }, 400);
        setTimeout(() => {
          if (bookContent) bookContent.classList.add('animate-in');
        }, 600);
      }
    }, 1000);
  }
});
