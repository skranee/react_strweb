import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../context/context.js";
import './products.css';
import List from "./list.jsx";

function Products() {
    const {store} = useContext(Context)
    const [products, setProducts] = useState([])
    const [creationWindowOpened, setCreationWindowOpened] = useState(false);
    const [pName, setPName] = useState("");
    const [pDescription, setPDescription] = useState("");
    const [pImage, setPImage] = useState("");
    const [pPrice, setPPrice] = useState(0);
    const [pId, setPId] = useState("");

    useEffect(() => {
        const getProducts = async () => {
            const products = await store.getProducts();
            if(products) {
                setProducts(products);
            }
        }

        getProducts();
    }, [store])

    const handleDelete = async (product) => {
        await store.deleteProduct(store.user.id, product._id)
    }

    const handleEdit = async () => {
        const response = await store.editProduct(
            store.user.id,
            pId,
            pName,
            pDescription,
            pPrice,
            pImage
        )
        if(response) {
            setCreationWindowOpened(false);
        }
    }

    const handleCreate = async () => {
        const response = await store.createProduct(store.user.id, pName, pDescription, pPrice, pImage);
        if (response) {
            setCreationWindowOpened(false);
        }
    }

    const setId = (product) => {
        setPId(product._id)
        setCreationWindowOpened(true)
    }

    return (
        <div className='products'>
            {creationWindowOpened && (
                <div
                    className='backgroundModal'
                    onClick={() => setCreationWindowOpened(false)}
                >
                    <div className='modalCreate' onClick={(e) => e.stopPropagation()}>
                        <textarea
                            className='reviewInput'
                            value={pDescription}
                            maxLength={500}
                            onChange={(e) => setPDescription(e.target.value)}
                        />
                        <input
                            className='inputRate'
                            value={pName}
                            onChange={(e) => setPName(e.target.value)}
                            maxLength={20}
                            minLength={3}
                        />
                        <input
                            type='number'
                            max={5}
                            min={1}
                            className='inputRate'
                            value={pPrice}
                            onChange={(e) => setPPrice(parseInt(e.target.value))}
                        />
                        <input
                            type='file'
                            onChange={(e) => {
                                const filePath = e.target.value;
                                const fileName = filePath.match(/[^\\/]+$/)?.[0] || "";
                                setPImage(fileName);
                            }}
                        />
                        <button
                            className='create'
                            onClick={() => handleCreate()}
                        >
                            Create
                        </button>
                        <button
                            className='create'
                            onClick={() => handleEdit()}
                        >
                            Edit
                        </button>
                    </div>
                </div>
            )}
            {store.user.role === 'admin' && (
                <button className='createBtn' onClick={() => setCreationWindowOpened(true)}>
                    Create
                </button>
            )}
            <List data={products}/>
            {/*<ul className='products-list'>*/}
            {/*    {products.map((product, index) => (*/}
            {/*        <li key={`${product}-${index}`} className='productItem'>*/}
            {/*            <h3>{product.name}</h3>*/}
            {/*            <p>{product.description}</p>*/}
            {/*            <img*/}
            {/*                style={{width: 200, height: 200, objectFit: "cover", borderRadius: 10}}*/}
            {/*                src={product.image}*/}
            {/*                alt="product_image"*/}
            {/*            />*/}
            {/*            <p>{product.price} $</p>*/}
            {/*            {store.user.role === 'admin' && (*/}
            {/*                <>*/}
            {/*                    <button onClick={() => handleDelete(product)}>*/}
            {/*                        Delete*/}
            {/*                    </button>*/}
            {/*                    <button onClick={() => setId(product)}>*/}
            {/*                        Edit*/}
            {/*                    </button>*/}
            {/*                </>*/}
            {/*            )}*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
        </div>
    )
}

export default observer(Products);
