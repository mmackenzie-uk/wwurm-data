import { S3_ALBUM_NAME, AWS_BUCKET_NAME, AWS_REGION } from './wwurm';

export const HREF = `https://${AWS_BUCKET_NAME}.s3.eu-west-2.amazonaws.com/`;

export const IMAGE_PREFIX = HREF + S3_ALBUM_NAME + "/";
