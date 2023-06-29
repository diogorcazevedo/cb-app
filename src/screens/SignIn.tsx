import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from "native-base";
import { Controller, useForm } from 'react-hook-form';
import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useAuth } from '@hooks/useAuth';
import { AppError } from '@utils/AppError';
import React, { useState } from 'react';
import {Loading} from "@components/Loading";


type FormData = {
    email: string;
    password: string;
}

export function SignIn() {

    const [isLoading, setIsLoading] = useState(false)
    const { singIn } = useAuth();
    const toas = useToast();

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>()

    async function handleSignIn({ email, password }: FormData) {
        try {
            setIsLoading(true);
            await singIn(email, password);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title =  isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'
            toas.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
            setIsLoading(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            {isLoading ? <Loading /> :
            <VStack flex={1} px={10} pb={16}>
            <Image
                source={BackgroundImg}
                defaultSource={BackgroundImg}
                alt="Carla Buaiz Joias"
                resizeMode="contain"
                position="absolute"
            />
            <Center my={24}>
                <LogoSvg />

                <Text color="gray.100" fontSize="sm">
                    Para estar com você em todos os momentos
                </Text>
            </Center>

            <Center>
                <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
                    Acesse a conta
                </Heading>
                <Controller
                    control={control}
                    name="email"
                    rules={{ required: 'Informe o e-mail' }}
                    render={({ field: { onChange } }) => (
                        <Input
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={onChange}
                            errorMessage={errors.email?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    rules={{ required: 'Informe a senha' }}
                    render={({ field: { onChange } }) => (
                        <Input
                            placeholder="Senha"
                            secureTextEntry
                            onChangeText={onChange}
                            errorMessage={errors.password?.message}
                        />
                    )}
                />

                <Button title="Acessar" onPress={handleSubmit(handleSignIn)} />
            </Center>
        </VStack>
            }
        </ScrollView>
    );
}