Vue.config.devtools = false;
Vue.config.productionTip = false; // Also removes warning messages

Vue.component("card", {
  template: `
    <div class="card-wrap"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      ref="card">
      <div class="card"
        :style="cardStyle">
        <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
        <div class="card-info">
          <slot name="header"></slot>
          <slot name="content"></slot>
        </div>
      </div>
    </div>`,
  mounted() {
    this.width = this.$refs.card.offsetWidth;
    this.height = this.$refs.card.offsetHeight;
  },
  props: ["dataImage"],
  data: () => ({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    mouseLeaveDelay: null }),

  computed: {
    mousePX() {
      return this.mouseX / this.width;
    },
    mousePY() {
      return this.mouseY / this.height;
    },
    cardStyle() {
      const rX = this.mousePX * 30;
      const rY = this.mousePY * -30;
      return {
        transform: `rotateY(${rX}deg) rotateX(${rY}deg)` };

    },
    cardBgTransform() {
      const tX = this.mousePX * -40;
      const tY = this.mousePY * -40;
      return {
        transform: `translateX(${tX}px) translateY(${tY}px)` };

    },
    cardBgImage() {
      
      return {
        backgroundImage: `url(${this.dataImage})` };

    } },

  methods: {
    handleMouseMove(e) {
      this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width / 2;
      this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height / 2;
    },
    handleMouseEnter() {
      clearTimeout(this.mouseLeaveDelay);
    },
    handleMouseLeave() {
      this.mouseLeaveDelay = setTimeout(() => {
        this.mouseX = 0;
        this.mouseY = 0;
      }, 1000);
			
    } } });

		

const app = new Vue({
  el: "#app" });


$(document).on("click", '[data-toggle="lightbox"]', function (event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});

//kaledoscope bg images//

const images = [
"./Images/Fool.JPEG",
"./Images/Magician.JPEG",
"./Images/HighPriestess.JPEG",
"./Images/Empress.JPEG",
"./Images/Emperor.JPEG",
"./Images/Hierophant.JPEG",
"./Images/Lovers.JPEG",
"./Images/Chariot.JPEG",
"./Images/Strength.JPEG",
"./Images/Hermit.JPEG",
"./Images/WheelofFortune.JPEG",
"./Images/Justice.JPEG",
"./Images/HangedMan.JPEG",
"./Images/Death.JPEG",
"./Images/Temperance.JPEG",
"./Images/Devil.JPEG",
"./Images/Tower.JPEG",
"./Images/Star.JPEG",
"./Images/Moon.JPEG",
"./Images/Sun.JPEG",
"./Images/Judgment.JPEG",
"./Images/World.JPEG",
"./Images/AceWands.JPEG",  
"./Images/2Wands.JPEG",
"./Images/3Wands.JPEG",
"./Images/4Wands.JPEG",
"./Images/5Wands.JPEG",
"./Images/6Wands.JPEG",
"./Images/7Wands.JPEG",
"./Images/8Wands.JPEG",
"./Images/9Wands.JPEG",
"./Images/10Wands.JPEG",
"./Images/PageWands.JPEG",
"./Images/KnightWands.JPEG",
"./Images/QueenWands.JPEG",
"./Images/KingWands.JPEG",
"./Images/AceCups.JPEG",  
"./Images/2Cups.JPEG",
"./Images/3Cups.JPEG",
"./Images/4Cups.JPEG",
"./Images/5Cups.JPEG",
"./Images/6Cups.JPEG",
"./Images/7Cups.JPEG",
"./Images/8Cups.JPEG",
"./Images/9Cups.JPEG",
"./Images/10Cups.JPEG",
"./Images/PageCups.JPEG",
"./Images/KnightCups.JPEG",
"./Images/QueenCups.JPEG",
"./Images/KingCups.JPEG",
"./Images/AceSwords.JPEG",  
"./Images/2Swords.JPEG",
"./Images/3Swords.JPEG",
"./Images/4Swords.JPEG",
"./Images/5Swords.JPEG",
"./Images/6Swords.JPEG",
"./Images/7Swords.JPEG",
"./Images/8Swords.JPEG",
"./Images/9Swords.JPEG",
"./Images/10Swords.JPEG",
"./Images/PageSwords.JPEG",
"./Images/KnightSwords.JPEG",
"./Images/QueenSwords.JPEG",
"./Images/KingSwords.JPEG",
"./Images/AcePentacles.JPEG",  
"./Images/2Pentacles.JPEG",
"./Images/3Pentacles.JPEG",
"./Images/4Pentacles.JPEG",
"./Images/5Pentacles.JPEG",
"./Images/6Pentacles.JPEG",
"./Images/7Pentacles.JPEG",
"./Images/8Pentacles.JPEG",
"./Images/9Pentacles.JPEG",
"./Images/10Pentacles.JPEG",
"./Images/PagePentacles.JPEG",
"./Images/KnightPentacles.JPEG",
"./Images/QueenPentacles.JPEG",
"./Images/KingPentacles.JPEG"];





// Let's create graphemescope object inside the container
var container = $("#container");
var card = $(card);
var scope = new Graphemescope(container[0]);

var appContainer = $("#app");

var index = 0;

scope.setImage(images[0]);


$(window).mousemove(function (event) {
  var factorx = event.pageX / $(window).width();
  var factory = event.pageY / $(window).height();

  // This will move kaleidoscope
  scope.angleTarget = factory;
  scope.zoomTarget = 1.3 + 0.45 * factorx;
});

$(window).scroll(function (event) {
  const deltaY = window.scrollY - appContainer.position().top;
  if (deltaY > 0) {
    const heightForOneCardWrapper = appContainer.height() / images.length;
    const imageIndex = Math.floor(deltaY / heightForOneCardWrapper);
    scope.setImage(images[imageIndex]);
  }
});

var resizeHandler = function () {
  // container.height( $(window).height() );
  container.width($(window).width());
};

$(window).resize(resizeHandler);
$(window).resize();

// container.click(changePicture);
//--------------------------------------------------//
//Change background image based on what is in focus
//--------------------------------------------------//

function pageScroll() {
  window.scrollBy(0, 1);
  scrolldelay = setTimeout(pageScroll, 1);
}



// //debug scroll info
// var s = skrollr.init({
// 	render: function(data) {
// 	  //Log the current scroll position.
// 	  $('#info').text(data.curTop);
// 	}
// });
// $(window).on('scroll', function(){
//   var s = $(window).scrollTop(),
//   d = $(document).height(),
//   c = $(window).height();

// var scrollPercent = parseInt((s / (d - c)) * 100);

// document.getElementById('scrollId').innerHTML = scrollPercent;
// console.log(scrollPercent); //Displaying scroll percentage in console\\
// });

//Play Audio//

// Play audio adjustments
$(function () {
  var t;
  $("body").mousemove(function () {
    clearTimeout(t);

    // Adjust audio volume
    var audio = document.getElementById("audio1");
    audio.volume = Math.min(1.0, Math.max(0.0, 2.0));

    t = setTimeout(function () {
      audio.volume = 0.3;
    }, 200);
  });
});

