import { Box, Button, FormControl, FormHelperText, FormLabel, HStack, Input, Text, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate, Link, Navigate } from 'react-router-dom'


const Login = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')    
    const navigate = useNavigate()

    const handlerLogin = (e: any) => {
        e.preventDefault()    
        navigate('/flow')    
    }

    return (
        <FormControl display='flex' flexDirection='column' w='20%' justifyContent='center' mx='auto' color='white' >
            
            <Text textAlign='center' fontSize='32px' mb='20px'>Вход</Text>
                   
            <form onSubmit={handlerLogin}  >
                <FormLabel>Логин</FormLabel>
                <Input type='text' name="login" value={login} onChange={e => setLogin(e.target.value)} placeholder="Введите свой логин..."/>
                <FormHelperText>Введите свой логин</FormHelperText>  

                <FormLabel mt='10px'>Пароль</FormLabel>
                <Input type='password' name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Введите свой пароль..."/>
                <FormHelperText>Введите свой пароль</FormHelperText>

                <Button bg='green' mt='20px' type="submit" w='full'>Войти</Button>

                <HStack color='black' mt='10px' justifyContent='center'>
                    <Text>Нет аккаунта?</Text>
                    <Link to='/signup'>Зарегистрироваться</Link>
                </HStack>
            </form>
            
        </FormControl>
    )
}

export default Login