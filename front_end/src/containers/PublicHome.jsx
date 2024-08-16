import {
    Button,
    Row, Col
} from 'react-bootstrap';

import buddy from '../icons/buddy.png';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div id='home'>

            <div className='top'>
                <p className='welcome text-center'>Welcome to UniBuds, the only free platform to connect with students at your university</p>

                <div className='text-center'>
                    <img src={buddy} alt="" className='findABuddyIcon' />
                </div>
                
                <p className='text-center'>No Download Necessary</p><hr /> 
                <p className='text-center'>No Dating! Just Friends</p> <hr /> 
                <p className='text-center'>Yup! It's completely Free</p> 
            </div>

            <div className='bottom'>
                <Row>
                    <Col>
                        <Link to='/register'>
                            <div className='d-grid gap-2'>
                                <Button variant='primary' type='button' > Register </Button>
                            </div>
                        </Link>
                    </Col>
                    <Col>
                        <Link to='/login'>
                            <div className='d-grid gap-2'>
                                <Button variant='success' type='button' > Login </Button>
                            </div>
                        </Link>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Home;