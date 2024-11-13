import { View, Text, StyleSheet, Pressable} from 'react-native';
import { id } from './[id]';
import { useEffect, useState } from 'react';

import { nome, useCTDatabase } from '@/database/useCTDatabase';

import { Link, router } from 'expo-router';

export let idAluno: string

import styles from '@/styles';

export default function Home() {
    
    const CTDatabase = useCTDatabase()
    
    async function pegarId(){
        try {
            const response = await CTDatabase.pegarIdAluno(id.id)
            if(response)
            {
                await pegarNome(response.aluno_id)
                idAluno = response.aluno_id
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    async function pegarNome(aluno_id:string){
        const result = await CTDatabase.pegarNomeAluno(aluno_id)

        setNome(result)
    }
    const [nome, setNome] = useState<nome>()


    useEffect(()=> {
        pegarId()
    },[])

    return(
        <View style={stylesHome.container}>
            <View style={stylesHome.smallView}>
                <View style={{flexDirection:'row'}}>
                    <Text style={[styles.bold]}>Bem vindo </Text>
                    <Text>{nome?.nome}!</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Text style={[styles.botaoLogin,{paddingHorizontal:68}]}>
                        <Pressable onPress={() => router.navigate('/Aluno/(tabs)/aulas')}>
                            <Text>Aulas</Text>
                        </Pressable>
                    </Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Text style={[styles.botaoLogin,{paddingHorizontal:45}]}>
                        <Link href={'/Aluno/(tabs)/pagamentos'}>Pagamentos</Link>
                    </Text>
                </View>
            </View>
        </View>
    )
}

const stylesHome = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#e8e8e8'
    },
    smallView:{
        borderColor:'#CECECE',
        backgroundColor:'white',
        borderWidth:1,
        padding:50,
        borderRadius:5
    }
})