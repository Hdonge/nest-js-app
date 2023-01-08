interface IProductItemInCreateCartDto{
    id: number,
    quantity: number
}

export interface ICreateCartDto{
    products: IProductItemInCreateCartDto[],
    total: number,
    discountedTotal: number,
    userId: number,
    totalProducts: number,
    totalQuantity: number
}
