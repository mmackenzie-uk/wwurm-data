"use client"

import AWS from 'aws-sdk';
import { ObjectList } from 'aws-sdk/clients/s3';
import { useState, useEffect } from 'react';

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


export default function BucketImageWidget({ albumName = "all-produkte"} : { albumName: string}) {
  const [photos, setPhotos] = useState<ObjectList>([]);
  const [bucketUrl, setBucketUrl] = useState("");

  const prefix = encodeURIComponent(albumName) + "/";

  useEffect(() => {
    s3.listObjects({ Prefix: prefix, Bucket }, function(err, data){
       // @ts-ignore
      const href = this.request.httpRequest.endpoint.href;
      setPhotos(data.Contents!);
      setBucketUrl(href + Bucket + "/");
    });
  }, [albumName]);

  return (
    <div className="bucket-image-widget-container">
      <ul className="bucket-image-widget-list" role="list">
      {
        photos.slice(1).map(photo => 
          <li key={photo.Key} className="bucket-image-widget-li">
            <div className="bucket-image-widget-img-wrap">
              <img 
                src={bucketUrl + encodeURIComponent(photo.Key!)} 
                className="bucket-image-widget-img"
              />
            </div>
          </li>
        )
      }
      </ul>
    </div>
   
  )
}
