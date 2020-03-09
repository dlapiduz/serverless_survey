<template>
  <div id="app">

    <div id="surveyContainer" style="display:inline-block;width:100%;">
      <survey :survey="survey"></survey>
    </div>
  </div>
</template>

<script>
import * as SurveyVue from "survey-vue";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

SurveyVue.StylesManager.applyTheme("bootstrap");
SurveyVue.defaultBootstrapCss.navigationButton = "btn btn-primary";

export default {
  name: 'App',
  components: {
  },
  data() {
    var surveyJSON = {
    };
    
    
    var model = new SurveyVue.Model(surveyJSON);
    
    return {
      survey: model,
    };
  }
}



</script>

<style>
</style>
