import { Product } from '.';

export interface ProductAddedImage extends Product {
  image: {};
}
export type ProductEdit = Omit<ProductAddedImage, 'createdAt' | 'updatedAt' | 'imageUrl'>;

export const initState: ProductEdit = {
  name: '',
  description: '',
  price: 0,
  id: 0,
  image: {
    url: '',
    file: null,
  },
  productCategory: {
    id: 0,
    name: '',
    createdAt: '',
    updatedAt: '',
  },
};

export interface ProductStateType {
  name: string;
  description: string;
  price: number;
  productId?: string;
  workspaceId: string | undefined;
  productCategoryId: string;
}

export interface ProductActionType {
  type: string;
  payload: any;
}
