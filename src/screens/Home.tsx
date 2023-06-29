import {useToast, VStack} from 'native-base';
import {HomeHeader} from '@components/HomeHeader';
import React, {useEffect, useState} from 'react';
import {AppError} from '@utils/AppError';
import {Loading} from '@components/Loading';
import {SalesCenterList} from "@components/SaleCenterList";
import {api} from "@services/api";

export function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [praiaDoCantoTotal, setPraiaDoCantoTotal] = useState<any>({});
    const [shoppingVitoriaTotal, setShoppingVitoriaTotal] = useState<any>({});
    const [onlineTotal, setOnlineTotal] = useState<any>({});
    const toast = useToast();
    async function fetchGroups() {
        try {
            setIsLoading(true);
            const response = await api.get('/sales/index');
            setPraiaDoCantoTotal(response.data.total_pc);
            setShoppingVitoriaTotal(response.data.total_sv);
            setOnlineTotal(response.data.total_online);

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


    useEffect(() => {
        fetchGroups();
    },[])

    return (
        <VStack flex={1}>
            <HomeHeader />
            {isLoading ? <Loading /> :
                <>
                    <SalesCenterList name={"Online"}            id={"2"}    total={onlineTotal} />
                    <SalesCenterList name={"Praia do Canto"}    id={"13"}   total={praiaDoCantoTotal} />
                    <SalesCenterList name={"Shopping Vitoria"}  id={"4"}    total={shoppingVitoriaTotal} />
                </>
            }

        </VStack>
    );
}