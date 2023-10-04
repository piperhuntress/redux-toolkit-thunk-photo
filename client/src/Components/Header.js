import { Link } from "react-router-dom";
import {FaSignInAlt, FaSignOutAlt,FaUser} from'react-icons/fa'

const Header = () => {
    return ( <div className="header">
             <h1>PHOTO GALLERY</h1>
      <p>Photo gallery-redux toolkit and thunk</p>

        <ul>
            <li><Link to="/login"><FaSignInAlt/>Login</Link></li>
            <li><Link to="/register"><FaUser/>Register</Link></li>
        </ul>
    </div> );
}
 
export default Header;