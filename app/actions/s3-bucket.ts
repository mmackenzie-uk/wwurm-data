"use server"

import AWS from 'aws-sdk';
import { S3_ALBUM_NAME } from '../configuration/wwurm';

import {
    S3Client,
    ListObjectsV2Command,
} from "@aws-sdk/client-s3";

// Initialize the Amazon Cognito credentials provider
AWS.config.region = "eu-west-2"; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: process.env.AWS_IDENTITY_POOL!,
});
const BucketName = process.env.AWS_BUCKET_NAME!;
const client = new S3Client({});

export default async function getPhotos() {
    const input = {
        Bucket: BucketName,
        Prefix: S3_ALBUM_NAME
    };
    const command = new ListObjectsV2Command(input);
    const response = await client.send(command);
    const href = `https://${BucketName}.s3.eu-west-2.amazonaws.com/`

    return {
        photos: response.Contents?.slice(1),
        bucketUrl: href  
    };
}

  
