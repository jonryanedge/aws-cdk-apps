import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import { FlowLogDestination, FlowLogTrafficType, FlowLogResourceType, SubnetType } from '@aws-cdk/aws-ec2';

export class VpcStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const dVpc = new ec2.Vpc(this, 'dVpc', {
      cidr: "10.255.0.0/22",
      flowLogs: {
        VpcFlowLogs: {
          destination: ec2.FlowLogDestination.toCloudWatchLogs(),
          trafficType: ec2.FlowLogTrafficType.ALL,
        }
      },
      subnetConfiguration: [
        {
          cidrMask: 26,
          name: 'isolatedNet',
          subnetType: SubnetType.ISOLATED,
        },
        {
          cidrMask: 26,
          name: 'publicNet',
          subnetType: SubnetType.PUBLIC,
        }
      ],
      maxAzs: 2,
      natGateways: 2,
    }); 

    // dVpc.addFlowLog('vpcFlowLogs', {
    //   destination: FlowLogDestination.toCloudWatchLogs(),
    //   trafficType: FlowLogTrafficType.ALL,
    // })

  }
}
