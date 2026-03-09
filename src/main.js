import './style.scss';

const burger = document.getElementById('burger');
const closeBtn = document.getElementById('closeMenu');
const menu = document.getElementById('mobileMenu');
const header = document.querySelector('.header');

function toggleMenu() {
  const isOpen = menu.classList.toggle('active');
  header.classList.toggle('menu-open');  
}

burger.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);


const navItems = document.querySelectorAll('.header__mobile-wrap nav > div');

navItems.forEach(item => {
  item.addEventListener('click', (event) => {
    const details = item.querySelector('.nav-details');
    
    if (event.target.closest('.nav-details')) {
      return; 
    }

    if (details) {
      const isVisible = details.style.display === 'block';
      
      navItems.forEach(otherItem => {
        const otherDetails = otherItem.querySelector('.nav-details');
        if (otherDetails && otherDetails !== details) {
          otherDetails.style.display = 'none';
        }
      });

      details.style.display = isVisible ? 'none' : 'block';
      details.style.visibility = isVisible ? 'hidden' : 'visible';
    }
  });
});
