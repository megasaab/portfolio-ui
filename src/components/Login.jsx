import { useContext, useState } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { Context } from "..";
import { useNavigate } from "react-router";

const Login = () => {

    const { store } = useContext(Context);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSumbitLoginForm = async (event) => {
        event.preventDefault();
        const res = await store.login(email, password);
        if(res.status === 200) {
            alert(`Hello ${res.data.lastName}!`);
            navigate('/portfolio-list')
        }
    }

    return (
        <Container>
            <Row>
                <Col sm={8} md={6} lg={4}>
                    <h1 className="text-center">Login</h1>
                    <Form onSubmit={onSumbitLoginForm}>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <div className="text-center mb-3">
                            <Button variant="success" type="submit">
                                Login
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;