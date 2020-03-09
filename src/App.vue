<template>
  <div id="app">
    <div class="jumbotron">
      <h1 class="display-4">Serverless Security Assessment</h1>
      <p class="lead">Serverless security is usually associated with application security but it is much more than that.</p>

    </div>


    <div class="row">
      <div class="col-8">
        <div id="surveyContainer" style="display:inline-block;width:100%;">
          <survey :survey="survey"></survey>
        </div>
      </div>
      <div class="col-4">
        <p>
          This scoring tool will help you find areas where you are doing great and where you need improvement.
          The goal is not to be exhaustive but to help find overlooked spots. Use at your own risk.
        </p>
        <p>
          For the purposes of this tool, serverless not only means function as as service (FaaS like AWS Lambda or Google Functions) but plaform services where you don't have to manage the "instance".
          For example AWS DynamoDB is considered serverless and RDS is not.
        </p>
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
  padding: 2rem;
}

.jumbotron {
  padding: 2rem;
}
</style>
