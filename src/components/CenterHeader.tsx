import {HStack, Text, VStack, Pressable, Center, Menu, Button, IPressableProps} from 'native-base';
import {useNavigation} from "@react-navigation/native";
import {AppNavigatorRoutesProps} from "@routes/app.routes";
import React from "react";


type Props = IPressableProps & {
    centerId: string;
}


export function CenterHeader({ centerId }: Props) {

    const navigation = useNavigation<AppNavigatorRoutesProps>();
    const [shouldOverlapWithTrigger] = React.useState(false);
    const [position, setPosition] = React.useState("auto");

    function handleOpenCenterDetails(centerId: string) {
        navigation.navigate('center', { centerId });
    }
    function handleOpenCenterByMonth(centerId: string, month: string) {
        navigation.navigate('centerByMonth', { centerId, month });
    }

    return (
        <HStack bg="gray.900" pt={6} pb={6}  alignItems="center"  rounded="md">
            <VStack flex={1} bg="green.900" px={2} py={2} mx={2}>
                <Pressable onPress={() => handleOpenCenterDetails("2")}>
                    <Center fontSize="md" fontFamily="heading">
                        <Text color="white" >Online</Text>
                    </Center>
                </Pressable>
            </VStack>
            <VStack flex={1} bg="green.900" px={2} py={2} mx={2}>
                <Pressable onPress={() => handleOpenCenterDetails("13")}>
                    <Center fontSize="md" fontFamily="heading">
                        <Text color="white" >PC</Text>
                    </Center>
                </Pressable>
            </VStack>
            <VStack flex={1} bg="green.900" px={2} py={2} mx={2} >
                <Pressable onPress={() => handleOpenCenterDetails("4")}>
                    <Center fontSize="md" fontFamily="heading">
                        <Text color="white" >SV</Text>
                    </Center>
                </Pressable>
            </VStack>
            <VStack flex={1} bg="gray.900" px={2}  mx={2}>
                <Menu w="40" shouldOverlap WithTrigger={shouldOverlapWithTrigger} // @ts-ignore
                      placement={position == "auto" ? undefined : position} trigger={triggerProps => {
                    return <Button bg="gray.900"  alignSelf="center" variant="solid" {...triggerProps}>
                        Mês
                    </Button>;
                }}>
                    <Menu.Item>
                        <Pressable onPress={() => handleOpenCenterByMonth(centerId,"01")}>
                            <Center fontSize="md" fontFamily="heading">
                                <Text color="gray.900" >JANEIRO</Text>
                            </Center>
                        </Pressable>
                    </Menu.Item>
                    <Menu.Item>
                        <Pressable onPress={() => handleOpenCenterByMonth(centerId,"02")}>
                            <Center fontSize="md" fontFamily="heading">
                                <Text color="gray.900" >FEVEREIRO</Text>
                            </Center>
                        </Pressable>
                    </Menu.Item>
                    <Menu.Item>
                        <Pressable onPress={() => handleOpenCenterByMonth(centerId,"03")}>
                            <Center fontSize="md" fontFamily="heading">
                                <Text color="gray.900" >MARÇO</Text>
                            </Center>
                        </Pressable>
                    </Menu.Item>
                    <Menu.Item>
                        <Pressable onPress={() => handleOpenCenterByMonth(centerId,"04")}>
                            <Center fontSize="md" fontFamily="heading">
                                <Text color="gray.900" >ABRIL</Text>
                            </Center>
                        </Pressable>
                    </Menu.Item>
                    <Menu.Item>
                        <Pressable onPress={() => handleOpenCenterByMonth(centerId,"05")}>
                            <Center fontSize="md" fontFamily="heading">
                                <Text color="gray.900" >MAIO</Text>
                            </Center>
                        </Pressable>
                    </Menu.Item>
                    <Menu.Item>
                        <Pressable onPress={() => handleOpenCenterByMonth(centerId,"06")}>
                            <Center fontSize="md" fontFamily="heading">
                                <Text color="gray.900" >JUNHO</Text>
                            </Center>
                        </Pressable>
                    </Menu.Item>
                    <Menu.Item>
                        <Pressable onPress={() => handleOpenCenterByMonth(centerId,"07")}>
                            <Center fontSize="md" fontFamily="heading">
                                <Text color="gray.900" >JULHO</Text>
                            </Center>
                        </Pressable>
                    </Menu.Item>
                    <Menu.Item>
                        <Pressable onPress={() => handleOpenCenterByMonth(centerId,"08")}>
                            <Center fontSize="md" fontFamily="heading">
                                <Text color="gray.900" >AGOSTO</Text>
                            </Center>
                        </Pressable>
                    </Menu.Item>
                    <Menu.Item>
                        <Pressable onPress={() => handleOpenCenterByMonth(centerId,"09")}>
                            <Center fontSize="md" fontFamily="heading">
                                <Text color="gray.900" >SETEMBRO</Text>
                            </Center>
                        </Pressable>
                    </Menu.Item>
                    <Menu.Item>
                        <Pressable onPress={() => handleOpenCenterByMonth(centerId,"10")}>
                            <Center fontSize="md" fontFamily="heading">
                                <Text color="gray.900" >OUTUBRO</Text>
                            </Center>
                        </Pressable>
                    </Menu.Item>
                    <Menu.Item>
                        <Pressable onPress={() => handleOpenCenterByMonth(centerId,"11")}>
                            <Center fontSize="md" fontFamily="heading">
                                <Text color="gray.900" >NOVEMBRO</Text>
                            </Center>
                        </Pressable>
                    </Menu.Item>
                    <Menu.Item>
                        <Pressable onPress={() => handleOpenCenterByMonth(centerId,"12")}>
                            <Center fontSize="md" fontFamily="heading">
                                <Text color="gray.900" >DEZEMBRO</Text>
                            </Center>
                        </Pressable>
                    </Menu.Item>
                </Menu>
            </VStack>
        </HStack>
    );
}