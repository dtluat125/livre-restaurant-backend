## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
[TypeOrm](https://typeorm.io/) Type Orm document.

# env config

copy .env.example to .env
update content info in .env

## Installation

```bash
yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
or
$ yarn dev

# production mode
$ yarn start:prod
```

## run migration build in

```
open bash (teminal)
create migration
yarn migration:create -- -n SeedingUser -d database/seedings

run migration
yarn migration:run -- -c default

revert migration
yarn migration:revert


```
## run seed build in

```
open bash (teminal)
running the app
yarn seed:run


```

## curd api

1. in modules folder create new module e.g product
2. make dir controller, dto, service folder and product.module.ts
3. in controller folder make product.controller.ts
   - make first action index
   -
   -
   -
   -
   -
   -
   -
   -
   -
   -
   -
   -
   -
   -
   -
   - ```bash
        import some decorator 
        @Controller('products') // router controller name products 
        @ApiHeader({ name: 'Language', enum: ['vi', 'en'] }) //header param for language
        @ApiTags('Product') <--- Api tag name
        export class ProductController { } <--- export class controller name
            @Get('index')
            @UseGuards(AuthGuard('jwt')) //this use decorator guard, with client must be authentication with token
            @ApiBearerAuth() //Bearer token 
            @UsePipes(new ValidationPipe({ transform: true })) validation tranform, e.g page=1 from url will string, via this decorator will be come number as 1
            @ApiOkResponse({ type: ProductIndexResult }) //Defined response model
            async index(@Request() req: IndexDto) {
                    const result = await this.productService.index(req); <--- service to process logic, to get data , with args: as page, limit, keyword

                    return ProductIndexResult.success(result);
            }
4. in dto : we can defined IndexDto class with request forlder, and response folder, each folder will contain dto defined with request from client or resonse from server to client
   1. request folder: make IndexDto class in file index.dto.ts
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    - ```bash
        export class IndexDto {
            @IsNumber({ message: 'Name must be string' }) <--- must be number
            @IsNotEmpry() //is required
            @ApiProperty({ example: 1 }) <--- swagger api property page
            readonly page: number;

            @IsNotEmpty()
            @ApiProperty()
            readonly limit: number;

            @IsNotEmpty()
            @ApiProperty({ type: String, required: true })
            @MinLength(6, { message: 'Minimun 6 characters' })
            readonly keyword: string;
        }
   2. reponse folder: make ProductIndexResult class in file index-reponse.dto.ts
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    - ```bash
      import { ApiProperty } from '@nestjs/swagger';
      import {Product} from '..product.entity';
      export class IIndexResult {
            @ApiProperty()
            items: Product[];
            @ApiProperty()
            totalItem: number;
            @ApiProperty()
            page: number;
            @ApiProperty()
            pages: number;
            @ApiProperty()
            perPage: number;
        }

        export class ProductIndexResult extends ApiResult<IIndexResult> {
            @ApiProperty({ type: IIndexResult })
            data: IIndexResult;

            public static success(data: IIndexResult) {
                const result = new ProductIndexResult();
                result.success(data);

                return result;
            }
        }
5. in services folder make product.service.ts
    - import statement
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    - ```bash
        @Injectable()
        export class ProductService {
            constructor(
                @InjectEntityManager(AppConfig.DB.WRITE)
                private readonly dbManager: EntityManager, <--- repository to communicate with database
                // orther service here
            ) { }
            public async findAll(query: any) {
                const { keyword, page, limit } = query;
                let offset = 0;
                if (page > 1) {
                    offset = page * limit + 1;
                }
                // return [Product[], total:number]
                const [items, totalItem] = this.dbManager.findAndCount(Product, {
                    where: {
                        name: Like(keyword)
                    },
                    take: limit,
                    skip: offset,
                    select: ['name', 'id', ....]
                });
                return { page, items, totalItem, perPage: limit, pages: Math.ceil(totalItem/limit) }
            }
        }
6. make content in product.module.ts
    - import statement
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    -
    - ```bash
        @Module({
            imports: [
                CommonModule,
                TypeOrmModule.forFeature([Product], AppConfig.DB.WRITE),
            ],
            controllers: [ProductController],
            providers: [ProductService]
        })
        export class ProductModule { }
7. open browser and run localhost:{port}/api
    we will see swagger api document generated and product tag with index action

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov

```
