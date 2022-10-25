import AWS from 'aws-sdk';
import * as MultipartParser from 'parse-multipart';

export default class AwsUtil {
    protected s3: AWS.S3;

    constructor() {
        this.s3 = new AWS.S3({
            region: 'us-east-1',
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_KEY,
        });
    }

    public async fileUpload(dealershipStoreId, vehicleId, fileData, fileName): Promise<string> {
        try {
            // const fileData = this.extractFile(contentType, file);
            const s3Key = [dealershipStoreId, vehicleId, fileName].join('/');

            return this.s3
                .putObject({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: s3Key,
                    Body: fileData
                })
                .promise()
                .then(
                    () => s3Key,
                    err => err
                );
        } catch(e) {
            console.error(e);
            throw 'error';
        }
    }

    protected extractFile(contentType, file) {
        const boundary = MultipartParser.getBoundary(contentType);
        const parts = MultipartParser.Parse(Buffer.from(file), boundary);

        const [{ filename:name, data }] = parts;

        return { name, data };
    }
}
