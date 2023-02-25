import { Request, Response } from "express";

import { ListCategoryUseCase } from "./ListCategoryUseCase";

class ListCategoryController {
  constructor(private categoryUseCase: ListCategoryUseCase) {}

  handle(request: Request, response: Response) {
    const allCategories = this.categoryUseCase.execute();

    return response.status(200).json({ categories: allCategories });
  }
}

export { ListCategoryController };
