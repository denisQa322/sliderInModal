
    let sliderCount = 0;

const modalController = ({modal, openSlider, closeSlider, time = 500}) =>{
    const openElements = document.querySelectorAll(openSlider)
    const modalElement = document.querySelector(modal);
    const gallery = document.querySelector('.gallery');
    const images = gallery.getElementsByTagName('img');
    const sliderWrapper = document.querySelector('.slider-wrapper');

    
    

    modalElement.style.cssText = `
    display:flex;
    visibility:hidden;
    opacity:0;
    transition: opacity ${time}ms ease-in-out;
    `
    const closeModal = event =>{
        const target = event.target;
        
        if(target === modalElement ||
            (closeSlider && target.closest(closeSlider))||
            event.code === 'Escape'
            ){
                modalElement.style.opacity = 0;
                
                setTimeout(()=>{
                    modalElement.style.visibility = 'hidden';
                    sliderWrapper.style.transform = 'translateX(0px)';
                    sliderCount = 0;
                    console.log(sliderCount);
                },time)
                
                window.removeEventListener('keydown', closeModal);
            }
            
        }
        
        function openModal(){
            modalElement.style.visibility = 'visible';
            modalElement.style.opacity = 1;
            window.addEventListener('keydown', closeModal)
        }
        
        

        openElements.forEach(img=>{
            for(index = 0; index <  images.length; index++){
                images[index].addEventListener('click',openModal);
            }
        })

        


    modalElement.addEventListener('click',closeModal);
}

modalController({
    modal:'.modal',
    openSlider:'.gallery-image',
    closeSlider:'.slider-close',
})
const Slider = () =>{

    const sliderElement = document.querySelector('.slider');
    const sliderItem = document.querySelectorAll('.slider-item');
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const leftArrow = document.querySelector('.slider-left');
    const rightArrow = document.querySelector('.slider-right');
    
    
    let sliderWidth = sliderElement.offsetWidth - 30;
    
    
    function showSLide(){
        sliderItem.forEach(item => item.style.width = sliderWidth + 'px');
        rollSlider();
    };
    showSLide();
    
    function rollSlider(){
        sliderWrapper.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
    }
    function slideToLeft(){
        sliderCount--;
        if(sliderCount < 0){
            sliderCount = sliderItem.length - 1;
        }
        rollSlider();
    }

    function slideToRight(){
        sliderCount++;
        if(sliderCount >= sliderItem.length){
            sliderCount = 0;
        }
        rollSlider();

    }
    
    leftArrow.addEventListener('click', slideToLeft)
    rightArrow.addEventListener('click',slideToRight)
}

Slider()
