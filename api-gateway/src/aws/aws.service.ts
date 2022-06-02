import { Injectable, Logger } from '@nestjs/common';
import * as aws from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsService {
  private logger = new Logger(AwsService.name);

  constructor(private configService: ConfigService) {}

  public async uploadArquivo(file: any, _id: string) {
    const AWS_S3_BUCKET_NAME =
      this.configService.get<string>('AWS_S3_BUCKET_NAME');
    const AWS_REGION = this.configService.get<string>('AWS_REGION');
    const AWS_ACCESS_KEY_ID =
      this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const AWS_SECRET_ACCESS_KEY = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );

    const s3 = new aws.S3({
      region: AWS_REGION,
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    });

    const extension = file.originalname.split('.')[1];

    const urlKey = `${_id}.${extension}`;
    this.logger.log(urlKey);

    const params = {
      Body: file.buffer,
      Bucket: AWS_S3_BUCKET_NAME,
      Key: urlKey,
    };

    try {
      const data = await s3.putObject(params).promise();
      this.logger.log(`data: ${JSON.stringify(data)}`);
      return `https://coppi-bucket.s3.sa-east-1.amazonaws.com/${urlKey}`;
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }
}
