import './style.scss';
import data from './data/home.json';

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


const renderHero = (b) => `
  <section class="photo_block">
    <div class="main-wrapper">
      <div class="image">
        <img src="/src/assets/main_picture.png" alt="heroes" class="img">
        <div class="blue-filter"></div>

        <div class="mobile-btn-wrap">
          <button class="btn">Задать вопрос</button>
          <div class="hidden-radius top"></div>
          <div class="hidden-radius left"></div>
        </div>
      </div>

      <div class="title-block">
        <h1><span>${b.title}</span> ${b.subtitle}</h1>
        <div class="hidden-radius"></div>
        <div class="hidden-radius right"></div>        
      </div>

      <div class="info-block">

        <div class="hidden-radius"></div>
        
        <div class="hidden-radius left"></div>

        <div class="text">
          <h2 class="main-text">${b.mainText}</h2>
          <p class="sub-text">${b.subText}</p>
        </div>
      </div>

    </div>
    <button class="btn desktop-btn">Задать вопрос</button>
  </section>
`;

const renderFeatures = (block) => `
  <section class="migration-icons-info">
    ${block.items.map(item => `
      <div class="icon-text">
        <div class="icons">
          ${item.svg}
        </div>
        <span>${item.text}</span>
      </div>
    `).join('')}
  </section>
`;

const renderInfoCards = (b) => `
  <section class="organization-foreign-info">
    ${b.cards.map(card => `
      <div>
        <h1>${card.title}</h1>
        <p>${card.text}</p>
        <button>Узнать подробнее</button>
      </div>
    `).join('')}
  </section>
`;

const arrowSvg = `<svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.582021 1C0.582021 1.55 1.03202 2 1.58202 2H9.17202L0.292021 10.88C0.199439 10.9726 0.125999 11.0825 0.0758939 11.2035C0.0257889 11.3244 3.08483e-09 11.4541 0 11.585C-3.08483e-09 11.7159 0.0257889 11.8456 0.0758939 11.9665C0.125999 12.0875 0.199439 12.1974 0.292021 12.29C0.384603 12.3826 0.494513 12.456 0.615478 12.5061C0.736442 12.5562 0.86609 12.582 0.997021 12.582C1.12795 12.582 1.2576 12.5562 1.37856 12.5061C1.49953 12.456 1.60944 12.3826 1.70202 12.29L10.582 3.41V11C10.582 11.55 11.032 12 11.582 12C12.132 12 12.582 11.55 12.582 11V1C12.582 0.45 12.132 0 11.582 0H1.58202C1.03202 0 0.582021 0.45 0.582021 1Z" fill="black" fill-opacity="0.54"/></svg>`;

const renderServices = (b) => `
  <section class="services">
    <h2>${b.title}</h2>
    <p>${b.subtitle}</p>
    <div class="services__grid">
      ${b.items.map(item => `
        <div>
          <span>${item.text}</span>
          ${arrowSvg}
        </div>
      `).join('')}
    </div>
  </section>
`;

// --- ГЛАВНЫЙ ЦИКЛ ---

function initApp() {
  const main = document.querySelector('main');
  if (!main) return;

  // SEO
  document.querySelector('meta[name="description"]').content = data.description;

  // Рендерим блоки в том порядке, в котором они в JSON
  main.innerHTML = data.blocks.map(block => {
    switch (block.type) {
      case 'hero': return renderHero(block);
      case 'features': return renderFeatures(block);
      case 'info_cards': return renderInfoCards(block);
      case 'services_grid': return renderServices(block);
      default: return '';
    }
  }).join('');
}

initApp();