import { Category } from '@/types/category';

type SelectedCategoryProps = {
    category: Category
}

const SelectedCategoy = async ({ category }: SelecteCategoryProps) => {
    console.log(category);
    return (
        <div>{category.name}</div>
    )
}

export default SelectedCategoy