// main.js - mobile menu toggle and smooth scroll for internal links
(function(){
  const body = document.body;
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav a');
  const desktopLinks = document.querySelectorAll('.main-nav a');

  function setAria(expanded){
    if(toggle) toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }

  function openNav(){
    body.classList.add('nav-open');
    setAria(true);
  }
  function closeNav(){
    body.classList.remove('nav-open');
    setAria(false);
  }

  if(toggle){
    toggle.addEventListener('click', function(){
      const isOpen = body.classList.contains('nav-open');
      if(isOpen) closeNav(); else openNav();
    });
  }

  // Close mobile menu when a mobile link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', function(e){
      // If the link is an internal anchor, smooth scroll and prevent new navigation
      const href = link.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        closeNav();
        const target = document.querySelector(href);
        if(target) target.scrollIntoView({behavior:'smooth'});
      } else {
        // external or page link (like rescene.html). Let it open — many links open in a new tab via target="_blank"
        closeNav();
      }
    });
  });

  // Desktop links that point to anchors: enable smooth scroll
  desktopLinks.forEach(link => {
    const href = link.getAttribute('href');
    if(href && href.startsWith('#')){
      link.addEventListener('click', function(e){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) target.scrollIntoView({behavior:'smooth'});
      });
    }
  });

  // If user navigates back to index.html with hash, optionally scroll into view after load
  window.addEventListener('load', function(){
    if(location.hash){
      const el = document.querySelector(location.hash);
      if(el) setTimeout(()=> el.scrollIntoView({behavior:'smooth'}), 100);
    }
  });
})();
