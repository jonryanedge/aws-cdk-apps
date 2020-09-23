import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';

export class BastionStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const vpc = new ec2.Vpc(this, "vpc", {
      cidr: '10.255.0.0/20',
      subnetConfiguration: [{
        cidrMask: 26,
        name: 'publicNet',
        subnetType: ec2.SubnetType.PUBLIC,
      },
      {
        cidrMask: 26,
        name: 'isoNet',
        subnetType: ec2.SubnetType.ISOLATED,
      },
      {
        cidrMask: 26,
        name: 'dmzNet',
        subnetType: ec2.SubnetType.PRIVATE,
      }],
      natGateways: 1,
      flowLogs: {
        VpcFlowLogs: {
          destination: ec2.FlowLogDestination.toCloudWatchLogs(),
        }
      }
    });

    const amzn_linux = ec2.MachineImage.latestAmazonLinux({
      generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
    });

    const role = new iam.Role(this, 'InstanceSSM', {
      assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
      managedPolicies: [ iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AmazonEC2RoleforSSM") ],
    });

    const bastion = new ec2.Instance(this, 'bastion', {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2,ec2.InstanceSize.NANO),
      machineImage: amzn_linux,
      role: role,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE,
      }
    });
  }
}
