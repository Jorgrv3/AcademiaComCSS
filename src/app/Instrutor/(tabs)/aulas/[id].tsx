import { View, Text, TextInput, Alert, TouchableOpacity, FlatList} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react';
import styles from '@/styles';
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';

import { useCTDatabase, aulas, count, alunos } from '@/database/useCTDatabase';
import { Alunos } from '@/components/Alunos';

export default function AulaX(){
    const params = useLocalSearchParams<{id: string}>()
    const [aluno_id, setAluno_id] = useState('')
    const [inscritos, setInscritos] = useState('')
    const [alunos, setAlunos] = useState<alunos[]>([])

    function atualizar(){
        getInscritos()
        listarAlunos()
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

    async function listarAlunos(){
        try {
            const result = await CTDatabase.listarAlunosEmAula(Number(params.id))
            setAlunos(result)
        } catch (error) {
            console.log(error)
        }
    }

    async function removerAlunos(id: number){
        try {
            await CTDatabase.removerAlunoDaAula(id)

            await listarAlunos()
            await getInscritos()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
            getInfo()
            getInscritos()
            listarAlunos()
    },[])

    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity hitSlop={15} onPress={() => router.navigate('/Instrutor/(tabs)/aulas/addaluno/' + Number(params.id))}>
                    <MaterialIcons name='add' size={32} color={'black'} />
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:5}} onPress={atualizar}>
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
            <FlatList 
                    data={alunos}
                    keyExtractor={(item)=> String(item.id)}
                    renderItem={({ item }) => 
                    <Alunos 
                        data={item} 
                        onDelete={() => removerAlunos(item.id)}
                        onOpen={() => router.navigate('/Instrutor/(tabs)/aulas/aluno/' + item.id)}
                    />}
                />
        </View>
    )
}