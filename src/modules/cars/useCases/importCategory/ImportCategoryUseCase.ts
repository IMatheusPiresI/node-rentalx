import csvParse from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../repository/categories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}
class ImportCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}
  loadFileCategory(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = csvParse.parse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;

          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);

          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadFileCategory(file);

    console.log(categories);

    categories.forEach((category) => {
      const { name, description } = category;

      const existsCategory = this.categoryRepository.findByName(name);

      if (!existsCategory) {
        this.categoryRepository.create({
          description,
          name,
        });
      }
    });
  }
}

export { ImportCategoryUseCase };
