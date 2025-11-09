import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  aws_lambda as lambda,
  aws_dynamodb as dynamodb,
  aws_apigatewayv2 as apigwv2,
  aws_apigatewayv2_integrations as apigwv2_integrations,
} from 'aws-cdk-lib';
export class ChatCollaborationAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //create DynamoDB tables for each microservices
    const usersTable = new dynamodb.Table(this, 'UserTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });

    const messageTable = new dynamodb.Table(this, 'MessageTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });

    const notificationTable = new dynamodb.Table(this, 'NotificationTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });

    //creating lambda function for each microservices
    const websocketGatewayLambda = new lambda.Function(
      this,
      'WebsocketGatewayLambda',
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        code: lambda.Code.fromAsset('dist/apps/websocket-gateway'),
        handler: 'main.handler',
      },
    );

    const userServiceLambda = new lambda.Function(this, 'UserServiceLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('dist/apps/user-service'),
      handler: 'main.handler',
      environment: {
        USER_TABLE_NAME: usersTable.tableName,
      },
    });

    const messageServiceLambda = new lambda.Function(
      this,
      'MessageServiceLambda',
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        code: lambda.Code.fromAsset('dist/apps/message-service'),
        handler: 'main.handler',
        environment: {
          MESSAGE_TABLE_NAME: messageTable.tableName,
        },
      },
    );

    const notificationServiceLambda = new lambda.Function(
      this,
      'NotificationServiceLambda',
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        code: lambda.Code.fromAsset('dist/apps/notification-service'),
        handler: 'main.handler',
        environment: {
          NOTIFICATION_TABLE_NAME: notificationTable.tableName,
        },
      },
    );

    // Grant Lambda functions to access to DynamoDB tables
    usersTable.grantReadWriteData(userServiceLambda);
    messageTable.grantReadWriteData(messageServiceLambda);
    notificationTable.grantReadWriteData(notificationServiceLambda);

    // Create an API Gateway WebSocket API
    const websocketAPI = new apigwv2.WebSocketApi(this, 'WebsocketApi', {
      connectRouteOptions: {
        integration: new apigwv2_integrations.WebSocketLambdaIntegration(
          'ConnectIntegration',
          websocketGatewayLambda,
        ),
      },
      disconnectRouteOptions: {
        integration: new apigwv2_integrations.WebSocketLambdaIntegration(
          'DisconnectIntegration',
          websocketGatewayLambda,
        ),
      },
      defaultRouteOptions: {
        integration: new apigwv2_integrations.WebSocketLambdaIntegration(
          'DefaultIntegration',
          websocketGatewayLambda,
        ),
      },
    });

    //creating routes for websocket
    websocketAPI.addRoute('user', {
      integration: new apigwv2_integrations.WebSocketLambdaIntegration(
        'UserIntegration',
        userServiceLambda,
      ),
    });

    websocketAPI.addRoute('message', {
      integration: new apigwv2_integrations.WebSocketLambdaIntegration(
        'MessageIntegration',
        messageServiceLambda,
      ),
    });

    websocketAPI.addRoute('notification', {
      integration: new apigwv2_integrations.WebSocketLambdaIntegration(
        'NotificationIntegration',
        notificationServiceLambda,
      ),
    });

    // Deploy the WebSocket stage
    new apigwv2.WebSocketStage(this, 'DevStage', {
      webSocketApi: websocketAPI,
      stageName: 'dev',
      autoDeploy: true,
    });
  }
}
