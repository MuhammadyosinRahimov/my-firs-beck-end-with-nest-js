import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto } from './dtoproduct/createProduct.dto';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Гирифтани ҳамаи маҳсулот
  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  // Гирифтани маҳсулот бо ID
  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return product;
  }

  // Сохтани маҳсулот
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  // Навсозии маҳсулот
  async updateProductDetails(
    id: string,
    updateProductDto: CreateProductDto,
  ): Promise<Product> {
    const product = await this.getProductById(id);

    // Навсозии маълумотҳо
    Object.assign(product, updateProductDto);

    return await this.productRepository.save(product);
  }

  // Нест кардани маҳсулот
  async deleteProduct(id: string): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
  }
}
