import {Link} from "react-router-dom"

import "./index.css"           

const Navbar = () =>(
    <nav className='nav-bar'>
        <Link  to="/">
        <img src='https://marketplace.canva.com/EAE2-UabFFY/1/0/1600w/canva-a-letter-tech-logo-A6Vdrh0dthw.jpg' className='logo'/>
        </Link>
        <ul className='nav-ul'>
        <Link to="/" className="link">
        <li className='list-items'>Home</li>
        </Link>
        <li className='list-items'>Contact</li>
        <li className='list-items'>AboutUS</li>
        </ul>
        <button className='logout-btn'>LogOut</button>
    </nav>
)

export default Navbar