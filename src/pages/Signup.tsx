import { Box, Button, FormControl, FormHelperText, FormLabel, HStack, Input, Text, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const Signup = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')   
    const [passwordSecond, setPasswordSecond] = useState('')   
    const navigate = useNavigate()

    const handelSubmit = (e: any) => {
        e.preventDefault()
        navigate('/login')
    }

    return (
        <FormControl display='flex' flexDirection='column' w='20%' justifyContent='center' mx='auto' color='white' >
            
            <Text textAlign='center' fontSize='32px' mb='20px'>Регистрация</Text>
                   
            <form onSubmit={handelSubmit}  >
                <FormLabel>Логин</FormLabel>
                <Input type='text' name="login" value={login} onChange={e => setLogin(e.target.value)} placeholder="введите свой логин..."/>
                <FormHelperText>Введите свой логин</FormHelperText>  

                <FormLabel mt='10px'>Пароль</FormLabel>
                <Input type='password' name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="введите свой пароль..."/>
                <FormHelperText>Введите свой пароль</FormHelperText>

                <FormLabel mt='10px'>Повторите пароль</FormLabel>
                <Input type='password' name="password" value={passwordSecond} onChange={e => setPasswordSecond(e.target.value)} placeholder="Повторите свой пароль..."/>
                <FormHelperText>Введите свой пароль ещё раз</FormHelperText>

                <Button bg='green' mt='20px' type="submit" w='full'>Зарегистрироваться</Button>
            </form>
            
        </FormControl>
    )
}

export default Signup