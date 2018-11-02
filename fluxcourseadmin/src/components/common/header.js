var React = require('react')

module.exports = class Header extends React.Component{
    render(){
        return(
            <nav>
                <div className="container-fluid">
                    <a href="/" className="navbar-brand">
                        <img src="images/mylogo.png"/>
                    </a>
                    <ul className="nav">
                        <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="/#about">About</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}