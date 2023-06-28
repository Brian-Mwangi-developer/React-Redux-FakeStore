import React,{useEffect} from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {setProducts} from "../redux/actions/ProductAction";
import { ProductComponent } from "./ProductComponent";

 export const ProductListing =()=>{
    const products = useSelector((state)=>state);
    const dispatch = useDispatch();
    const fetchProducts = async () =>{
        console.log("Fetching products...");
        const response = await axios.get("https://fakestoreapi.com/products").catch((err) =>{
           console.log("Err",err);
        });
        dispatch(setProducts(response.data));
    }
    useEffect(()=>{
        fetchProducts();
    }, []);
    console.log("Products: ",products)
    return (
        <div className="ui grid container" style={{marginTop:"25px"}}>
            <ProductComponent/>
        </div>
    );
 };