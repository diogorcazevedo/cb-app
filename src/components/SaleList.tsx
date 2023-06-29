import { HStack, Spacer, Text, VStack} from 'native-base';
import {TouchableOpacity} from "react-native";
import React from "react";
import {SalesDTO} from "@dtos/SalesDTO";

type Props = {
    data: SalesDTO;
}

export function SaleList({ data }: Props) {
    return (
        <TouchableOpacity>
            <HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
                <HStack space={[2, 3]} justifyContent="space-between">
                    <Text fontSize="xs" _light={{
                        color: "warmGray.50"
                    }} color="coolGray.800" bold>
                        {data.id}
                    </Text>
                    <VStack>
                        <Text maxWidth={56} fontSize="xs" _light={{
                            color: "warmGray.50"
                        }} color="coolGray.800" bold>
                            {data.user.name}
                        </Text>
                    </VStack>
                    <Spacer />
                    <Text fontSize="xs" _light={{
                        color: "warmGray.50"
                    }} color="coolGray.800" alignSelf="flex-start">
                        { new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseInt(data.total))}
                    </Text>
                </HStack>
            </HStack>
        </TouchableOpacity>
    );
}