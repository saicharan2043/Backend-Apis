

import { Component } from "react";

import {BallTriangle} from 'react-loader-spinner'

import Navbar from "../Navbar";

import "./index.css"
import AllProducts from "../AllProducts";

const positionOfDisplay = {
    success: 'SUCCESS',
    loading: 'LOADING',
  }

class Product extends Component{
    state = {productDetails : {} , similarProductDetails : [] , statusOfDisplay: positionOfDisplay.loading,}


    componentDidMount(){
        this.getProductData()
    }

    getProductData = async()=>{
        this.setState({statusOfDisplay: positionOfDisplay.loading})
        const {match} = this.props
        const {params} = match
        const {Id} = params
        console.log(Id)
        const productResponse = await fetch(`/product/${Id}`)
        const productData = await productResponse.json()
        const similarProductsResponse = await fetch(`/similarproducts?category=${productData[0].category}&name=${productData[0].title}`)
        const similarProductsData = await similarProductsResponse.json()
        this.setState({productDetails : {...productData[0]} , similarProductDetails : [...similarProductsData] , statusOfDisplay: positionOfDisplay.success})
        
    }

    Loader =() =>(
        <div className="loader-container">
        <BallTriangle type="ThreeDots" color="#4f46e5" height="50" width="50" />
        </div>
        
    )

    render(){
        
        const {productDetails , similarProductDetails , statusOfDisplay} = this.state
        const {title , description, price , image} = productDetails
        return(
            <> 
                <Navbar/>
                {statusOfDisplay === "LOADING" ? (
                    this.Loader()
                ) :(
                    <div className="bg-container-product">
                        <div className="item-container">
                            <div className="img-container">
                                <img src={image} className="img-product"/>
                            </div>
                            <div className="product-detail-container">
                                <h1 className="title-product">{title}</h1>
                                <hr className="hr"/>
                                <p className="price-product">₹{price}</p>
                                <p className="description-product">{description}</p>
                                <div className="quantity-container">
                                    <p className="quantity-text">Quantity</p>
                                    <p className="quantity-text">1</p>
                                </div>
                                <button className="add-cart-btn">ADD TO CART</button>
                            </div>
                        </div>

                        <h1 className="similar-product-text">similar products</h1>
                        <ul className="un-similar-list">
                            {similarProductDetails.map((echValue) =>(
                                <AllProducts item={echValue} key={echValue.id} />
                            ))}
                        </ul>
                    </div>
                )}
                
            </>
        )
    }
}

export default Product