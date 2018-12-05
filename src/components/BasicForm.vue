<template>
  <div>
    <div class="container">
      <div class="row">
        <b-form class="col-md-8 formContainer">
          <h1>Lightbox Builder</h1>

          <h3 class="mb-4 mt-5">Settings</h3>

          <p>What date(s) should the lightbox run?</p>
          <date-picker class="mb-4" v-model="dateRange" type="datetime" lang="en" format="YYYY-MM-DD hh:mm:ss a" range confirm :time-picker-options="{ start: '00:00', step: '00:15', end: '23:45' }"/>

          <!-- Cookie -->
          <p>Display the lightbox once every 24 hours?</p>
          <toggle-button id="toggleCookie" v-model="hasCookie" :labels="{checked: 'Yes', unchecked: 'No'}" />

          <!-- URL -->
          <p>Should the lightbox show up on the homepage?</p>
          <toggle-button id="toggleHomepage" v-model="hasHomepage" :value="false" :labels="{checked: 'Yes', unchecked: 'No'}" />

          <p>Does the lightbox need to show up on any other page(s)?</p>
          <toggle-button id="toggleURL" v-model="hasMoreUrls" @change="isActive = !isActive" :value="false" :labels="{checked: 'Yes', unchecked: 'No'}" />
          <label for="inlineFormInputName6" v-show="isActive">Please list the URL's where the lightbox should be displayed <br /><small>Separate each URL with a comma</small></label>
          <b-form-input class="mb-4" id="inlineFormInputName6" v-show="isActive" @change="displayUrls()" v-model="listOfURLs"></b-form-input>

          <h3 class="mb-4 mt-5">Visuals</h3>

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
          <editor class="mb-4" id="d1" apiKey="7mefmhm1bfkj5sx0crxyumykdlr70kon0ckpylqzxcyi87iv" v-model="lbText" :init="init"></editor>
          
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

          

        </b-form>
        <b-col class="col-md-4">
          <div class="confirmation" v-show="hasSettings">
            <h5>Confirm Your Lightbox Settings</h5>
            <p v-show="hasDateRange"><strong>You want the lightbox to start running on:</strong> <br /> {{ displayDate(dateRange[0]) }}</p>
            <p v-show="hasDateRange"><strong>And you want the lightbox to stop running on:</strong> <br /> {{ displayDate(dateRange[1]) }}</p>
            <p v-show="hasCookie"><strong>Once every 24 hours?:</strong> {{ hasCookie ? 'Yes' : 'No' }}</p>
            <p v-show="hasHomepage"><strong>Display on the homepage?:</strong> {{ hasHomepage ? 'Yes' : 'No' }}</p>
            <div v-show="hasMoreUrls"><p><strong>List of URLs:</strong></p> <ul class="list-of-urls"></ul></div>
            <b-button type="submit" variant="primary" @click="collectInfo()">Submit</b-button>
          </div>
        </b-col>
      </div>
    </div>
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
      listOfURLs: '',
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
      hasHomepage: false,
      hasMoreUrls: false,
      init: {
        plugins: [
          'advlist autolink lists link image charmap print preview anchor textcolor wordcount',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table contextmenu paste code directionality template colorpicker textpattern'
        ],
        menubar: false,
        toolbar1: 'undo redo | code | bold italic strikethrough | forecolor backcolor | link | bullist numlist | removeformat',
        branding: false
      },
      sendableInfo: {},
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
      return this.hasDateRange || this.hasCookie || this.hasHomepage || this.hasMoreUrls;
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
      return moment(date).format("dddd, MMMM D, YYYY" + " @" + " h:mm a");
    },
    displayUrls() {
      if (this.listOfURLs != null) {

        let list = document.querySelector('.list-of-urls');
        let z = this.listOfURLs.split(",");

        for (let i = 0; i < z.length; i++) {
          let listItem = document.createElement('li');
          listItem.innerHTML = z[i];
          list.appendChild(listItem);
        }
      }
    },
    collectInfo() {
      this.sendableInfo.dates = this.dateRange;
      this.sendableInfo.cookie = this.hasCookie;
      this.sendableInfo.homepage = this.hasHomepage;
      this.sendableInfo.urls = this.listOfURLs;
      console.log(this.sendableInfo);
      
    }
  },
  mounted() {
    this.reset();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .formContainer {
    background: #f0eded;
    // border: 1px solid #ddd;
    padding-bottom: 20px;
    padding-top: 20px;
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

  label {
    display: block;
  }

  .confirmation p {
    margin: 0;
  }

  @media (min-width: 768px) {
   .confirmation {
      position: -webkit-sticky;
      position: sticky;
      top: 20px;
    } 
  }
</style>
