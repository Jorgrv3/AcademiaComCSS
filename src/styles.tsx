import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container:{
        justifyContent:'center'
    },
    input:{
        borderWidth:1,
        borderColor:'#cecece',
        borderRadius:5,
        marginHorizontal:15,
        marginVertical:5,
        backgroundColor:'white'
    },
    botaoLogin:{
        marginVertical:15,
        backgroundColor:'#cecece',
        borderRadius:5,
        justifyContent:'center',
        paddingVertical:5,
        paddingHorizontal:35
    },
    inputLogin:{
        borderRadius:25,
        marginVertical:15,
        backgroundColor:'#cecece',
        flex:1
    },
    smallView:{
        backgroundColor:'#FFFFFF',
        borderRadius:5,
        margin:15,
        marginVertical:25
    },
    loginLogin:{
        fontWeight:'500',
        fontSize:25,
        alignSelf:'center'
    },
    camposInput:{
        fontWeight:'500',
        fontSize:15
    },
    perfilStyle:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    smallViewPerfil:{
        borderWidth: 0.5,
        padding:20
    },
    bold:{
        fontWeight:'600'
    }
})

export default styles;