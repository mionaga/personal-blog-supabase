import { Category } from '@/types/category';

type SelectedCategoryProps = {
    category: Category;
};

const SelectedCategory = ({ category }: SelectedCategoryProps) => {
    return (
        <div>{category.name}</div>
    );
};

export default SelectedCategory;
