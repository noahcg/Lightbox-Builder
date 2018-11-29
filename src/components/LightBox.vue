<template>
  <div id="giving-tuesday-2018" >
    <div class="popup">
      <div class="left-content">
        <picture>
          <img class="popup1-image" >
        </picture>
      </div>
      <div class="right-content"> <a class="close" href="#">×</a>
        <div class="right-content-inner">
          <!-- <p class="hashtags"><strong>#USHMM #AskWhy</strong></p> -->
          <h2>{{ title }}</h2>
          <h4><strong>{{ cta }}</strong></h4>
          <p>{{ text }}</p>
          <div class="calltoaction-btn"> <a href="" class="cta-btn">{{ button }}</a> </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { serverBus } from '../main';

export default {
  name: 'LightBox',
  props: ['title', 'cta', 'text', 'button'],
  data() {    
    return { 
      lbTitle: this.$props.title,
      lbCTA: this.$props.cta,
      lbText: this.$props.text,
      lbButton: this.$props.button
    }
  },
  watch: {
    collectData: function () {
      serverBus.$on('test', (title, cta, text, button) => {
        this.title = title;
        this.cta = cta;
        this.text = text;
        this.button = button;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #giving-tuesday.overlay h1 {
      text-align: center;
      font: normal 400 1em 'Knockout 50 A', 'Knockout 50 B', 'Arial Narrow', 'Trebuchet MS', Helvetica, sans-serif;
      color: #06D85F;
      margin: 80px 0;
  }

  #giving-tuesday.overlay {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.7);
      transition: opacity 500ms;
      /* visibility: hidden; */
      /* opacity: 0; */
  }

  /* overlay.visible {
      visibility: visible;
      opacity: 1;
  } */

  #giving-tuesday.overlay .popup {
      margin: auto;
      background: #fff;
      border-radius: 8px;
      max-width: 800px;
      max-height: 480px;
      position: relative;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
  }


  /* left image */

  #giving-tuesday.overlay img.popup1-image {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      width: 100%;
      max-width: 500px;
  }


  /* right content */

  #giving-tuesday.overlay .col-md-4.right-content {
      margin-left: -25px;
      text-align: center;
      position: relative;
  }

  #giving-tuesday.overlay .right-content-inner {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
  }

  #giving-tuesday.overlay .content {
      font-size: 17px;
      font-weight: 400;
      padding: 15px 10px 15px 10px;
      line-height: 21px;
  }

  #giving-tuesday.overlay .popup .close {
      position: absolute;
      top: 10px;
      right: 10px;
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
      margin-top: 0;
      color: #333;
      font: normal 400 1em 'Knockout 50 A', 'Knockout 50 B', 'Arial Narrow', 'Trebuchet MS', Helvetica, sans-serif;
      font-size: 30px;
  }

  @media screen and (max-width: 840px) {
      #giving-tuesday.overlay .popup {
          width: 100%;
      }
      #giving-tuesday.overlay .content {
          font-size: 16px;
          line-height: 24px;
      }
      #giving-tuesday.overlay .col-md-4.right-content {
          margin-left: -20px;
      }
  }

  @media screen and (max-width: 767px) {
      #giving-tuesday.overlay .popup {
          width: 450px;
          max-height: 750px;
      }
      #giving-tuesday.overlay img.popup1-image {
          height: 390px;
          object-fit: cover;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          border-bottom-left-radius: 0px;
      }
      #giving-tuesday.overlay .col-md-4.right-content {
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
          top: -390px;
          right: 20px;
      }
  }

  @media screen and (max-width: 478px) {
      #giving-tuesday.overlay .popup {
          width: 360px;
          max-height: 750px;
      }
  }

  #giving-tuesday-2018 * {
    box-sizing: border-box;
  }

  #giving-tuesday-2018 {
    /* background: rgba(0, 0, 0, 0.7); */
    bottom: 0;
    left: 0;
    /* opacity: 0; */
    /* position: fixed; */
    right: 0;
    top: 0;
    transition: opacity 500ms;
    /* visibility: hidden; */
    z-index: 9999;
  }
  #giving-tuesday-2018.visible {
    visibility: visible;
  }

  #giving-tuesday-2018 .popup {
    background: #000;
    border-radius: 8px;
    margin: auto;
    max-width: 700px;
    position: relative;
    /* top: 50%; */
    /* transform: translateY(-50%); */
    width: 86%;
    overflow: hidden;
  }

  #giving-tuesday-2018 .popup .left-content {
    /*max-height: 250px;*/
    overflow: hidden;
  }

  #giving-tuesday-2018 .popup .left-content img {
    display: block;
    margin:0 auto;
    width: auto;
  }

  #giving-tuesday-2018 .popup .right-content {
    padding: 10px 15px;
  }

  #giving-tuesday-2018 .popup .right-content .right-content-inner {
    margin: 0 auto;
    width: 300px;
  }

  #giving-tuesday-2018 .popup .right-content .close {
    color: #fff;
    font-size: 36px;
    font-weight: bold;
    position: absolute;
    right: 12px;
    text-decoration: none;
    top: 0;
    opacity: 1;
  }

  #giving-tuesday-2018 .popup .right-content h2, #giving-tuesday-2018 .popup .right-content p {
    margin: 0;
  }

  #giving-tuesday-2018 .popup .right-content h2 {
    color: #fff;
    font: normal 400 1em 'Knockout 50 A', 'Knockout 50 B', 'Arial Narrow', 'Trebuchet MS', Helvetica, sans-serif;
    font-size: 60px;
    line-height: 50px;
  }

  #giving-tuesday-2018 .popup .right-content h2 span {
    display: block;
    margin-left: 40px;
  }

  #giving-tuesday-2018 .popup .right-content h4 {
    color: #a7a8ac;
    font-size: 28px;
    line-height: 1;
    margin-bottom: 30px;
    text-transform: none;
  }

  #giving-tuesday-2018 .popup .right-content p {
    color: #fff;
    font-family: 'Mercury SSm A', 'Mercury SSm B', 'Palatino', 'Palatino Linotype', Georgia, serif;
    font-size: 17px;
    line-height: 23px;
  }

  #giving-tuesday-2018 .popup .right-content a.cta-btn {
    background-color: #E67700;
    border: 2px solid #fff;
    border-radius: 5px;
    color: #fff;
    display: block;
    font-family: 'Knockout 50 A', 'Knockout 50 B', 'Arial Narrow', 'Trebuchet MS', Helvetica, sans-serif;
    font-size: 30px;
    height: 56px;
    line-height: 52px;
    margin: 0 0 30px;
    padding: 0;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    width: 212px;
  }

  #giving-tuesday-2018 .popup .right-content a.cta-btn i {
    margin-left: 10px;
  }

  #giving-tuesday-2018 .popup .right-content .hashtags {
    color: #E67700;
    font-family: 'Knockout 50 A', 'Knockout 50 B', 'Arial Narrow', 'Trebuchet MS', Helvetica, sans-serif;
    font-size: 22px;
    margin-bottom: 20px;
    margin-top: -10px;
    text-align: center;
  }

  #giving-tuesday-2018 .popup .right-content a.cta-btn:hover {
    background-color: #fd992e;
    text-decoration: none;
  }

  @media (min-width: 480px) {
    #giving-tuesday-2018 .popup {
      width: 450px;
    }

    /*#giving-tuesday-2018 .popup .left-content {
      max-height: 300px;
    }*/

    #giving-tuesday-2018 .popup .right-content {
      padding: 20px 20px 30px;
    }
  }

  @media (min-width: 768px) {
    #giving-tuesday-2018 .popup {
      display: flex;
      width: 100%;
    }

    #giving-tuesday-2018 .popup .left-content {
      flex: 0 0 50%;
      max-height: inherit;
    }

    #giving-tuesday-2018 .popup .left-content img {
      border-radius: 8px 0 0 8px;
      /*height: 100%;*/
      margin: 0;
    }

    #giving-tuesday-2018 .popup .right-content {
      padding: 20px 20px 60px;
    }

    #giving-tuesday-2018 .popup .right-content .right-content-inner {
      width: auto;
    }

    #giving-tuesday-2018 .popup .right-content .close {
      color: #fff;
      font-size: 30px;
    }

    #giving-tuesday-2018 .popup .right-content .right-content-inner {
      position: relative;
      top: 25px;
    }
  }
</style>
