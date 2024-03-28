import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '@hooks/useProducts';
import { useRecoilValue } from 'recoil';
import { productsAtom } from '@recoils/atoms';
import useCustomNavigate from '@hooks/useCustomNavigate';

function AdminProduct() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchProducts, addCategories, deleteProducts } = useProducts(workspaceId);
  const products = useRecoilValue(productsAtom);
  const { appendPath } = useCustomNavigate();
  const [input, setInput] = useState<string>('');
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteChoosenProducts = () => {
    deleteProducts(selectedProductIds);
  };

  const handleCheckboxChange = (checkedProductId: number) => {
    const isSelected = selectedProductIds.includes(checkedProductId);
    let updatedProducts = [];

    if (isSelected) {
      updatedProducts = selectedProductIds.filter((id) => id !== checkedProductId);
    } else {
      updatedProducts = [...selectedProductIds, checkedProductId];
    }

    setSelectedProductIds(updatedProducts);
  };

  const addCategoriesHandler = (categorieInput: string) => {
    if (!categorieInput) {
      alert('카테고리를 입력해주세요');
      return;
    }
    setInput('');
    addCategories(categorieInput);
  };

  return (
    <>
      <div>상품 조회</div>
      <input
        type={'text'}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button
        onClick={() => {
          addCategoriesHandler(input);
        }}
      >
        카테고리 추가
      </button>

      <div>
        {products.map((product) => (
          <div key={product.id}>
            <input type={'checkbox'} onChange={() => handleCheckboxChange(product.id)} />
            <div>{product.id}번 상품</div>
            <div>{product.name}</div>
            <div>{product.description}</div>
            <div>{product.price.toLocaleString()}원</div>
            <button type={'button'} onClick={() => appendPath(`/edit-product?productId=${product.id}`)}>
              {product.name} 상품 편집
            </button>
            <img src={product.imageUrl} style={{ width: '300px', height: '300px' }} />
          </div>
        ))}
      </div>
      <button type={'button'} onClick={() => appendPath('/add-product')}>
        상품 추가
      </button>
      <button type={'button'} onClick={deleteChoosenProducts}>
        선택된 상품 삭제
      </button>
    </>
  );
}

export default AdminProduct;
