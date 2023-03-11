import { IProductsBuy } from './IProductsBuy.model';

export interface IBuy {
    id: string;
    idType: string;
    clientName: string;
    products: IProductsBuy[];
}
