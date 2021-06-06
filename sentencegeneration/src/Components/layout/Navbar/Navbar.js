import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = (props) => {

    return (
        <nav className="c-navbar bg-primary">
            <h1>
                <i className={props.icon} />
                {props.title}
            </h1>
            <ul>
                <li><b>
                    <Link to='/'>About</Link>
                </b></li>
                <li><b>
                    <Link to='/home'>Home</Link>
                </b></li>
                
            </ul>
        </nav>
    )
}

// setting up the default props
Navbar.defaultProps = {
  title: "Make Sentence",
  icon: "fab fa-leanpub"
}

// setting up the type and restriction for default props
Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default Navbar;