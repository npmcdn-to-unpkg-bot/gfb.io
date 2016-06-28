import Vue from 'vue';
import prefectures from './scripts/prefecture-data';

export default new Vue({
  el: '#app',
  data: {
    tab: '  ',
    quote: '\'',
    outputLang: 'html',
    jsOutputType: 'array',
    keyAsName: false,
  },
  methods: {

    generateHTML() {
      let output = '<select>\n';

      if (this.keyAsName) {
        prefectures.forEach((pref) => {
          output += `${this.tab}<option value="${pref[1]}">${pref[1]}</option>\n`;
        });
      } else {
        prefectures.forEach((pref) => {
          output += `${this.tab}<option value="${pref[0]}">${pref[1]}</option>\n`;
        });
      }

      output += '</select>';
      return output;
    },

    generateJSObject() {
      const quo = this.quote;
      let output = '[\n';

      if (this.keyAsName) {
        prefectures.forEach((pref) => {
          output += `${this.tab}{ ${quo}${pref[1]}${quo}: ${quo}${pref[1]}${quo} },\n`;
        });
      } else {
        prefectures.forEach((pref) => {
          output += `${this.tab}{ ${quo}${pref[0]}${quo}: ${quo}${pref[1]}${quo} },\n`;
        });
      }

      output += '];';
      return output;
    },

    generateJSArray() {
      const quo = this.quote;
      let output = '[\n';

      if (this.keyAsName) {
        prefectures.forEach((pref) => {
          output += `${this.tab}[ ${quo}${pref[1]}${quo}, ${quo}${pref[1]}${quo} ],\n`;
        });
      } else {
        prefectures.forEach((pref) => {
          output += `${this.tab}[ ${quo}${pref[0]}${quo}, ${quo}${pref[1]}${quo} ],\n`;
        });
      }

      output += '];';
      return output;
    },

    outputHTML() {
      return this.generateHTML();
    },

    outputJSCode() {
      if (this.jsOutputType === 'array') {
        return this.generateJSArray();
      }
      return this.generateJSObject();
    },
  },
  computed: {
    output() {
      if (this.outputLang === 'javascript') {
        return this.outputJSCode();
      }
      return this.outputHTML();
    },
    optionsForJS() {
      return this.outputLang === 'javascript';
    },
    optionsForHTML() {
      return this.outputLang === 'html';
    },
  },
});

