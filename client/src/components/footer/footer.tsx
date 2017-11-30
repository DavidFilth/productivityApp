import * as React from 'react';
import './style.css';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="container text-center">
                    <p className="pull-left">
                        © 2017
                        <a href="http://sibatel.com/"> Sibatel Communications Inc. </a>
                        All Rights Reserved 
                    </p>
                </div>
            </footer>
        );
    }
}
export default Footer;