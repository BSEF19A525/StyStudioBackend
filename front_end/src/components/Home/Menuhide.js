import React from 'react'
import { NavLink, Link } from "react-router-dom";


function Menuhide() {
  return (
              <div className="menubar1">
                    {/* <div className="widthofhide"> */}
                        <div id="iconhide" ><i className="fa fa-times"></i></div>
                        <div className="color">
                            <ul id="tohide">
                                <li><NavLink to="/">Home</NavLink></li>
                                <li><Link to="/about" > About</Link></li>
                                <li><Link to="/contact"> Contact</Link></li>
                                <li><NavLink to="/gallery">Gallery</NavLink></li>
                                <li><NavLink to="/login">Login</NavLink></li>
                                <li><NavLink to="/signup">Register</NavLink></li>
                            </ul>
                      </div>
                  {/* </div> */}
            </div>
  )
}

export default Menuhide