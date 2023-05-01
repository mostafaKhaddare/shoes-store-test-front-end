export const getDiscountedPricePercentage = (originalPrice , discountedPrice)=> {
    const discount = originalPrice = discountedPrice;

    const descountPercentage = (discount/originalPrice) * 100 ;

    return descountPercentage.toFixed(2)
}