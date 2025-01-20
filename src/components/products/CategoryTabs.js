//Product category toggle button

import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import React, { useState } from 'react';

const CategoryTabs = () => {
	const [selectedCategory, setSelectedCategory] = useState('all');

	const handleCategoryChange = (event, newCategory) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
  };

	return (
		<ToggleButtonGroup value={selectedCategory} exclusive onChange={handleCategoryChange} aria-label="product categories">
      <ToggleButton value="All" aria-label="all products">All</ToggleButton>
      <ToggleButton value="Apparel" aria-label="clothing">Apparel</ToggleButton>
      <ToggleButton value="electronics" aria-label="electronics">Electronics</ToggleButton>
      <ToggleButton value="personalcare" aria-label="accessories">Personal Care</ToggleButton>
    </ToggleButtonGroup>
	);
};

export default CategoryTabs;
