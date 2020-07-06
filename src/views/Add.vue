<template>
  <div class="add">
    <v-dialog
      v-model="dialog"
      persistent
      content-class="no-box-shadow">
      <div class="text-center">
        <v-progress-circular
          size="80"
          width="8"
          indeterminate
          color="primary">
        </v-progress-circular>
      </div>
    </v-dialog>
    <div
      class="error-message"
      v-if="unavailable">
      Sorry, server unavailable. <a href="/Add">Refresh.</a>
      <v-icon class="white--text">error_outline</v-icon>
    </div>
    <v-textarea
      v-model="jsonstring"
      :error-messages="jsonstring === '' ? [] : jsonValidation === '' ? ['Invalid JSON.'] : []" 
      v-on:input="error = !error"
      label="Type here...">
    </v-textarea>
    <pre
      v-text="jsonValidation"
      class="text white--text">
    </pre>
    <v-btn
      :disabled="unavailable === true ? true : jsonValidation === '' ? true : jsonValidation === 'Invalid JSON.' ? true : false" 
      @click="addJson"
      color="secondary">submit json
    </v-btn>
    <div class="upload-message success" v-if="uploadsuccessful===true"><v-icon>mdi-check</v-icon> Upload Successful</div>
    <div class="upload-message failed" v-else-if="uploadsuccessful===false"><v-icon>mdi-close</v-icon> Upload Failed</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    jsonstring: '',
    error: false,
    unavailable: false,
    dialog: true,
    uploadsuccessful: '',
    host: 'http://localhost:3333',
    //host: 'http://oryx-json-server.rokskrbec.si'
    }  
  },
  mounted() {
    fetch(`${this.host}/api/json`)
    .then((res) => res.json())
    .then(() => {
      //console.log(data)
      this.dialog = false
    })
    .catch((err) => {
      this.unavailable = true
      this.dialog = false
      console.log('err: ' + err)
    })
  },
  methods: {
    addJson() {
      //let proxy = 'https://cors-anywhere.herokuapp.com/'
      let proxy = ''
      this.dialog = true
      fetch(`${proxy}${this.host}/api/json`,
      {      
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          //'Access-Control-Allow-Origin': '*',
        },
        method: 'PUT',
        body: this.jsonstring
      }).then(res => {
        res.text()
        console.log('Upload successful!')
        this.uploadsuccessful = true
        this.dialog = false
        this.jsonstring = ''
      }).catch(err => {
        console.log('err: ' + err)
        this.unavailable = true
        this.uploadsuccessful = false
        this.dialog = false
      })
        
    }
  },
  computed: {
    jsonValidation() {
      let jsonValue
      try {
        jsonValue = JSON.parse(this.jsonstring)
      } catch (e) {
        return ''
      }
      return JSON.stringify(jsonValue, null, 4)
    },
  },
}
</script>

<style lang="less"> // no scoped so we can style dialog (renove box shadow)
@width: 80%;
@largeScreenWidth: 50%;
@error: #D32F2F;
@success: #4CAF50;

.v-progress-circular {
  margin: 1rem;
}

.no-box-shadow {
  box-shadow: none;
}

// "scoped"
.add {
  width: @width;
  margin: 20px auto;

  .error-message {
    display: inline-block;
    width: 100%;
    height: 25px;
    background-color: @error;
    color: white;
    text-align: center;
    font-size: 12px;
    line-height: 25px;

    a {
      color: white;
    }
    .v-icon {
      font-size: 20px;
      margin-left: 5px;
    }
  }

  .v-btn {
  display:inline-block;
  margin-top: 10px;
  }

  pre {
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
  }
  .upload-message {
    display: block;
    
    color: white;
    margin-top: 10px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 14px;

    .v-icon {
      color: white;
      font-size: 36px;
      margin-bottom: 3px;
    }
  }

  .success {
    background-color: @success;
  }

  .failed {
    background-color: @error;
  }
}

@media all and (min-width: 960px) {
  .add {
    width: @largeScreenWidth;
  }
}

</style>