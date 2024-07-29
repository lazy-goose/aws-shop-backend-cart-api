import path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as apigatewayv2Integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { Construct } from 'constructs';

require('dotenv').config({
  path: path.resolve(process.cwd(), '..', '.env'),
});
require('dotenv').config({
  path: path.resolve(process.cwd(), '.env'),
});

const env = <T extends string>(...names: T[]) => {
  return Object.fromEntries(
    names.map((n) => {
      const [key, value] = [n, process.env[n]];
      if (!value) {
        throw new Error(
          `Wrong cdk environment. Variable 'process.env[${key}]' is undefined`,
        );
      }
      return [key, value];
    }),
  ) as Record<T, string>;
};

export class CartServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const Env = env(
      'DB_HOST',
      'DB_PORT',
      'DB_NAME',
      'DB_USERNAME',
      'DB_PASSWORD',
      'DB_SECURITY_GROUP_ID',
      'DB_RESOURCE_ID',
      'DB_CERTIFICATE',
    );

    /* Database */

    const cartApiRdsSecurityGroup = ec2.SecurityGroup.fromSecurityGroupId(
      this,
      'CartServiceRdsSecurityGroup',
      Env.DB_SECURITY_GROUP_ID,
    );

    const cartApiRds = rds.DatabaseInstance.fromDatabaseInstanceAttributes(
      this,
      'CartServiceRds',
      {
        instanceIdentifier: Env.DB_NAME,
        instanceEndpointAddress: Env.DB_HOST,
        port: Number(Env.DB_PORT),
        instanceResourceId: Env.DB_RESOURCE_ID,
        securityGroups: [cartApiRdsSecurityGroup],
      },
    );

    /* Lambda server */

    const FRONTEND_ORIGIN = cdk.Fn.importValue('DistributionOrigin');

    const lambdaServer = new lambda.Function(this, 'LambdaCartService', {
      runtime: lambda.Runtime.NODEJS_LATEST,
      timeout: cdk.Duration.seconds(10),
      code: lambda.Code.fromAsset(path.resolve(__dirname, '..', '..', 'dist')),
      handler: 'main.handler',
      environment: {
        DB_HOST: Env.DB_HOST,
        DB_PORT: Env.DB_PORT,
        DB_NAME: Env.DB_NAME,
        DB_USERNAME: Env.DB_USERNAME,
        DB_PASSWORD: Env.DB_PASSWORD,
        FRONTEND_ORIGIN,
      },
    });

    cartApiRds.grantConnect(lambdaServer, Env.DB_USERNAME);

    /* API Gateway */

    const apigateway = new apigatewayv2.HttpApi(this, 'CartServiceApi', {
      createDefaultStage: true,
    });

    apigateway.addRoutes({
      path: '/{proxy+}',
      methods: [apigatewayv2.HttpMethod.ANY],
      integration: new apigatewayv2Integrations.HttpLambdaIntegration(
        lambdaServer.node.id + 'Integration',
        lambdaServer,
      ),
    });

    new cdk.CfnOutput(this, 'CartApiUrl', {
      value: apigateway.url || '',
      exportName: 'CartApiUrl',
    });
  }
}
