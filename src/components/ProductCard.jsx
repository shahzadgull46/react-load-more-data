

const ProductCard = ({product})=>{
    return(
        <div className="border border-gray-300 rounded-lg p-4 flex flex-col items-center">
     <img src={product.thumbnail} alt={product.title} className="w-40 h-40 object-contain" />
     <h2>{product.title}</h2>
     <p>$ {product.price}</p>
        </div>
    )
}
export default ProductCard;