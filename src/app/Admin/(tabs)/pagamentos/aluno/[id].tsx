import { View, Text} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react';

import { useCTDatabase, aulas } from '@/database/useCTDatabase';
import styles from '@/styles';

export default function Alunox(){
    const params = useLocalSearchParams<{id: string}>();
    const [data, setData] = useState({
        nome: '',
        nascimento: '',
        telefone: '',
        usuario_id: '',
        aula_id: ''
    })

    const CTDatabase = useCTDatabase()

    async function getInfo(){
        if(params.id){
            const response = await CTDatabase.alunoInfo(Number(params.id))
            if(response){
                setData({
                    nome: response.nome,
                    nascimento: response.nascimento,
                    telefone : response.telefone,
                    usuario_id: response.usuario_id,
                    aula_id: response.aula_id
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
                    <Text style={styles.bold}>Nome: </Text>
                    <Text>{data.nome}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.bold}>Nascimento: </Text>
                    <Text>{data.nascimento}</Text>
                </View>
            </View>
        </View>
    )
}