import { CategoriesRepository } from "../../repository/categories/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const categoriesRepository = CategoriesRepository.getInstance();

const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

const createCategorieController = new CreateCategoryController(
  createCategoryUseCase
);

export { createCategorieController };
