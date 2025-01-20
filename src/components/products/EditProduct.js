// UpdateProduct.jsx
import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';


const token=localStorage.getItem('x-auth-token');
console.log("edit-tok"+token);
//const token='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBkZW1vLmNvbSIsImlhdCI6MTcyODYzOTQ4NywiZXhwIjoxNzI4NjQ3ODg3fQ.bBSTJZaVBZCprVifjH93-yKaVmJ46y3z1f1rRokCpasHQnMxK3MjhzbuN1FN7BncvVeGZGI_KSheiQeazz5doA';
const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        id: '',
        name: '',
        category: '',
        price: '',
        description: '',
        manufacturer: '',
        availableItems: '',
        imageUrl: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${id}`, {
                    headers: {
                        'x-auth-token': token, // Replace with your actual token logic
                    }
                });

                if (!response.ok) {
                    throw new Error('Error fetching product');
                }

                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token, // Replace with your actual token logic
                },
                body: JSON.stringify(product)
            });

            if (!response.ok) {
                throw new Error('Error updating product');
            }

            const data = await response.json();
            setProduct(data);
            console.log('Product updated:', data);
            alert('Product updated successfully!');
            navigate('/Products');
            // Optionally redirect or reset form after successful update
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Update Product</h1>
            <input 
                type="text" 
                name="name" 
                value={product.name} 
                onChange={handleChange} 
                placeholder="Product Name" 
                required 
            />
            <input 
                type="text" 
                name="category" 
                value={product.category} 
                onChange={handleChange} 
                placeholder="Category" 
                required 
            />
            <input 
                type="number" 
                name="price" 
                value={product.price} 
                onChange={handleChange} 
                placeholder="Price" 
                required 
            />
            <textarea 
                name="description" 
                value={product.description} 
                onChange={handleChange} 
                placeholder="Description" 
                required 
            />
            <input 
                type="text" 
                name="manufacturer" 
                value={product.manufacturer} 
                onChange={handleChange} 
                placeholder="Manufacturer" 
                required 
            />
            <input 
                type="number" 
                name="availableItems" 
                value={product.availableItems} 
                onChange={handleChange} 
                placeholder="Available Items" 
                required 
            />
             <input 
                type="text" 
                name="imageUrl" 
                value={product.imageUrl} 
                onChange={handleChange} 
                placeholder="Image Url" 
                required 
            />
            <button type="submit">Update Product</button>
        </form>
    );
};

export default EditProduct;

