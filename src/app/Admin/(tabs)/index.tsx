import { View, Text, StyleSheet} from 'react-native';
import { id } from './[id]';
import { useEffect, useState } from 'react';
import styles from '@/styles';

import { nome, useCTDatabase } from '@/database/useCTDatabase';
import { Link } from 'expo-router';


export default function Home() {
    
    const CTDatabase = useCTDatabase()
    
    async function pegarId(){
        try {
            const response = await CTDatabase.pegarIdAluno(id.id)
            if(response)
            {
                await pegarNome(response.aluno_id)
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
                <Text style={{alignSelf:'center'}}>Bem vindo {nome?.nome}</Text>
                
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