'use strict';

const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2',
	leftMenu = document.querySelector('.left-menu'),
	hamburger = document.querySelector('.hamburger'),
	// tvCardImage = document.querySelectorAll('.tv-card__img'),
	tvShowList = document.querySelector('.tv-shows__list'),
	modal = document.querySelector('.modal');

const DBService = class {
	getData = async (url) => {
		const res = await fetch(url);
		if (res.ok) {
			return res.json();
		} else {
			throw new Error(`Error on address ${url}`);
		}
	};
	getTestData = () => {
		return this.getData('test.json');
	};
};

const renderCard = (response) => {
	console.log(response);
	tvShowList.textContent = '';
	response.results.forEach(({ backdrop_path: backdrop, name: title, poster_path: poster, vote_average: vote }) => {
		const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg',
			backdropIMG = '',
			voteElem = '',
			card = document.createElement('li');
		card.classList.add('tv-shows__item');
		card.innerHTML = `
			<a href="#" class="tv-card">
				<span class="tv-card__vote">${vote}</span>
				<img class="tv-card__img"
					src="${posterIMG}"
					data-backdrop="${IMG_URL + backdrop}"
					alt="${title}">
				<h4 class="tv-card__head">${title}</h4>
			</a>
		`;
		tvShowList.append(card);
	});
};
new DBService().getTestData().then(renderCard);

//open/close menu

hamburger.addEventListener('click', () => {
	leftMenu.classList.toggle('openMenu');
	hamburger.classList.toggle('open');
});

document.addEventListener('click', (e) => {
	if (!e.target.closest('.left-menu')) {
		leftMenu.classList.remove('openMenu');
		hamburger.classList.remove('open');
	}
});

leftMenu.addEventListener('click', (e) => {
	const target = e.target,
		dropdown = target.closest('.dropdown');
	if (dropdown) {
		dropdown.classList.toggle('active');
		leftMenu.classList.add('openMenu');
		hamburger.classList.add('open');
	}
});

// change card image

// tvCardImage.forEach((e) => {
// 	const src = e.src;
// 	if (e.dataset.backdrop) {
// 		e.addEventListener('mouseover', () => {
// 			e.src = e.dataset.backdrop;
// 		});
// 		e.addEventListener('mouseout', () => {
// 			e.src = src;
// 		});
// 	}
// });

const changeImage = (e) => {
	const card = e.target.closest('.tv-shows__item');
	if (card) {
		const img = card.querySelector('.tv-card__img'),
			changeImg = img.dataset.backdrop;
		if (changeImg) {
			[img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src];
		}
	}
};
tvShowList.addEventListener('mouseover', changeImage);
tvShowList.addEventListener('mouseout', changeImage);

// open modal window

tvShowList.addEventListener('click', (e) => {
	e.preventDefault();
	const target = e.target,
		card = target.closest('.tv-card');
	if (card) {
		document.body.style.overflow = 'hidden';
		modal.classList.remove('hide');
	}
});

// close modal window

modal.addEventListener('click', (e) => {
	const target = e.target,
		cross = target.closest('.cross'),
		modalClose = target.classList.contains('modal');
	if (cross || modalClose) {
		document.body.style.overflow = '';
		modal.classList.add('hide');
	}
});
