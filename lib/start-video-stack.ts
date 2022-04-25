import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as gw from 'aws-cdk-lib/aws-apigateway'
import { ManagedPolicy } from 'aws-cdk-lib/aws-iam';

export class StartVideoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const startVideoHandler = new lambda.Function(this, 'StartVideo', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('app'),
      handler: 'start-video.main',
    })

    startVideoHandler.role?.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AWSLambda_FullAccess'))
    startVideoHandler.role?.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonChimeFullAccess'))
    
    new gw.LambdaRestApi(this, 'StartVideoGW', {
      handler: startVideoHandler
    })
  }
}
