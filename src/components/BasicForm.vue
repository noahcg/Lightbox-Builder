<template>
  <div>
    <b-form>
      <label class="sr-only" for="inlineFormInputName2">Lightbox Title</label>
      <b-input class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2" placeholder="Title" v-model="lbTitle" />
      <label class="sr-only" for="inlineFormInputName3">Lightbox CTA</label>
      <b-input class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName3" placeholder="CTA" v-model="lbCTA" />
      <label class="sr-only" for="inlineFormInputName4">Lightbox Text</label>
      <b-input class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName4" placeholder="Text" v-model="lbText" />
      <label class="sr-only" for="inlineFormInputName5">Lightbox Button</label>
      <b-input class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName5" placeholder="Button" v-model="lbButton" />
    </b-form>

    <LightBox :title="lbTitle" :cta="lbCTA" :text="lbText" :button="lbButton" />
  </div>
</template>

<script>
import { serverBus } from '../main';
import LightBox from './LightBox.vue';


export default {
  name: 'BasicForm',
  components: {
    LightBox
  },
  data() {
    return { 
      lbTitle: this.title,
      lbCTA: this.cta,
      lbText: this.text,
      lbButton: this.button
    }
  },
  watch: {
    sendData: function () {
      serverBus.$emit('test', this.title);
      serverBus.$emit('test', this.cta);
      serverBus.$emit('test', this.text);
      serverBus.$emit('test', this.button);
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
