import {Heading, HStack, Text, VStack, Icon, Pressable} from 'native-base';
import { UserPhoto } from './UserPhoto';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@hooks/useAuth';
import defaultUserPhotoImg from '@assets/userPhotoDefault.png';
import { api } from '@services/api';
import {useNavigation} from "@react-navigation/native";
import {AppNavigatorRoutesProps} from "@routes/app.routes";

export function HomeHeader() {
    const { user, signOut } = useAuth();
    const navigation = useNavigation<AppNavigatorRoutesProps>();
    function handleOpenProfileDetails() {
        navigation.navigate('profile');
    }

    return (
        <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
            <Pressable onPress={() => handleOpenProfileDetails()}>
            <UserPhoto
                source={
                    user.avatar
                        ? { uri:user.avatar }
                        : defaultUserPhotoImg
                }
                size={16}
                alt="Imagem do usuário"
                mr={4}
            />
            </Pressable>
            <VStack flex={1}>
                <Pressable onPress={() => handleOpenProfileDetails()}>
                    <Text color="gray.100" fontSize="md">
                        Olá,
                    </Text>

                    <Heading color="gray.100" fontSize="md" fontFamily="heading">
                        {user?.name}
                    </Heading>
                </Pressable>
            </VStack>
            <TouchableOpacity onPress={signOut}>
                <Icon
                    as={MaterialIcons}
                    name="logout"
                    color="gray.200"
                    size={7}
                />
            </TouchableOpacity>
        </HStack>
    );
}