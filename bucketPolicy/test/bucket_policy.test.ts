import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as BucketPolicy from '../lib/bucket_policy-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new BucketPolicy.BucketPolicyStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
