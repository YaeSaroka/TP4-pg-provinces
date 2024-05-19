//capa intermedia 
import CategoryRepository from '../repositories/category-repository.js';

export default class CategoryService{

    getCategoryAllAsync = async () =>{
        const repo = new CategoryRepository();
        const returnArray = await repo.getCategoryAllAsync();
        return returnArray;
    }
    
    getCategoryByIdAsync = async (id) =>{
        const repo = new CategoryRepository();
        const returnArray = await repo.getCategoryByIdAsync(id);
        return returnArray;
    }

    createCategoryAsync = async (categoria_nueva) =>{
        const repo = new CategoryRepository();
        const returnArray = await repo.createCategoryAsync(categoria_nueva);
        return returnArray;
    }

    updateCategoryAsync = async(actualized_category) =>{
        const repo = new CategoryRepository();
        const returnArray = await repo.updateCategoryAsync(actualized_category);
        return returnArray;
    }

    deleteCategoryAsync = async(deletedCategory) =>{
        const repo = new CategoryRepository();
        const returnArray = await repo.deleteCategoryAsync(deletedCategory);
        return returnArray;
    }
    
}