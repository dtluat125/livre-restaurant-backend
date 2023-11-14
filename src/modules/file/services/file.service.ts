import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { RegisterFileDto } from '../dto/request/register-file.dto';
import { File } from '../entity/file.entity';
import ConfigKey from 'src/common/config/config-key';
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';
import { PRESIGNED_URL_EXPIRED_IN } from '../file.constants';
import { makeFileUrl } from 'src/common/helpers/common.function';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class FileService {
    constructor(
        private readonly dbManager: EntityManager,
        private readonly configService: ConfigService,
    ) {}

    async createFile(file: RegisterFileDto): Promise<RegisterFileDto> {
        try {
            const newFile = {
                ...file,
                url: makeFileUrl(file.fileName),
            };
            const saveFile = await this.dbManager.save(File, newFile);
            return saveFile;
        } catch (error) {
            throw error;
        }
    }

    async getFileById(id: number): Promise<RegisterFileDto> {
        try {
            const file = await this.dbManager.findOne(File, {
                where: { id },
            });
            return {
                ...file,
                url: makeFileUrl(file.fileName),
            };
        } catch (error) {
            throw error;
        }
    }

    private S3Instance = new AWS.S3({
        accessKeyId: this.configService.get(ConfigKey.AWS_ACCESS_KEY_ID),
        secretAccessKey: this.configService.get(
            ConfigKey.AWS_SECRET_ACCESS_KEY,
        ),
        region: this.configService.get(ConfigKey.AWS_REGION),
        signatureVersion: 'v4',
    });
    private readonly bucketName = this.configService.get(
        ConfigKey.AWS_S3_BUCKET,
    );

    async getS3PresignedUrl(path: string, originalName: string) {
        try {
            const fileName = path
                ? `${path}/${uuidv4()}_${originalName}`
                : `${uuidv4()}_${originalName}`;
            const presignedUrl = this.S3Instance.getSignedUrl('putObject', {
                Bucket: this.bucketName,
                Key: fileName,
                Expires: PRESIGNED_URL_EXPIRED_IN,
                ACL: 'public-read',
            });
            return {
                path,
                originalName,
                fileName,
                presignedUrl,
            };
        } catch (error) {
            throw error;
        }
    }
}
