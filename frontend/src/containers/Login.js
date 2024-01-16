import {
    Button, Form,
    FormControl as Input,
    FormLabel as Label
} from 'react-bootstrap';

import { Link} from "react-router-dom";
function Login() {
    return (
        <>
            <Form>
                <Label>Email</Label>
                <Input type="text" />

                <Label>Password</Label>
                <Input type="text" />
                <br />
                <Button variant="primary" type="submit" >
                    Login
                </Button>
            </Form>
            <br/>
            <p>Don&#39;t have an account? <Link to="/register"> Sign up</Link></p>
            
        </>
    );
}

export default Login;