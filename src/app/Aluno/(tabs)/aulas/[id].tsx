import { View, Text, TouchableOpacity} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router';

import { useCTDatabase} from '@/database/useCTDatabase';

import { Feather } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from '@/styles';

export default function AulaX(){
    const params = useLocalSearchParams<{id: string}>()
    const [inscritos, setInscritos] = useState('')

    function atualizar(){
        getInscritos()
    }

    const [data, setData] = useState({
        inicio: '0',
        termino: '0',
    })

    const CTDatabase = useCTDatabase()

    async function getInfo(){
        if(params.id){
            const response = await CTDatabase.aulaInfo(Number(params.id))
            if(response){
                setData({
                    inicio: response.inicio,
                    termino: response.termino,
                })
            }else{
                console.log('Nenhuma informação passada pelo ID.')
            }
        }
    }


    async function getInscritos(){
        try {
            const result = await CTDatabase.alunosInscritos(Number(params.id))
            setInscritos(String(result?.count))
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
            getInfo()
            getInscritos()
    },[])

    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={styles.bold}>Inscrever-se</Text>
                <AntDesign name="arrowright" style={{marginTop:3}} size={17} color="black" />
                <TouchableOpacity hitSlop={15}onPress={() => router.navigate('/Aluno/(tabs)/aulas/seinscrever/' + Number(params.id))}>
                    <MaterialIcons name='add' size={32} color={'black'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={atualizar}>
                    <Feather name="refresh-cw" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={{flexDirection:'row'}}>
                <Text style={styles.bold}>ID: </Text>
                <Text>{params.id}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.bold}>Início: </Text>
                <Text>{data.inicio}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.bold}>Termino: </Text>
                <Text>{data.termino}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.bold}>Inscritos: </Text>
                <Text>{inscritos}</Text>
            </View>
        </View>
    )
}