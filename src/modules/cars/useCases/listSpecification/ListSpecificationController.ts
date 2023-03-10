import { Request, Response } from "express";

import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

class ListSpecificationController {
  constructor(private listSpecificationsUseCase: ListSpecificationUseCase) {}

  handle(request: Request, response: Response) {
    const specifications = this.listSpecificationsUseCase.execute();

    return response.json(specifications);
  }
}

export { ListSpecificationController };
