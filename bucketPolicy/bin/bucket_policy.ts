#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { BucketPolicyStack } from '../lib/bucket_policy-stack';

const app = new cdk.App();
new BucketPolicyStack(app, 'BucketPolicyStack');
