import json
import boto3
import uuid

client = boto3.client('dynamodb')

def store(event, context):

    entry = json.loads(event["body"])
    if "email" in entry and "responses" in entry:
        to_store = {
            'Id': {'S': str(uuid.uuid1())},
            'email': {'S': entry["email"] },
            'responses': {'S': str(entry["responses"])}
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
