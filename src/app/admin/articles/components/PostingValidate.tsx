export const articleValidate = (
    title: string,
    selectedCategories: {id: number, name: string}[],
    content: string
) => {
    const newErrors: { [key: string]: string } = {};

    if (title.trim() === '') newErrors.title = 'タイトルが空欄です。';
    if (selectedCategories.length === 0) newErrors.categories = 'カテゴリーが選択されていません。';
    if (content.trim() === '') newErrors.content = '本文が空欄です。';

    return newErrors;
}

export const categoryValidate = (
    name: string,
) => {
    const newErrors: { [key: string]: string } = {};

    if (name.trim() === '') newErrors.name = 'カテゴリー名を入力してください。';

    return newErrors;
}