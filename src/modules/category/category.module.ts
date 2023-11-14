import { Global, Module } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { DatabaseService } from 'src/common/services/database.service';
import { CategoryController } from './category.controller';
@Global()
@Module({
    imports: [],
    providers: [CategoryService, DatabaseService],
    controllers: [CategoryController],
})
export class CategoryModule {}
