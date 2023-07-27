import {withRouter} from "react-router-dom"

import "./index.css"

const AllProducts = (props) =>{

    const {item} = props
    const {id ,title , price , image} = item

    const clickItem = () =>{
        const {history} = props
        history.replace(`/product/${id}`)
        
    }

    return(
        
            <li className="list" onClick={clickItem}>
                <img src={image} className="img"/>
                <h1 className="title">{title}</h1>
                <p className="actual-price">₹{price+70}</p>
                <p className="discount-price">₹{price}</p>
            </li>
        
    )
    }
export default withRouter(AllProducts)