import {
    Button, Form,
    FormControl as Input,
    Row, Col
} from 'react-bootstrap';

import { Link } from "react-router-dom";

function Home() {
    return (
        <div id="home">

            <div className='top'>
                <p className='welcome'>Welcome to UniBuds, the only free platform to connect with students at your university</p>
                
                <hr/>
                <p>
                    
                    ✅ &nbsp; No Dating! Just Friends <br />
                    ✅ &nbsp; No Download <br />
                    ✅ &nbsp; Completely Free
                </p>
            </div>

            <div className='bottom'>
                <Row>
                    <Col>
                        <Link to="/register">
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="button" > Register </Button>
                            </div>
                        </Link>
                    </Col>
                    <Col>
                        <Link to="/login">
                            <div className="d-grid gap-2">
                                <Button variant="success" type="button" > Login </Button>
                            </div>
                        </Link>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Home;