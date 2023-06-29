import {FlatList, HStack, PresenceTransition, Pressable, Spacer, Text, useToast, View, VStack} from 'native-base';
import {HomeHeader} from '@components/HomeHeader';
import {CenterHeader} from '@components/CenterHeader';
import React, {useCallback, useState} from 'react';
import {Loading} from '@components/Loading';
import {useFocusEffect, useRoute} from "@react-navigation/native";
import {api} from "@services/api";
import {AppError} from "@utils/AppError";
import {SaleList} from "@components/SaleList";
import {SalesDTO} from "@dtos/SalesDTO";


type RouteParamsProps = {
    centerId: string;
}

export function Center() {
    const [sales, setSales] =  useState<SalesDTO[]>([]);
    const [salesTotal, setSalesTotal] = useState<any>({});
    const [centerName, setCenterName] = useState<any>({});
    const [center, setCenter] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = React.useState(true);
    const toast = useToast();
    const route = useRoute();
    const { centerId } = route.params as RouteParamsProps;

    async function fetchGroups() {
        try {
            setIsLoading(true);
            setCenter(centerId)
            const response = await api.get('/sales/center/'+centerId);
            const dataResponse= response.data.sales
            const dataResponseArray = Object.keys(dataResponse).map(key => dataResponse[key])
            setSales(dataResponseArray);
            setSalesTotal(response.data.total);
            setCenterName(response.data.center);

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares';
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchGroups();
        },[centerId])
    )

    return (
        <VStack flex={1}>
            <HomeHeader />

            {isLoading ? <Loading /> :
                <>
                    <CenterHeader centerId={center} />
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
                        // onPress={() => setIsOpen(!isOpen)}
                    >
                        <HStack space={[2, 3]} justifyContent="space-between">
                            <Text _light={{
                                color: "warmGray.50"
                            }} color="coolGray.800" bold>
                                {centerName}
                            </Text>
                            <Spacer />
                            <Text  _light={{
                                color: "warmGray.50"
                            }} color="coolGray.800" alignSelf="flex-start">
                                Total:  { new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseInt(salesTotal))}
                            </Text>
                        </HStack>
                    </Pressable>

                    <PresenceTransition visible={isOpen} initial={{
                        opacity: 0
                    }} animate={{
                        opacity: 1,
                        transition: {
                            duration: 250
                        }
                    }}>
                        <FlatList data={sales}
                                  keyExtractor={item => item.id}
                                  renderItem={({item}) => <SaleList data={item}/>}
                                  showsVerticalScrollIndicator={false}
                                  _contentContainerStyle={{
                                      paddingBottom: "96"
                                  }}
                        />
                    </PresenceTransition>
                </>
            }
        </VStack>
    );
}