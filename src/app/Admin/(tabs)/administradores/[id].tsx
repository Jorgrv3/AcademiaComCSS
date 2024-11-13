import { View, Text} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react';
import styles from '@/styles';

import { useCTDatabase } from '@/database/useCTDatabase';

export default function Alunox(){
    const params = useLocalSearchParams<{id: string}>();
    const [data, setData] = useState({
        email: ''
    })

    const CTDatabase = useCTDatabase()

    async function getInfo(){
        if(params.id){
            const response = await CTDatabase.adminInfo(params.id)
            if(response){
                setData({
                    email: response.email
                })
            }else{
                console.log('Nenhuma informação passada pelo ID.')
            }
        }
    }

    useEffect(()=> {
        getInfo()
    },[])

    return(
        <View style={styles.perfilStyle}>
            <View style={styles.smallViewPerfil}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.bold}>ID: </Text>
                    <Text>{params.id}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.bold}>E-mail: </Text>
                    <Text>{data.email}</Text>
                </View>
            </View>
        </View>
    )
}