$ = jQuery = require('jquery')
var React = require('react')
var ReactDOM = require('react-dom')
const Home = require('./components/homePage')
const About = require('./components/about/aboutpage')
const Header = require('./components/common/header')

let App = class AppContainer extends React.Component{
    render(){
        let Child

        switch (this.props.route) {
            case 'about':
                Child = About
                break
        
            default:
                Child = Home
                break
        }

        return(
            <div>
                <Header />
                <Child />
            </div>
        )
    }
}

function renderApp(){
    let route = window.location.hash.substr(1)
    ReactDOM.render(<App route={route}/>,document.getElementById('app'))    
}

window.addEventListener('hashchange',renderApp)
renderApp()