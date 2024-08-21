import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  Effect,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from "aws-cdk-lib/aws-iam";

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const localNamePrefix = "bedrock-amazon-titan-text-express-v1";
    const region = "ap-northeast-1";
    const idPool = {
      authenticatedRole: new Role(this, "MyAuthRole", {
        assumedBy: new ServicePrincipal("cognito-idp.amazonaws.com"),
      }),
    };

    const functionName = `${localNamePrefix}-predict-stream`;
    const predictStreamFunction = new NodejsFunction(this, functionName, {
      functionName,
      runtime: Runtime.NODEJS_18_X,
      entry: "./backend/predictStream.ts",
      timeout: Duration.minutes(15),
      bundling: {
        nodeModules: ["@aws-sdk/client-bedrock-runtime"],
      },
      environment: {
        MODEL_REGION: region,
        MODEL_ID: "amazon.titan-text-express-v1",
      },
    });

    predictStreamFunction.grantInvoke(idPool.authenticatedRole);

    const bedrockPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: ["*"],
      actions: ["bedrock:InvokeModel", "bedrock:InvokeModelWithResponseStream"],
    });
    predictStreamFunction.role?.addToPrincipalPolicy(bedrockPolicy);
  }
}
