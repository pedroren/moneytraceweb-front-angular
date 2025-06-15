//public record CategoryDto(int Id, string Name, CategoryType Type, bool IsEnabled, List<SubCategoryDto> SubCategories, int UserId);
//public record SubCategoryDto(int Id, string Name, bool IsEnabled);
export type CategoryModel = {
  id: number;
  name: string;
  type: CategoryType;
  isEnabled: boolean;
  subCategories: SubCategoryModel[];
};
export type SubCategoryModel = {
  id: number;
  name: string;
  isEnabled: boolean;
};
export enum CategoryType {
  Income = 'Income',
  Expense = 'Expense'
}