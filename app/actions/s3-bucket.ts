"use server"

import AWS from 'aws-sdk';
import { ObjectList } from 'aws-sdk/clients/s3';

// Initialize the Amazon Cognito credentials provider
AWS.config.region = "eu-west-2"; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL!,
});
const Bucket = process.env.NEXT_PUBLIC_BUCKET_NAME!;

// Create a new service object
const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket },
});

export default async function getPhotos(): Promise<{ photos: ObjectList | undefined, bucketUrl: string }> {
    const albumName = "all-produkte";
    const prefix = encodeURIComponent(albumName) + "/";

    return new Promise((resolve, reject) => 
        s3.listObjects({ Prefix: prefix, Bucket }, function(err, data){
            if (err) {
                reject(err);
            }
            // @ts-ignore
            const href = this.request.httpRequest.endpoint.href;
            resolve(
                {
                    photos: data.Contents?.slice(1),
                    bucketUrl: href + Bucket + "/"
                }
            );
        }));
}


  
