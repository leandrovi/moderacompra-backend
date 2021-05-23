import AWS from "aws-sdk"; //https://www.npmjs.com/package/aws-sdk
import uuid from "uuid";

import awsConfig from "../config/aws";

export default class AmazonService {
  public async sendImg(fileName: string, file: any): Promise<string> {
    const s3 = new AWS.S3({
      accessKeyId: awsConfig.AWS_ID,
      secretAccessKey: awsConfig.AWS_SECRET,
    });

    const myFile = fileName.split(".");
    const fileType = myFile[myFile.length - 1];

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${uuid.v4()}.${fileType}`,
      Body: file.buffer,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        throw new Error(err);
      }
      return data;
    });
    return "data";
  }
}
