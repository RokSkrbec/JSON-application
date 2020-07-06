<template>
  <div class="find">
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
      Sorry, server unavailable. <a href="/">Refresh.</a>
      <v-icon class="white--text">error_outline</v-icon>
    </div>
    <v-text-field 
      :error-messages="error ? ['No such index.'] : []" 
      v-model="searchIndex" 
      @input="checkIndex()" 
      label="Enter JSON index"
      append-outer-icon="search">
    </v-text-field>
    <v-btn
      :disabled="!searchIndex || error"
      @click="showJsonFile(searchIndex)"
      color="secondary">
    Get JSON</v-btn>
    <div class="list">Or select from the list below.</div>
    <v-list>
      <v-list-item
        v-for="jsonFile in visiblePages" 
        :key="jsonFile" 
        @click="showJsonFile(jsonFile.replace('.json', ''))"
        link
        dense
        >
        <v-list-item-icon>
          <v-icon class="secondary--text">mdi-file-document</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Index: {{jsonFile.replace('.json', '')}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-pagination
      v-model="page"
      :length="Math.ceil(jsonFiles.length/perPage)"
      :total-visible="5">
    </v-pagination>
    <h3 v-if="jsonIndex">{{jsonIndex}}.json</h3>
    <pre 
      v-if="jsonContent"
      class="text white--text">{{JSON.stringify(jsonContent, null, 4)}}</pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      page: 1,
      perPage: 5,
      jsonFiles: [],
      searchIndex: '',
      error: false,
      jsonIndex: '',
      jsonContent: '',
      unavailable: false,
      dialog: true,
      host: 'http://localhost:3333',
      //host: 'http://oryx-json-server.rokskrbec.si'
    }
  },
    mounted() {
    fetch(`${this.host}/api/json`)
    .then((res) => res.json())
    .then((data) => {
      this.jsonFiles = data
      this.dialog = false
    })
    .catch((err) => {
      this.unavailable = true
      this.dialog = false
      console.log('err: ' + err)
    })
  },
  methods: {
    showJsonFile (index) {
      fetch(`${this.host}/api/json/${index}`)
      .then((res) => res.json())
      .then((data) => {
        this.jsonIndex = index
        this.jsonContent = data
      })
      .catch((err) => {
      this.unavailable = true
      console.log('err: ' + err)
    })
    },
    checkIndex() {
      this.error = !this.jsonFiles.includes(`${this.searchIndex}.json`)
      if(this.searchIndex == ''){
        this.error = false
      }
    },
  },
  computed: {
    visiblePages () {
      return this.jsonFiles.slice((this.page - 1) * this.perPage, this.page * this.perPage)
    }
  }
}
</script>

<style lang="less"> // no scoped so we can style dialog (renove box shadow)
@width: 80%;
@largeScreenWidth: 50%;
@error: #D32F2F;

.v-progress-circular {
  margin: 1rem;
}

.no-box-shadow {
  box-shadow: none;
}

// "scoped"
.find {
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

  .list {
    margin-top: 20px;
  }

  h3 {
    margin: 20px 0 5px 0;
    //box-shadow: 0 3px 3px -3px gray;
  }

  pre {
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
  }
}

@media all and (min-width: 960px) {
  .find {
    width: @largeScreenWidth;
  }
}
</style>