import * as cdk from 'aws-cdk-lib';
import { ChatCollaborationAppStack } from './chat-collaboration-app-stack';

const app = new cdk.App();
new ChatCollaborationAppStack(app, 'ChatCollaborationAppStack');
