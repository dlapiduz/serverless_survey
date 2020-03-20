
Survey.StylesManager.applyTheme("bootstrap");
Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";

const NO_POINT = 0;

var score = 0;

var surveyJSON = {
  title: "How is your serverless environment configured?",
  pages: [
      {
          name: "iam-and-automation",
          title: "Let's start with some basics about your framework, pipeline and IAM setup:",
          elements: [
              {
                  type: "dropdown",
                  choices: [
                      {text: "Apex", value: 10},
                      {text: "Chalice", value: 11},
                      {text: "Claudia.js", value: 12},
                      {text: "Serverless Framework", value: 13},
                      {text: "Sparta", value: 14},
                      {text: "None", value: NO_POINT},
                  ],
                  hasOther: true,
                  isRequired: true,
                  name: "frameworkUsing",
                  title: "Do you use a serverless application framework?",
              },
              {
                  type: "radiogroup",
                  choices: [
                      {text: "Manually", value: NO_POINT},
                      {text: "Delivery pipeline just for code", value: 1},
                      {text: "Delivery pipeline just for infrastructure", value: 2},
                      {text: "Delivery pipeline for code and infrastructure", value: 10},
                  ],
                  hasOther: true,
                  isRequired: true,
                  name: "cd",
                  title: "How do you push updates to the code and infrastructure?",
              },
              {
                  type: "radiogroup",
                  choices: [
                    {text: "Yes", value: 10},
                    {text: "No", value: NO_POINT},
                  ],
                  isRequired: true,
                  name: "iam-pipeline",
                  title: "Do you have a limited IAM role dedicated for the pipeline?",
                  visibleIf: "{cd} != 'Manually'"
              },
              {
                  type: "radiogroup",
                  choices: [
                    {text: "Yes", value: 10},
                    {text: "No", value: NO_POINT},
                  ],
                  isRequired: true,
                  name: "iam",
                  title: "For Lambda/Functions, Do you have an IAM role with limited access to just update the code?",
                  visibleIf: "{cd} = 'Manually'"

              },
              {
                  type: "radiogroup",
                  choices: [
                    {text: "Yes", value: 10},
                    {text: "No", value: NO_POINT},
                  ],
                  isRequired: true,
                  name: "secrets",
                  title: "Do you use a secrets store for access keys or credentials like AWS Secrets Manager or Azure Key Vault?"

              },
          ]
      },
      {
          name: "appsec",
          title: "Next, let's move to application security:",
          elements: [
              {
                  type: "radiogroup",
                  choices: [
                    {text: "No", value: NO_POINT},
                    {text: "Dependabot with GitHub", value: 10},
                    {text: "Snyk", value: 11},
                    {text: "Whitesource", value: 12},
                    {text: "Sonatype", value: 13},
                  ],
                  hasOther: true,
                  isRequired: true,
                  name: "dependencies",
                  title: "Do you use a dependency vulnerability tracking tool?"
              },
              {
                  type: "radiogroup",
                  choices: [
                    {text: "Yes", value: 10},
                    {text: "No", value: NO_POINT},
                  ],
                  isRequired: true,
                  name: "static",
                  title: "Do you perform static code analysis on the code before pushing it to production?"
              },
              {
                  type: "radiogroup",
                  choices: [
                    {text: "Yes, we perform dynamic tests on the full application stack including API Gateways or WAF", value: 10},
                    {text: "Yes, we perform dynamic tests on a different environment directly to the function code bypassing any Gateway or WAF", value: 11},
                    {text: "No", value: NO_POINT},
                  ],
                  isRequired: true,
                  name: "dast",
                  title: "How about dynamic testing, Do you use a tool to dynamically test the security of your application like OWASP ZAP ?"
              },
          ]
      },
      {
          name: "networking",
          title: "Networking setup is critical for serverless too:",
          questions: [
              {
                  type: "radiogroup",
                  choices: [
                    {text: "Yes", value: 10},
                    {text: "No", value: NO_POINT},
                  ],
                  isRequired: true,
                  name: "api-gw",
                  title: "Do you use an API Gateway?"
              },
              {
                  type: "radiogroup",
                  choices: [
                    {text: "Yes", value: 10},
                    {text: "No", value: NO_POINT},
                  ],
                  isRequired: true,
                  name: "vpc-traffic",
                  title: "Do you block all traffic in and out of the VPC/Virtual Network?"
              },
              {
                  type: "radiogroup",
                  choices: [
                    {text: "Yes", value: 10},
                    {text: "No", value: NO_POINT},
                  ],
                  isRequired: true,
                  name: "vpc-endpoints",
                  title: "For backing services like databases or storage, Do you use VPC or Virtual Network private endpoints?"
              },
              {
                  type: "radiogroup",
                  choices: [
                    {text: "Yes", value: 10},
                    {text: "No", value: NO_POINT},
                  ],
                  isRequired: true,
                  name: "api-tls",
                  title: "Do you force traffic to your endpints to use HTTPS?"
              },

          ]
      },
      {
          name: "operations",
          title: "How do you manage operations for the environment:",
          elements: [
              {
                  type: "radiogroup",
                  choices: [
                    {text: "Yes, with Cloudformation Stack Drift Detection", value: 10},
                    {text: "Yes, with Cloudformation Stack Drift Detection", value: 11},
                    {text: "No", value: NO_POINT},
                  ],
                  isRequired: true,
                  name: "drift",
                  title: "Do you check for drift on your fuction or containers?"
              },
              {
                  type: "radiogroup",
                  choices: [
                    {text: "Yes, on the cloud provider log system (CloudWatch logs/Azure Sentinel/Google Cloud Logging)", value: 10},
                    {text: "Yes, on a dedicated SIEM (Splunk/ELK/other)", value: 11},
                    {text: "No", value: NO_POINT},
                  ],
                  isRequired: true,
                  name: "logs",
                  title: "Do you aggregate and correlate logs from all services?"
              },

          ]
      },
      {
          name: "recover",
          title: "If something goes wrong, Is your plan ready?:",
          elements: [
              {
                  type: "radiogroup",
                  choices: [
                    {text: "Yes, in the same cloud provider", value: 10},
                    {text: "Yes, in another cloud provider", value: 11},
                    {text: "Yes, on-prem", value: 12},
                    {text: "No", value: NO_POINT},
                  ],
                  isRequired: true,
                  name: "backup",
                  title: "Do you have off-account backups of all your persistent data (storage, databases, etc)?"
              },
              {
                  type: "radiogroup",
                  choices: [
                    {text: "Yes and it is tested regularly", value: 10},
                    {text: "Yes but we haven't tested it yet", value: 1},
                    {text: "No", value: NO_POINT},
                  ],
                  isRequired: true,
                  name: "contingency",
                  title: "Do you have a written plan on how to recover your services if they become corrupted?"
              },

          ]
      }
  ]
};

window.survey = new Survey.Model(surveyJSON);

survey
    .onValueChanged
    .add(function (sender) {
      var old_score = score/130;
      score = calculateScore(sender.data);

      $("#circle .score strong").html(score);

      $("#circle").circleProgress({ value: score/130, animationStartValue: old_score });
    });

$("#surveyElement").Survey({model: survey});

$('#circle').circleProgress({
  value: 0,
  size: 200,
  thickness: 15,
  fill: {
    gradient: ["#06c"]
  }
});



function calculateScore(data) {
  const MAX_SCORE = 10;
  const MID_SCORE = 5;
  var score = 0;

  for (let i = 0; i < Object.values(data).length; i++) {
    const element = Object.values(data)[i];
    if (element >= 10) {score += MAX_SCORE};
    if (element > 0 && element < 10) {score += MID_SCORE};
  }

  return score;
}