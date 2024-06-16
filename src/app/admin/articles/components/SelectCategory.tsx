'use client'

import { getCategories } from '@/app/getters';
import ErrorMessage from '@/app/components/ErrorMessage';
import React from 'react'
import { useEffect } from 'react';
import ReactSelect from 'react-select';

type SelectCategoryrops = {
    categories: Category[];
    setCategories: ( categories: Category[] ) => void;
    selectedCategories: { id: number, name: string }[];
    setSelectedCategories: (categories: { id:number, name: string }[]) => void;
    errors: { [key: string]: string };
  }
  

const SelectCategory = ({
    categories, 
    setCategories,
    selectedCategories,
    setSelectedCategories,
    errors,
 }: SelectCategoryrops) => {

    const categoryOptions = categories.map(category => ({
        value: category.id,
        label: category.name
      }));

    useEffect(() => {
        const fetchCategories = async () => {
          const categoryElems = await getCategories();
          setCategories(categoryElems);
        };
        fetchCategories();
      }, []);


  const handleChange = (options) => {
    if (options) {
      const transformedOptions = options.map(option => ({
        id: option.value,
        name: option.label,
      }));
      setSelectedCategories(transformedOptions);
    }
  }

  return (
    <>
     <label htmlFor="category">カテゴリー選択</label>
    <ReactSelect 
        name="category" 
        id="category"
        instanceId="search-select-box"
        options={categoryOptions}
        placeholder='選択してください'
        isMulti
        value={selectedCategories.map(category => ({
           vallue: category.id,
           label: category.name
            }))}
        onChange={(options) => (options ? handleChange([...options]) : null)}
    />
    {errors.categories && <ErrorMessage message={errors.categories} />}
    </>
  )
}

export default SelectCategory