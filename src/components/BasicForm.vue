<template>
  <div>
    <b-form>
      <b-form-group id="exampleInputGroup1"
                    label="Do you need a title?"
                    label-for="toggleTitle">
        <toggle-button id="toggleTitle" @change="disabled = (disabled + 1) % 2" :value="false" :labels="{checked: 'On', unchecked: 'Off'}" />
        <label class="sr-only" for="inlineFormInputName2">Lightbox Title</label>
        <b-input-group class="mb-md-4">
          <b-form-input :maxlength="maxTitle" id="inlineFormInputName2" placeholder="Title" v-model="lbTitle" :disabled="disabled == 0 ? true : false"></b-form-input>
          <b-input-group-text slot="append">
            <strong v-text="(maxTitle - lbTitle.length)"></strong>
          </b-input-group-text>
        </b-input-group>
      </b-form-group>

      <!-- <label class="sr-only" for="inlineFormInputName3">Lightbox CTA</label>
      <b-input-group class="mb-md-4">
        <b-form-input :maxlength="maxCTA" id="inlineFormInputName3" placeholder="CTA" v-model="lbCTA"></b-form-input>
        <b-input-group-text slot="append">
          <strong v-text="(maxCTA - lbCTA.length)"></strong>
        </b-input-group-text>
      </b-input-group> -->
      
      <label class="sr-only" for="inlineFormInputName4">Lightbox Text</label>
      <b-input-group class="mb-md-4">
        <b-form-input :maxlength="maxText" id="inlineFormInputName4" placeholder="Text" v-model="lbText"></b-form-input>
        <b-input-group-text slot="append">
          <strong v-text="(maxText - lbText.length)"></strong>
        </b-input-group-text>
      </b-input-group>
      
      <label class="sr-only" for="inlineFormInputName5">Lightbox Button</label>
      <b-input-group class="mb-md-4">
        <b-form-input :maxlength="maxButton" id="inlineFormInputName5" placeholder="Button" v-model="lbButton"></b-form-input>
        <b-input-group-text slot="append">
          <strong v-text="(maxButton - lbButton.length)"></strong>
        </b-input-group-text>
      </b-input-group>
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
      maxTitle: 15,
      maxText: 150,
      maxButton: 10,
      lbTitle: '',
      lbCTA: '',
      lbText: '',
      lbButton: '',
      disabled: 0
    }
  },
  watch: {
    sendData: function () {
      serverBus.$emit('test', this.title);
      // serverBus.$emit('test', this.cta);
      serverBus.$emit('test', this.text);
      serverBus.$emit('test', this.button);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
