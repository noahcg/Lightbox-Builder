<template>
  <div class="row">
    <b-form class="col-md-8">

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
      
      <label for="inlineFormInputName4">Lightbox Text</label>
      <editor class="mb-4" id="d1" v-model="lbText" :init="init"></editor>
      
      <label class="mt-4" for="inlineFormInputName5">Lightbox Button</label>
      <b-input-group class="mb-4">
        <b-form-input :maxlength="maxButton" id="inlineFormInputName5" placeholder="Button" v-model="lbButton"></b-form-input>
        <b-input-group-text slot="append">
          <strong v-text="(maxButton - lbButton.length)"></strong>
        </b-input-group-text>
      </b-input-group>

      <label for="buttonLinkInput">Lightbox Button Link</label>
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

      <h3 class="mb-4 mt-5">Lightbox Settings</h3>

      <p>What date(s) should the lightbox run?</p>
      <date-picker class="mb-4" v-model="dateRange" type="datetime" lang="en" format="YYYY-MM-DD hh:mm:ss a" range confirm :time-picker-options="{ start: '00:00', step: '00:15', end: '23:45' }"/>

      <!-- Cookie -->
      <p>Does the lightbox need a cookie?</p>
      <toggle-button id="toggleCookie" v-model="hasCookie" :labels="{checked: 'Yes', unchecked: 'No'}" />

      <!-- URL -->
      <p>Should the lightbox show up on the homepage?</p>
      <toggle-button id="toggleHomepage" :value="false" :labels="{checked: 'Yes', unchecked: 'No'}" />

      <p>Does the lightbox need to show up on any other page(s)?</p>
      <toggle-button id="toggleURL" @change="isActive = !isActive" :value="false" :labels="{checked: 'Yes', unchecked: 'No'}" />
      <label class="sr-only" for="inlineFormInputName6">URL</label>
      <b-form-input class="mb-4" id="inlineFormInputName6" placeholder="URL" v-show="isActive"></b-form-input>

    </b-form>
    <b-col class="col-md-4">
      <div class="confirmation" v-show="hasSettings">
        <h5>Confirm Your Lightbox Settings</h5>
        <p v-show="hasDateRange"><strong>You want the lightbox to start running on:</strong> <br /> {{ displayDate(dateRange[0]) }}</p>
        <p v-show="hasDateRange"><strong>And you want the lightbox to stop running on:</strong> <br /> {{ displayDate(dateRange[1]) }}</p>
        <p v-show="hasCookie"><strong>Should a cookie be set?:</strong> {{ hasCookie ? 'Yes' : 'No' }}</p>
        <b-button type="submit" variant="primary">Submit</b-button>
      </div>
    </b-col>
    <LightBox :title="disabled? '' : lbTitle" :cta="lbCTA" :text="lbText" :button="lbButton" :buttonLink="lbButtonLink" :imageUrl="imageUrl" />
  </div>
</template>

<script>

import LightBox from './LightBox.vue';
import DatePicker from 'vue2-datepicker';
import Editor from '@tinymce/tinymce-vue';
import moment from 'moment';

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
  name: 'BasicForm',
  components: {
    LightBox,
    DatePicker,
    'editor': Editor
  },
  data() {
    return { 
      maxTitle: 30,
      maxText: 150,
      maxButton: 15,
      lbTitle: '',
      lbCTA: '',
      lbText: '',
      lbButton: '',
      lbButtonLink: '',
      disabled: true,
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      isActive: false,
      imageFile: null,
      imageUrl: '',
      dateRange: [
        null,
        null,
      ],
      printStartDate: '',
      printEndDate: '',
      hasCookie: false,
      init: {
        plugins: [
          'advlist autolink lists link image charmap print preview anchor textcolor wordcount',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table contextmenu paste code directionality template colorpicker textpattern'
        ],
        menubar: false,
        toolbar1: 'undo redo | code | bold italic strikethrough | forecolor backcolor | link | bullist numlist | removeformat',
        branding: false
      }
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
    },
    hasSettings() {
      return this.hasDateRange || this.hasCookie;
    },
    hasDateRange() {
      return this.dateRange[0] && this.dateRange[1];
    },
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
    displayDate: function(date) {
      return moment(date).format("dddd, MMMM Do YYYY, h:mm a");
    },
  },
  mounted() {
    this.reset();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1 {
  position: sticky;
}
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

  .confirmation {
    background: #ccc;
    color: #000;
    padding: 20px;
    position: relative;
  }

  @media (min-width: 768px) {
   .confirmation {
      position: -webkit-sticky;
      position: sticky;
      top: 20px;
    } 
  }
</style>
