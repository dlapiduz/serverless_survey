<template>
  <div id="app">
    <div class="row">
      <div class="col-8">
        <div id="surveyContainer" style="display:inline-block;width:100%;">
          <survey :survey="survey"></survey>
        </div>
      </div>
      <div class="col-4">
      </div>
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
        title: "Tell us, what technologies do you use?",
        pages: [
            {
                name: "page1",
                questions: [
                    {
                        type: "radiogroup",
                        choices: [
                            "Yes", "No"
                        ],
                        isRequired: true,
                        name: "frameworkUsing",
                        title: "Do you use any front-end framework like Bootstrap?"
                    }, {
                        type: "checkbox",
                        choices: [
                            "Bootstrap", "Foundation"
                        ],
                        hasOther: true,
                        isRequired: true,
                        name: "framework",
                        title: "What front-end framework do you use?",
                        visibleIf: "{frameworkUsing} = 'Yes'"
                    }
                ]
            }, {
                name: "page2",
                questions: [
                    {
                        type: "radiogroup",
                        choices: [
                            "Yes", "No"
                        ],
                        isRequired: true,
                        name: "mvvmUsing",
                        title: "Do you use any MVVM framework?"
                    }, {
                        type: "checkbox",
                        choices: [
                            "AngularJS", "KnockoutJS", "React"
                        ],
                        hasOther: true,
                        isRequired: true,
                        name: "mvvm",
                        title: "What MVVM framework do you use?",
                        visibleIf: "{mvvmUsing} = 'Yes'"
                    }
                ]
            }, {
                name: "page3",
                questions: [
                    {
                        type: "comment",
                        name: "about",
                        title: "Please tell us about your main requirements for Survey library"
                    }
                ]
            }
        ]
    };
    
    
    var model = new SurveyVue.Model(surveyJSON);
    
    return {
      survey: model,
    };
  }
}



</script>

<style>
body {
  padding: 10px;
}
</style>
