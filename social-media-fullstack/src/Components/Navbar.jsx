import { Link } from "react-router-dom";
import {auth} from "../config/config"
import {useAuthState} from "react-firebase-hooks/auth"
import  {signOut} from "firebase/auth"


const Navbar = ()=>{

    const signGoogleOut = ()=>{
        signOut(auth)
    }

    const [user] = useAuthState(auth)
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          
          <Link class="navbar-brand" to="/">
            Social Media
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <Link class="nav-link" to="/">
                  Home
                </Link>
              </li>
              {!user? <li class="nav-item">
                <Link class="nav-link" to="/login">
                  Login
                </Link>
              </li>:<li class="nav-item">
                <Link class="nav-link" to="/createpost">
                  Create Post
                </Link>
              </li>}
              
              
              {user && (
                <div class="right-float">
                  <Link class="navbar-brand " to="/">
                    <img
                      src={user?.photoURL}
                      alt="Logo"
                      width="30"
                      height="24"
                      class="d-inline-block align-text-top"
                    />
                    {user?.displayName}
                  </Link>
                  <button
                    onClick={signGoogleOut}
                    type="button"
                    class="btn btn-danger"
                  >
                    Logout
                  </button>
                </div>
              )}
            </ul>
          </div>
        </nav>
        
      </div>
    );
}

export default Navbar;