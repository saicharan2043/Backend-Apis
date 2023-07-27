

import { Component } from "react";

import {BallTriangle} from 'react-loader-spinner'

import "./index.css"

import AllProducts from "../AllProducts"

import Navbar  from "../Navbar"


const positionOfDisplay = {
    success: 'SUCCESS',
    loading: 'LOADING',
  }

class Home extends Component{
    state={productsList : [] , statusOfDisplay: positionOfDisplay.loading,}

    componentDidMount(){
        this.getData()
    }

    getData = async() =>{
        this.setState({statusOfDisplay: positionOfDisplay.loading})
        const response = await fetch("/products")
        const data = await response.json()
        this.setState({productsList : data , statusOfDisplay: positionOfDisplay.success})
        
    }

    Loader =() =>(
        <div className="loader-container">
      <BallTriangle type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </div>
        
    )

    render(){
        const {productsList , statusOfDisplay} = this.state
        return(
            <>
            <Navbar/>
            {statusOfDisplay === "LOADING" ? (
                this.Loader()
            ) : (
                <div className="bg-color">
                    <ul className='un-products-list'>
                        {productsList.map((echValue) =>(
                            <AllProducts item={echValue} key={echValue.id}/>
                        ))}
                    </ul>
                </div>
            )}
            
            </>
        )
    }
}


export default Home