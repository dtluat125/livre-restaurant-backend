import { Global, Module } from '@nestjs/common';
import { FileService } from './services/file.service';
import { FileController } from './file.controller';
@Global()
@Module({
    imports: [],
    providers: [FileService],
    controllers: [FileController],
})
export class FileModule {}
