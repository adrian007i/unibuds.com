import {
    Button, Form,
    FormControl as Input,
    FormLabel as Label,
    Row, Col
} from 'react-bootstrap';

import { Link } from "react-router-dom";

function Register() {
    return (
        <>
            <Form>
                <Row>
                    <Col>
                        <Label>First Name</Label>
                        <Input type="text" />
                    </Col>
                    <Col>
                        <Label>Last Name</Label>
                        <Input type="text" />
                    </Col>
                </Row>

                <Label>Email</Label>
                <Input type="text" />

                <Label>Password</Label>
                <Input type="text" />

                <br />
                <Button variant="primary" type="submit" >
                    Register
                </Button>
            </Form>
            <br/>
            <p>Already Registered? <Link to="/login"> Login</Link></p>
        </>
    );
}

export default Register;