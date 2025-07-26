"use strict"

const sliderWrapper = document.querySelector('.slider-wrapper');
const sliderLine = document.querySelector('.slider-line');
const sliderPictures = document.querySelectorAll('.slider-line>img');
const btnNext = document.querySelector('.btn-slider.next');
const btnPrev = document.querySelector('.btn-slider.prev');
const btnPaginations = document.querySelectorAll('.btn-pagination>button');
const picturesLength = sliderPictures.length;

let index = 0;
let unitShift = 100;

btnPaginations[0].style.backgroundColor = 'red';

// исчезновение и показ кнопки если на первом слайде то исчезает кнопка prev,
// на последнем кнопка next.
function updateButtons() {
    btnPrev.style.display = index === 0 ? 'none' : '';
    btnNext.style.display = index === picturesLength - 1 ? 'none' : '';
}

// сразу вызываем чтобы со старта кнока prev не показывалась .
updateButtons();

// отключаем событие will-change .
sliderLine.addEventListener('transitionend', function () {
    sliderLine.style.willChange = '';
});

function clickNext() {
    // включаем событие will-change .
    sliderLine.style.willChange = 'transform';
    index++;
    if (index >= picturesLength - 1) {
        index = picturesLength - 1;
    }
    updateButtons();
    sliderLine.style.transform = `translateX(-${unitShift * index}%)`;
    for (let elem of btnPaginations) {
        elem.style.backgroundColor = '#fff';
    }
    btnPaginations[index].style.backgroundColor = 'red';
}

function clickPrev() {
    // событие will-change .
    sliderLine.style.willChange = 'transform';
    index--;
    if (index <= 0) {
        index = 0;
    }
    updateButtons();
    sliderLine.style.transform = `translateX(-${unitShift * index}%)`;
    for (let elem of btnPaginations) {
        elem.style.backgroundColor = '#fff';
    }
    btnPaginations[index].style.backgroundColor = 'red';
}

// управление кнопками пагинации .
for (let i = 0; i < picturesLength; i++) {
    btnPaginations[i].addEventListener('click', function () {
        for (let elem of btnPaginations) {
            elem.style.backgroundColor = '#fff';
        }
        this.style.backgroundColor = 'red';
        index = i;
        sliderLine.style.transform = `translateX(-${unitShift * index}%)`;
        updateButtons();
    });
}

btnNext.addEventListener('click', clickNext);
btnPrev.addEventListener('click', clickPrev);

//MARK: swipe
// события свайпа для сенсорных экранов .

let touchStartX = 0;
let touchEndX = 0;

sliderWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
});

sliderLine.addEventListener('touchmove', (e) => {
    // Можно отменить действие браузера, чтобы не скроллилось (опционально)
    e.preventDefault();
});

sliderLine.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;

    const swipeDistance = touchEndX - touchStartX;
    // минимальное расстояние свайпа в пикселях, чтобы сработал свайп
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance < 0) {
            // Свайп влево — следующий слайд
            clickNext();
        } else {
            // Свайп вправо — предыдущий слайд
            clickPrev();
        }
    }

// сброс значений
    touchStartX = 0;
    touchEndX = 0;
});
