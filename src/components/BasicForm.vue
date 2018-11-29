<template>
  <div class="row">
    <b-form class="col-md-12">
      <b-form-group id="exampleInputGroup1"
                    label="Do you need a title?"
                    label-for="toggleTitle">
        <toggle-button id="toggleTitle" @change="disabled = (disabled + 1) % 2" :value="false" :labels="{checked: 'Yes', unchecked: 'No'}" />
        <label class="sr-only" for="inlineFormInputName2">Lightbox Title</label>
        <b-input-group class="mb-md-4">
          <b-form-input :maxlength="maxTitle" id="inlineFormInputName2" placeholder="Title" v-model="lbTitle" :disabled="disabled == 0 ? true : false"></b-form-input>
          <b-input-group-text slot="append">
            <strong v-text="(maxTitle - lbTitle.length)"></strong>
          </b-input-group-text>
        </b-input-group>
      </b-form-group>
      
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

      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <p>Upload An Image</p>
        <div class="dropbox mb-md-4">
          <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            accept="image/*" class="input-file">
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
        <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Upload again</a>
        </p>
        <ul class="list-unstyled">
          <li v-for="item in uploadedFiles">
            <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
          </li>
        </ul>
      </div>
      <!--FAILED-->
      <div v-if="isFailed">
        <h2>Uploaded failed.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Try again</a>
        </p>
        <pre>{{ uploadError }}</pre>
      </div>

      <!-- Dates -->
      <p>What date(s) should the lightbox run?</p>
      <vue-rangedate-picker></vue-rangedate-picker>

    </b-form>

    <LightBox :title="lbTitle" :cta="lbCTA" :text="lbText" :button="lbButton" />
  </div>
</template>

<script>

import { serverBus } from '../main';
import LightBox from './LightBox.vue';
// import { upload } from '../file-upload.service';
import { upload } from '../file-upload.fake.service';

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
  name: 'BasicForm',
  components: {
    LightBox
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
      disabled: 0,
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos'
    }
  },
  watch: {
    sendData: function () {
      serverBus.$emit('test', this.title);
      serverBus.$emit('test', this.text);
      serverBus.$emit('test', this.button);
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
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name);
        });

      // save it
      this.save(formData);
    }
  },
  mounted() {
    this.reset();
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
