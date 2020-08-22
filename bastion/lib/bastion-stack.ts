import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import { SubnetType } from '@aws-cdk/aws-ec2';

export class BastionStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const vpc = new ec2.Vpc(this, "vpc", {
      cidr: '10.255.0.0/20',
      subnetConfiguration: [{
        cidrMask: 26,
        name: 'publicNet',
        subnetType: SubnetType.PUBLIC,
      },
      {
        cidrMask: 26,
        name: 'isoNet',
        subnetType: SubnetType.ISOLATED,
      },
      {
        cidrMask: 26,
        name: 'dmzNet',
        subnetType: SubnetType.PRIVATE,
      }]
    });
  }
}
