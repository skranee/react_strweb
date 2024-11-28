import {observer} from "mobx-react-lite";
import './products.css';

function List(data) {
    return (
        <ul className='products-list'>
            {data.map((product, index) => (
                <li key={`${product}-${index}`} className='productItem'>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <img
                        style={{width: 200, height: 200, objectFit: "cover", borderRadius: 10}}
                        src={product.image}
                        alt="product_image"
                    />
                    <p>{product.price} $</p>
                    {store.user.role === 'admin' && (
                        <>
                            <button onClick={() => handleDelete(product)}>
                                Delete
                            </button>
                            <button onClick={() => setId(product)}>
                                Edit
                            </button>
                        </>
                    )}
                </li>
            ))}
        </ul>
    )
}

export default observer(List);
