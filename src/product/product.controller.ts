import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';

import { CreateProductDto } from './dtoproduct/createProduct.dto';
import { Product } from './entity/product.entity';

@ApiTags('Product')
@Controller('api/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiResponse({ status: 200, description: 'List of all products' })
  @Get('/get')
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }

  @ApiResponse({ status: 200, description: 'Returns a product by ID' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Get('/:id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return await this.productService.getProductById(id);
  }

  @ApiResponse({ status: 200, description: 'Product details updated' })
  @Put('/:id')
  async updateProductDetails(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.updateProductDetails(id, updateProductDto);
  }

  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiBody({
    description: 'Product data',
    required: true,
    schema: {
      example: {
        name: 'Acetic Acid',
        description: 'A common reagent in organic synthesis',
        price: 10.5,
        quantity: 100,
        category: 'Acids',
        image: 'https://example.com/image.jpg',
        brand: 'ChemLab',
        safetyInfo: 'Handle with gloves',
      },
    },
  })
  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.createProduct(createProductDto);
  }

  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @Delete('/:id')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    await this.productService.deleteProduct(id);
  }
}
