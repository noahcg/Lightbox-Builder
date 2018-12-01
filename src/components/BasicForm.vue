<template>
  <div class="row">
    <b-form class="col-md-12">

      <b-form-group id="exampleInputGroup1" label="Do you need a title?" label-for="toggleTitle">
        <toggle-button id="toggleTitle" @change="disabled = !disabled" :value="false" :labels="{checked: 'Yes', unchecked: 'No'}" />
        <label class="sr-only" for="inlineFormInputName2">Lightbox Title</label>
        <b-input-group class="mb-4">
          <b-form-input :maxlength="maxTitle" id="inlineFormInputName2" placeholder="Title" v-model="lbTitle" :disabled="disabled"></b-form-input>
          <b-input-group-text slot="append">
            <strong v-text="(maxTitle - lbTitle.length)"></strong>
          </b-input-group-text>
        </b-input-group>
      </b-form-group>
      
      <label class="sr-only" for="inlineFormInputName4">Lightbox Text</label>
      <!-- <b-input-group class="mb-4">
        <b-form-input :maxlength="maxText" id="inlineFormInputName4" placeholder="Text" ></b-form-input>
        <b-input-group-text slot="append">
          <strong v-text="(maxText - lbText.length)"></strong>
        </b-input-group-text>
      </b-input-group> -->

      <editor id="editor" api-key="API_KEY" :init="{
                                  plugins: 'wordcount',
                                  selector: 'editor',
                                  element_format: 'text'
                                }" v-model="lbText"></editor>
      
      <label class="sr-only" for="inlineFormInputName5">Lightbox Button</label>
      <b-input-group class="mb-4 mt-4">
        <b-form-input :maxlength="maxButton" id="inlineFormInputName5" placeholder="Button" v-model="lbButton"></b-form-input>
        <b-input-group-text slot="append">
          <strong v-text="(maxButton - lbButton.length)"></strong>
        </b-input-group-text>
      </b-input-group>

      <label class="sr-only" for="buttonLinkInput">Lightbox Button Link</label>
      <b-form-input class="mb-4" id="buttonLinkInput" placeholder="Button Link" v-model="lbButtonLink"></b-form-input>

      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <p>Choose An Image 
          <br />
          <small>Your image should be 500px x 480px, or that aspect ratio</small>
        </p>
        <div class="dropbox mb-4">
          <input type="file" :disabled="isSaving" accept="image/*" class="input-file" @change="filesChange">
            <p v-if="isInitial">
              Drag your file(s) here to begin<br> or click to browse
            </p>
            <p v-if="isSaving">
              Uploading {{ fileCount }} files...
            </p>
        </div>
      </form>

      <!--SUCCESS-->
      <div v-if="isSuccess">
        <p>Uploaded image successfully.</p>
        <p>
          <a href="javascript:void(0)" @click="reset()">Upload again</a>
        </p>
      </div>
      <!--FAILED-->
      <div v-if="isFailed">
        <p>Uploaded failed.</p>
        <p>
          <a href="javascript:void(0)" @click="reset()">Try again</a>
        </p>
        <pre>{{ uploadError }}</pre>
        
      </div>

      <!-- Dates -->
      <p>What date(s) should the lightbox run?</p>
      <date-picker class="mb-4" v-model="dateRange" type="datetime" lang="en" format="YYYY-MM-DD hh:mm:ss a" range confirm :time-picker-options="{ start: '00:00', step: '00:15', end: '23:45' }"/>

      <!-- Cookie -->
      <p>Does the lightbox need a cookie?</p>
      <toggle-button id="toggleCookie" :value="false" :labels="{checked: 'Yes', unchecked: 'No'}" />

      <!-- URL -->
      <p>Should the lightbox show up on the homepage?</p>
      <toggle-button id="toggleHomepage" :value="false" :labels="{checked: 'Yes', unchecked: 'No'}" />

      <p>Does the lightbox need to show up on any other page(s)?</p>
      <toggle-button id="toggleURL" @change="isActive = !isActive" :value="false" :labels="{checked: 'Yes', unchecked: 'No'}" />
      <label class="sr-only" for="inlineFormInputName6">URL</label>
      <b-form-input class="mb-4" id="inlineFormInputName6" placeholder="URL" v-show="isActive"></b-form-input>

    </b-form>

    <LightBox :title="disabled? '' : lbTitle" :cta="lbCTA" :text="lbText" :button="lbButton" :buttonLink="lbButtonLink" :imageUrl="imageUrl" />
  </div>
</template>

<script>

import LightBox from './LightBox.vue';
import DatePicker from 'vue2-datepicker';
import Editor from '@tinymce/tinymce-vue';

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
  name: 'BasicForm',
  components: {
    LightBox,
    DatePicker,
    Editor
  },
  data() {
    return { 
      maxTitle: 30,
      maxText: 150,
      maxButton: 15,
      lbTitle: '',
      lbCTA: '',
      lbText: 'a bunch of words here yo',
      lbButton: '',
      lbButtonLink: '',
      disabled: true,
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      isActive: false,
      imageFile: null,
      imageUrl: '',
      dateRange: null,
    }
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  methods: {
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;

      upload(formData)
        .then(x => {
          this.uploadedFiles = [].concat(x);
          this.currentStatus = STATUS_SUCCESS;
        })
        .catch(err => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
    },
    filesChange($event) {
      let image = $event.target.files[0];
      let reader = new FileReader();
      reader.onload = (event) => {
        this.imageUrl = event.target.result;
      }
      reader.readAsDataURL(image);
    },
    testWords() {
      // console.log(tinymce);
      var new_value = tinymce.get('editor').getContent(self.value);
      console.log(tinymce.activeEditor.selection.getContent({format: 'text'}));
      
            // set model value
            // self.set(new_value)
      
    }
  },
  mounted() {
    this.reset();
    this.testWords();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>
