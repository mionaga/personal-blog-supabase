import { ArticleCategory } from '@/types/articleCategory';

type SelectedCategoryProps = {
    articleCategory: ArticleCategory;
};

const SelectedCategory = ({ articleCategory }: SelectedCategoryProps) => {
    return (
        <div>{articleCategory.category.name}</div>
    );
};

export default SelectedCategory;
