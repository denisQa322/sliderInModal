let sliderCount = 0;

const modalController = ({modal, openSlider, closeSlider, time = 500}) => {
    const openElements = document.querySelectorAll(openSlider)
    const modalElement = document.querySelector(modal);

    modalElement.style.cssText = `
    display:flex;
    visibility:hidden;
    opacity:0;
    transition: opacity ${time}ms ease-in-out;
    `
    const closeModal = event => {
        const target = event.target;

        if (target === modalElement ||
            (closeSlider && target.closest(closeSlider)) ||
            event.code === 'Escape'
        ) {
            modalElement.style.opacity = 0;

            setTimeout(() => {
                modalElement.style.visibility = 'hidden';
                sliderCount = 0;
                console.log(sliderCount);
            }, time)

            window.removeEventListener('keydown', closeModal);
        }

    }

    function openModal(id) {
        return () => {
            initSlider(id);
            window.addEventListener('keydown', closeModal)
        };
    }


    openElements.forEach((img, id) => {
        console.log('id', id);
        img.addEventListener('click', openModal(id));
    })

    modalElement.addEventListener('click', closeModal);
}

modalController({
    modal: '.modal',
    openSlider: '.gallery-image',
    closeSlider: '.slider-close',
})

initSlider = (id) => {
    const modalElement = document.querySelector('.modal');
    const sliderElement = document.querySelector('.slider');
    const sliderWrapper = document.querySelector('.slider-wrapper');
    let sliderWidth = sliderElement.offsetWidth - 30;
    sliderCount = id;
    sliderWrapper.style.transform = `translateX(${-id * sliderWidth}px)`;
    console.log(sliderCount);
    modalElement.style.visibility = 'visible';
    modalElement.style.opacity = 1;
}
const Slider = () => {
    const sliderElement = document.querySelector('.slider');
    const sliderItem = document.querySelectorAll('.slider-item');
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const leftArrow = document.querySelector('.slider-left');
    const rightArrow = document.querySelector('.slider-right');

    let sliderWidth = sliderElement.offsetWidth - 30;


    function showSLide() {
        sliderItem.forEach(item => item.style.width = sliderWidth + 'px');
        rollSlider();
    };
    showSLide();

    function rollSlider() {
        sliderWrapper.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
    }

    function slideToLeft() {
        sliderCount--;
        if (sliderCount < 0) {
            sliderCount = sliderItem.length - 1;
        }
        rollSlider();
    }

    function slideToRight() {
        sliderCount++;
        if (sliderCount >= sliderItem.length) {
            sliderCount = 0;
        }
        rollSlider();

    }

    leftArrow.addEventListener('click', slideToLeft)
    rightArrow.addEventListener('click', slideToRight)
}

Slider()
