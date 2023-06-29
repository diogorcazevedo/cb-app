import {Text, Pressable, IPressableProps, VStack, HStack, Spacer, PresenceTransition, FlatList} from 'native-base';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation } from '@react-navigation/native';
import React from "react";

type Props = IPressableProps & {
    total: string;
    name: string;
    id: string;
}


export function SalesCenterList({ name, total, id }: Props) {
    const [isOpen, setIsOpen] = React.useState(false);
    const navigation = useNavigation<AppNavigatorRoutesProps>();

    function handleOpenExerciseDetails(centerId: string) {
        navigation.navigate('center', { centerId });
    }

    return (
        <VStack px={8}>
            <Pressable
                my={4}
                px={4}
                h={10}
                bg="green.700"
                rounded="md"
                justifyContent="center"
                alignItems="center"
                overflow="hidden"
                _pressed={{
                    borderColor: 'gray.500',
                    borderWidth: 1
                }}
                onPress={() => handleOpenExerciseDetails(id)}
            >
                <HStack space={[2, 3]} justifyContent="space-between">
                    <Text _light={{
                        color: "warmGray.50"
                    }} color="coolGray.800" bold>
                        {name}
                    </Text>
                    <Spacer />
                    <Text  _light={{
                        color: "warmGray.50"
                    }} color="coolGray.800" alignSelf="flex-start">
                        Total: { new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseInt(total))}
                    </Text>
                </HStack>
            </Pressable>
        </VStack>

    );
}