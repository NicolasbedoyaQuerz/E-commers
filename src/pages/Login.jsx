import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()
    const { register, handleSubmit} = useForm()
   

    const submit = data => {
        console.log(data)
        axios
            .post('https://e-commerce-api-v2.academlo.tech/api/v1/users/login', data)
            .then( resp => {
                console.log(resp.data)
                localStorage.setItem('token', resp.data.token)
                navigate('/')
            })
            .catch(error => {if(error.response?.status === 401){
                alert('Credenciales incorrectas')
            }else{
                console.log(error.response?.data);
            }
        })
    }

    const token = localStorage.getItem('token')


    const logout =() => {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <>
         {
            token 
            ? 
            <div style={{maxWidth: 500, margin: '1rem auto', border: '1px solid grey', padding: '1rem', textAlign: 'center'}}>
                <h3> Quieres Cerrar Sesion ?</h3>
            <Button onClick={logout}>Cerrar Sesion</Button>
            </div>
            :
        <Form 
            style={{ maxWidth: 500, margin: '1rem auto', border: '1px solid grey', padding: '1rem'}}
            onSubmit={handleSubmit(submit)}
            >
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                type="email" 
                placeholder="Enter email" 
                {...register('email')}
                />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Password" 
                {...register('password')}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Iniciar Sesion
            </Button>
        </Form>
         } 

           
        
             
        </>
    );
};

export default Login;