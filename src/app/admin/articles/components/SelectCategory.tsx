'use client'

import { getCategories } from '@/app/getters';
import ErrorMessage from '@/app/components/ErrorMessage';
import React from 'react'
import { useEffect } from 'react';
import ReactSelect from 'react-select';

type SelectCategoryrops = {
    categories: Category[];
    setCategories: ( categories: Category[] ) => void;
    setSelectedCategories: { id:number, name: string }[];
    errors: { [key: string]: string };
  }
  

const SelectCategory = ({
    categories, 
    setCategories,
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
      console.log(transformedOptions);
    }
  };

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
        onChange={(options) => (options ? handleChange([...options]) : null)}
    />
    {errors.categories && <ErrorMessage message={errors.categories} />}
    </>
  )
}

export default SelectCategory