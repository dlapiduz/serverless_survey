import json
import boto3
import uuid
import time

client = boto3.client('dynamodb')

def store(event, context):
    """
    Parameters
    ----------
    event: dict, required
        API Gateway Lambda Proxy Input Format

        Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format

    context: object, required
        Lambda Context runtime methods and attributes

        Context doc: https://docs.aws.amazon.com/lambda/latest/dg/python-context-object.html

    Returns
    ------
    API Gateway Lambda Proxy Output Format: dict

        Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
    """


    entry = json.loads(event["body"])
    if "email" in entry and "responses" in entry:
        to_store = {
            'Id': {'S': str(uuid.uuid1())},
            'email': {'S': entry["email"] },
            'responses': {'S': str(entry["responses"])},
            'created_at': {'S': str(time.time())}
        }
        client.put_item(
            TableName="Responses",
            Item=to_store
        )


        response = {
            "statusCode": 200,
            "body": json.dumps({"message": "Stored"})
        }
    else:
        response = {
            "statusCode": 406,
            "body": json.dumps({"message": "Incorrect input"})
        }

    return response