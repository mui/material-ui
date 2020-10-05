# Rating

This Lambda function stores and retrieves page ratings using DynamoDB.

## Prerequisites

Create an AWS profile in ~/.aws/credentials called "claudia" with credentials corresponding to an IAM user with AWSLambdaFullAccess and IAMFullAccess policies.

Create a table in DynamoDB, with a `string` partition key called `id`, and a sort key called `page`. You can do that from the DynamoDB web console, or using the AWS CLI command line. Here is an example command that will create the `ratings-dev` table with the minimal provisioned throughput:

```bash
aws dynamodb create-table --profile claudia --region us-east-1 \
  --attribute-definitions AttributeName=id,AttributeType=S AttributeName=page,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH AttributeName=page,KeyType=RANGE \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=1 \
  --query TableDescription.TableArn --output text \
  --table-name ratings-dev
```

You will need to repeat this command to create a `ratings-prod` table for production.

For on-demand throughput, replace:

```
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=1 \
```

with:

```
  --billing-mode PAY_PER_REQUEST \
```

The project includes an IAM access policy that will grant the lambda function access to the tables. You can edit the [policies/access-dynamodb.json](policies/access-dynamodb.json) file to change the access permissions. These are only applied on create.

> ⚠️ You will need to update the "Resource" key in this file with the value returned after creating each table.

## Get started

> ⚠️ When setting up for the first time, you will need to delete the included `claudia.json` file that is specific to the MUI installation. It is only included here for ease of access.

To set this up, first [set up the credentials](https://github.com/claudiajs/claudia/blob/master/getting_started.md#configuring-access-credentials), then:

1. run `yarn install` to install the dependencies
2. run `yarn setup` to create the lambda project under the default name on AWS.
   This will also ask you for a table name. If you used the above AWS command, it will be `ratings`.
3. Test the API with using the [example requests below](#testing)

For subsequent updates, use the `npm run deploy` command.

## Stage variables

The table name, stored in the API Gateway stage variables, is passed to each request processor in the `request.env` key-value map. Check out [index.js](index.js) to see it in use.

The value is set during the first deployment, using `--configure-table-dev` & `--configure-table-prod`. This works using a post-deploy step (check out the last line of [index.js](index.js) for the actual setup, and [Configuring stage variables using post-deployment steps](https://github.com/claudiajs/claudia-api-builder/blob/master/docs/api.md#configuring-stage-variables-using-post-deployment-steps) for more information about the API).

## The API

- `POST` to `/rating` - stores a new rating data object
- `GET` from `/rating/{id}` - returns all ratings with id `{id}`
- `GET` from `/rating/averageRating` - returns average ratings for all pages

## Testing

Claudia will print the API URL after it is created (typically something in the format `https://[API ID].execute-api.[REGION].amazonaws.com/<version>`). Replace `<API-URL>` with that value in the examples below:

You can test the API by using `curl` (or using a fancier client like [Postman](https://www.getpostman.com/)). Below are some examples with `curl`.

### Create new rating

This will create a rating from the data stored in [example.json](example.json). Change the data in the file to create ratings:

```bash
curl -H "Content-Type: application/json" -X POST --data @example.json <API-URL>/rating
```

Add the UUID returned to `example.json` with key `id` to store more ratings under the same id.

### Get ratings

This will get the ratings for ID 123 (replace the ID to get other ratings)

```bash
curl <API-URL>/ratings/123
```
