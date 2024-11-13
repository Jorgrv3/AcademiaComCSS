import { View, Text, StyleSheet} from 'react-native';
import { id } from './[id]';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';

import styles from '@/styles';

import { nome, useCTDatabase } from '@/database/useCTDatabase';

export let idInstrutor: string
export let eAdmin: string

export default function Home() {
    
    const [eAdmin2, setEAdmin2] = useState<string>()

    const CTDatabase = useCTDatabase()
    
    async function pegarId(){
        try {
            const response = await CTDatabase.pegarIdInstrutor(id.id)
            if(response)
            {
                await pegarNome(response.instrutor_id)
                idInstrutor = response.instrutor_id
                eAdmin = response.eAdmin
                setEAdmin2(eAdmin)
                console.log(eAdmin)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    async function pegarNome(instrutor_id:string){
        const result = await CTDatabase.pegarNomeInstrutor(instrutor_id)

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
                    <Text style={[styles.botaoLogin,{paddingHorizontal:65}]}>
                        <Link href={'/Admin/(tabs)/alunos'}>Alunos</Link>
                    </Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Text style={[styles.botaoLogin,{paddingHorizontal:53}]}>
                        <Link href={'/Admin/(tabs)/instrutores'}>Instrutores</Link>
                    </Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Text style={styles.botaoLogin}>
                        <Link href={'/Admin/(tabs)/administradores'}>Administradores</Link>
                    </Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Text style={[styles.botaoLogin,{paddingHorizontal:68}]}>
                        <Link href={'/Admin/(tabs)/aulas'}>Aulas</Link>
                    </Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Text style={[styles.botaoLogin,{paddingHorizontal:45}]}>
                        <Link href={'/Admin/(tabs)/pagamentos'}>Pagamentos</Link>
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