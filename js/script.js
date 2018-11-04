var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 3000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.02em solid #fff}";
    document.body.appendChild(css);
};
/*Slider*/
let slide_data = [
    {
        'src': 'img/kk.jpg',
        'title': 'Kupa',
        'copy': 'DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT.'
  },
    {
        'src': 'img/mario.png',
        'title': 'Slide 2',
        'copy': 'DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT.'
  },
    {
        'src': 'img/pong.png',
        'title': 'Slide 3',
        'copy': 'DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT.'
  },
    {
        'src': 'img/CM.png',
        'title': 'Slide 4',
        'copy': 'DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT.'
  },

];
let slides = [],
    captions = [];

let autoplay = setInterval(function () {
    nextSlide();
}, 5000);
let container = document.getElementById('container');
let leftSlider = document.getElementById('left-col');
// console.log(leftSlider);
let down_button = document.getElementById('down_button');
// let caption = document.getElementById('slider-caption');
// let caption_heading = caption.querySelector('caption-heading');

down_button.addEventListener('click', function (e) {
    e.preventDefault();
    clearInterval(autoplay);
    nextSlide();
    autoplay;
});

for (let i = 0; i < slide_data.length; i++) {
    let slide = document.createElement('div'),
        caption = document.createElement('div'),
        slide_title = document.createElement('div');

    slide.classList.add('slide');
    slide.setAttribute('style', 'background:url(' + slide_data[i].src + ')');
    caption.classList.add('caption');
    slide_title.classList.add('caption-heading');
    slide_title.innerHTML = '<h1>' + slide_data[i].title + '</h1>';

    switch (i) {
        case 0:
            slide.classList.add('current');
            caption.classList.add('current-caption');
            break;
        case 1:
            slide.classList.add('next');
            caption.classList.add('next-caption');
            break;
        case slide_data.length - 1:
            slide.classList.add('previous');
            caption.classList.add('previous-caption');
            break;
        default:
            break;
    }
    caption.appendChild(slide_title);
    caption.insertAdjacentHTML('beforeend', '<div class="caption-subhead"><span>dolor sit amet, consectetur adipiscing elit. </span></div>');
    slides.push(slide);
    captions.push(caption);
    leftSlider.appendChild(slide);
    container.appendChild(caption);
}
// console.log(slides);

function nextSlide() {

    slides[0].classList.remove('current');
    slides[0].classList.add('previous', 'change');
    slides[1].classList.remove('next');
    slides[1].classList.add('current');
    slides[2].classList.add('next');
    let last = slides.length - 1;
    slides[last].classList.remove('previous');

    captions[0].classList.remove('current-caption');
    captions[0].classList.add('previous-caption', 'change');
    captions[1].classList.remove('next-caption');
    captions[1].classList.add('current-caption');
    captions[2].classList.add('next-caption');
    let last_caption = captions.length - 1;

    // console.log(last);
    captions[last].classList.remove('previous-caption');

    let placeholder = slides.shift();
    let captions_placeholder = captions.shift();
    slides.push(placeholder);
    captions.push(captions_placeholder);
}

let heading = document.querySelector('.caption-heading');



function whichTransitionEvent() {
    var t,
        el = document.createElement("fakeelement");

    var transitions = {
        "transition": "transitionend",
        "OTransition": "oTransitionEnd",
        "MozTransition": "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
    }

    for (t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
}

var transitionEvent = whichTransitionEvent()
caption.addEventListener(transitionEvent, customFunction);

function customFunction(event) {
    caption.removeEventListener(transitionEvent, customFunction);
    console.log('animation ended');

}

