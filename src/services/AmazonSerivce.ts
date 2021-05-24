import AWS from "aws-sdk"; //https://www.npmjs.com/package/aws-sdk
import { v4 as uuidv4 } from "uuid";

import awsConfig from "../config/aws";

export default class AmazonService {
  public async sendImg(fileName: string, file: any): Promise<any> {
    const s3 = new AWS.S3({
      credentials: {
        accessKeyId: awsConfig.AWS_ID,
        secretAccessKey: awsConfig.AWS_SECRET,
      },
    });

    const myFile = fileName.split(".");
    const fileType = myFile[myFile.length - 1];

    const params = {
      Bucket: awsConfig.AWS_BUCKET_NAME,
      Key: `${uuidv4()}.${fileType}`,
      Body: file.buffer,
    };

    const fileData = await s3.upload(params).promise();

    return fileData;
  }
}
