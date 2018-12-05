<template>
  <div id="giving-tuesday" class="overlay mt-4">
    <div class="popup">
        <div class="row">
            <div class="col-sm-8 col-xs-12 left-content"> <img class="popup1-image" :src="imageUrl"> </div>
            <div class="col-sm-4 col-xs-12 right-content"> <a class="close" href="#">&times;</a>
                <div class="right-content-inner">
                    <h2>{{ title }}</h2>
                    <div class="content right-inner" v-html="text"></div>
                    <div class="calltoaction-btn"> <a :href="buttonLink" class="cta-btn" target="_blank">{{ button }}</a> </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LightBox',
  props: ['title', 'cta', 'text', 'button', 'buttonLink', 'imageUrl'],
  data() {    
    return {}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #giving-tuesday.overlay {
  background:#000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: opacity 500ms;
  /* z-index: 9999; */
  padding: 30px;
  }

  #giving-tuesday.overlay.visible {
  visibility: visible;
  }

  #giving-tuesday.overlay .popup {
  margin: auto;
  background: #fff;
  border-radius: 8px;
  max-width: 800px;
  max-height: 480px;
  position: relative;
  /* top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%); */
  }


  /* left image */

  #giving-tuesday.overlay img.popup1-image {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  height: 340px;
  width: 100%;
  max-width: 500px;
  }


  /* right content */

  #giving-tuesday.overlay .col-sm-4.right-content {
  margin-left: -25px;
  text-align: center;
  position: relative;
  }

  #giving-tuesday.overlay .right-content-inner {
  position: relative;
  /* top: 24px; */
  /* transform: translateY(-50%); */
  }

  #giving-tuesday.overlay .content {
  font-size: 17px;
  font-weight: 400;
  padding: 15px 10px 15px 10px;
  line-height: 21px;
  }

  #giving-tuesday.overlay .popup .close {
  position: absolute;
  top: -360px;
  right: 25px;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #101010;
  z-index: 5;
  }

  #giving-tuesday.overlay .popup .close:hover {
  color: #949494;
  }

  #giving-tuesday.overlay .content.right-inner {
  font: normal 1.15em/1.72em 'Mercury SSm A', 'Mercury SSm B', 'Palatino', 'Palatino Linotype', Georgia, serif;
  font-size: 17px;
  /* line-height: 30px; */
  letter-spacing: 0.01em;
  line-height: 29px;
  padding-left: 5px;
  padding-right: 5px;
  }


  /* right bottom call to action button */

  #giving-tuesday.overlay .calltoaction-btn {
  padding-top: 20px;
  }

  #giving-tuesday.overlay a.cta-btn {
  text-transform: uppercase;
  text-decoration: none;
  color: #fff;
  background-color: #E67700;
  padding: 10px 36px 10px 36px;
  font: normal 400 1em 'Knockout 50 A', 'Knockout 50 B', 'Arial Narrow', 'Trebuchet MS', Helvetica, sans-serif;
  font-size: 18px;
  }

  #giving-tuesday.overlay a.cta-btn:hover {
  background-color: #fd992e;
  text-decoration: none;
  color: #fff;
  }

  #giving-tuesday.overlay .popup h2 {
  margin: 0;
  color: #333;
  font: normal 400 1em 'Knockout 50 A', 'Knockout 50 B', 'Arial Narrow', 'Trebuchet MS', Helvetica, sans-serif;
  font-size: 30px;
  text-transform: none;
  }

  @media screen and (max-width: 840px) {
  #giving-tuesday.overlay .popup {
  width: 100%;
  }
  #giving-tuesday.overlay .content {
  font-size: 16px;
  line-height: 24px;
  }
  #giving-tuesday.overlay .col-sm-4.right-content {
  margin-left: -20px;
  }
  }

  @media screen and (max-width: 767px) {
  #giving-tuesday.overlay .popup {
  width: 450px;
  max-height: 750px;
  }
  #giving-tuesday.overlay img.popup1-image {
  height: 340px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 0px;
  }
  #giving-tuesday.overlay .col-sm-4.right-content {
  margin: 0;
  }
  #giving-tuesday.overlay .right-content-inner {
  padding: 20px 10px 30px 10px;
  }
  #giving-tuesday.overlay .content {
  padding: 0px 40px 0px 40px;
  }
  #giving-tuesday.overlay .popup .close {
  color: #fff;
  opacity: 1;
  top: -270px;
  right: 25px;
  }
  }

  @media screen and (max-width: 478px) {
  #giving-tuesday.overlay img.popup1-image {
  height: 280px;
  }
  #giving-tuesday.overlay .content.right-inner {
  font-size: 12px;
  line-height: 22px;
  }
  #giving-tuesday.overlay .popup {
  width: 310px;
  max-height: 750px;
  }
  }

  /* @media (min-width: 450px) {

  } */

  @media (min-width: 768px) {
  #giving-tuesday.overlay img.popup1-image {
  height: 480px;
  /* object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 0px; */
  }
  #giving-tuesday.overlay .right-content-inner {
  top: 24px;
  }
  #giving-tuesday.overlay .popup .close {
  color: #000;
  opacity: 1;
  top: 10px;
  right: 10px;
  }
  }
</style>
