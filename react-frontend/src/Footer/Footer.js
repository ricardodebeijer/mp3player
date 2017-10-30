import React, {Component} from 'react';
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="col-xs-12">
                    <p>Copyright © 2017
                        {/*<iframe src="https://ghbtns.com/github-btn.html?user=binq1000&type=follow" frameBorder="0"*/}
                                {/*scrolling="0" width="130px" height="20px"/>*/}
                        {/*<iframe src="https://ghbtns.com/github-btn.html?user=ricardodebeijer&type=follow"*/}
                                {/*frameBorder="0"*/}
                                {/*scrolling="0" width="165px" height="20px"/>*/}
                        {/*<iframe*/}
                            {/*src="https://ghbtns.com/github-btn.html?user=ricardodebeijer&repo=mp3player&type=watch&count=true&v=2"*/}
                            {/*frameBorder="0" scrolling="0" width="170px" height="20px"/>*/}
                    </p>
                </div>
            </div>
        );
    }
}

export default Footer;
