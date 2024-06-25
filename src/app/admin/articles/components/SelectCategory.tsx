'use client'

import { getCategories } from '@/app/getters';
import ErrorMessage from '@/app/components/ErrorMessage';
import React, { useState } from 'react'
import { useEffect } from 'react';
import Select, { InputActionMeta, MultiValue } from 'react-select';
import { Category } from '@/types/category';

type SelectCategoryProps = {
    selectedCategories: { id: number, name: string }[];
    setSelectedCategories: (categories: { id:number, name: string }[]) => void;
    errors: { [key: string]: string };
  }
  

const SelectCategory = ({
    selectedCategories,
    setSelectedCategories,
    errors,
 }: SelectCategoryProps) => {

  const [categories, setCategories] = useState<Category[]>([]);
  const [filterInput, setFilterInput] = useState("");

  useEffect(() => {
      const fetchCategories = async () => {
        const categories = await getCategories();
        setCategories(categories);
      };
      fetchCategories();
    }, []);

  const categoryOptions = categories.map(category => ({
        value: category.id,
        label: category.name
      }));

  const handleChange = (selectedOptions: MultiValue<
    {value: number,
     label: string
    }>
  ) => {
    if (selectedOptions) {
      const transformedOptions = selectedOptions.map(option => ({
        id: option.value,
        name: option.label,
      }));
      setSelectedCategories(transformedOptions);
    }
  }

  return (
    <>
     <label htmlFor="category">カテゴリー選択</label>
    <Select 
        name="categories" 
        id="category"
        instanceId="search-select-box"
        options={categoryOptions}
        placeholder='選択してください'
        isMulti
        value={selectedCategories.map(category => ({
           value: category.id,
           label: category.name
            }))}
        onChange={(selectedOptions) => (selectedOptions ? handleChange([...selectedOptions]) : null)}
        onInputChange={(inputValue: string, actionMeta: InputActionMeta) => {
          const { action, prevInputValue } = actionMeta;
          if (action === "set-value") {
            setFilterInput(prevInputValue);
          } else {
            setFilterInput(inputValue);
          }
        }}
    />
    {errors.categories && <ErrorMessage message={errors.categories} />}
    </>
  )
}

export default SelectCategory