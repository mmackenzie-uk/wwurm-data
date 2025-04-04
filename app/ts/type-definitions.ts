export type IProduct = {
    id: number;
    name: string;
    price: number;
    description?: string;
    smallImage?: string;
    mediumImage?: string;
    largeImage?: string;
    availability?: number;    
    slug: string;
    categoryId: number;
}

export type ITruncatedProduct = {
    id: number,
    name: string,
    smallImage?: string,
    price: number,
    slug: string
}

export type ICartItem = {
    id: number,
    name: string,
    smallImage?: string,
    price: number,
    slug: string
    qty: number;
}

export type ICategory = { 
    id: number;
    name: string;
    slug: string;  
  }    

export type ICallback = () => void;

export type ICart = Array<ICartItem>;

export interface IStore {
    cart: ICart;
    callbacks: Array<ICallback>;
    getInstance: () => IStore;
    triggerCallbacks: () => void;
    getCart: () => ICart;
    sync: () => void;
    find: (id: number) => ICartItem | undefined;
    add: (truncatedProduct: ITruncatedProduct) => void;
    increase: (id : number, qty: number) => void;
    reduce: (id : number) => void;
    remove: (id: number) => void;
    empty: () => void;
    getCount: () => number;
    registerCallback: (fn: () => void) => void;
}

export type IResponse = {
    id: number;
    name: string,
    price: number,
    description: string,
    smallImage: string,
    mediumImage: string,
    largeImage: string,
    availability: number, 
    slug: string,
    categoryId: number
}
