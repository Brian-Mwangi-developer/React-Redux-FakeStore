import React, { useEffect } from "react";
import axios from "axios";
import { selectedProduct,removeSelectedProduct } from "../redux/actions/ProductAction";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const ProductDetails = () => {
    const product = useSelector((state) => state.product);
    const { image, title, price, category, description } = product;
    const { productId } = useParams();
    const dispatch = useDispatch();
    console.log(product);
    const fetchProductDetail = async () => {
        const response = await axios
            .get(`https://fakestoreapi.com/products/${productId}`)
            .catch((err) => {
                console.log("error", err);
            });

        dispatch(selectedProduct(response.data));
    };
    useEffect(() => {
        if (productId && productId !== "") fetchProductDetail();
        return () =>{
            dispatch(removeSelectedProduct());
        }
    }, [productId])
    return (
        <div className="ui container zoomed-in" style={{ marginTop: "70px" }}>
            {Object.keys(product).length === 0 ? (
                <div>Loading...</div>
            ) : (
                <div className="ui stackable grid">
                    <div className="four wide column">
                        <img className="ui fluid image" src={image} alt={title} />
                    </div>
                    <div className="nine wide column">
                        <h1>{title}</h1>
                        <h2>
                            <span className="ui teal tag label" >$ {price}</span>
                        </h2>
                        <h3 className="ui brown block header">{category}</h3>
                        <p>{description}</p>
                        <div
                            className="ui vertical animated button"
                            tabIndex="0"
                        >
                            <div className="hidden content">
                                <i className="shop icon"></i>
                            </div>
                            <div className="visible content">Add to Cart</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};