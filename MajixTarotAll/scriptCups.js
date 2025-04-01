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
"./Images/KingCups.JPEG"];





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


