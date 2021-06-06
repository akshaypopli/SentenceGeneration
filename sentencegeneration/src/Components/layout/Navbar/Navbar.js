import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = (props) => {

    return (
        <nav className="navbar bg-primary">
            <h1>
                <i className={props.icon} />
                {props.title}
            </h1>
            <ul>
                <li>
                    <Link to='/'>About</Link>
                </li>
                <li>
                    <Link to='/home'>Home</Link>
                </li>
                
            </ul>
        </nav>
    )
}

Navbar.defaultProps = {
  title: "Make Sentence",
  icon: "fab fa-leanpub"
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default Navbar;