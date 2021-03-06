import * as React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import { DataTable } from 'react-native-paper';
import { LineChart, PieChart } from 'react-native-chart-kit';

import jsonToTable from 'json-to-table';

function ResultScreen({navigation, route}) {
    const { body } = route.params;
    const jsonData = JSON.parse(body);
    //console.log('json', jsonData);
    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const sortByKey = (array, key) => {
        return array.sort((a, b) =>
        {
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
    }

    var graphDefault = [
        {
            color: "#f2ceb6",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            color: "#ecb19f",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            color: "#ec8c98",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            color: "#e36d8d",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            color: "#d75287",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            color: "#bd3e8b",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            color: "#9b3193",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            color: "#6b2c95",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            color: "#5c2084",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            color: "#521c68",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            color: "#3e125d",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            color: "#2b0e46",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ];

    var pieArr = [];
    var percentJsonArr = [];
    var scoreJsonArr = [];
    var countJsonArr = [];
    var fileshareJsonArr = [];
    var apologyJsonArr = [];
    if(jsonData != null){
        Object.keys(jsonData).forEach((rowKey, index) => {
            var rowJson = jsonData[rowKey];
            var tempJson = {};
            tempJson = graphDefault[index];
            tempJson['name'] = rowKey;
            tempJson['count'] = rowJson['count'];
            countJsonArr.push({ name: rowKey, value: rowJson['count']});
            tempJson['Msg Length'] = rowJson['Msg Length'];
            tempJson['Apology_count'] = rowJson['Apology_count'];
            apologyJsonArr.push({ name: rowKey, value: rowJson['Apology_count']});
            tempJson['Fileshare_count'] = rowJson['Fileshare_count'];
            fileshareJsonArr.push({ name: rowKey, value: rowJson['Fileshare_count']});
            tempJson['AM_count'] = rowJson['AM_count'];
            tempJson['PM_count'] = rowJson['PM_count'];
            tempJson['score'] = rowJson['score'];
            scoreJsonArr.push({ name: rowKey, value: rowJson['score']});
            tempJson['percent'] = rowJson['percent'];
            percentJsonArr.push({ name: rowKey, value: rowJson['percent']});
            pieArr.push(tempJson);
        })

        percentJsonArr = sortByKey(percentJsonArr, 'value');
        scoreJsonArr = sortByKey(scoreJsonArr, 'value');
        countJsonArr = sortByKey(countJsonArr, 'value');
        fileshareJsonArr = sortByKey(fileshareJsonArr, 'value');
        apologyJsonArr = sortByKey(apologyJsonArr, 'value');
    }

    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
            <Text style={Style.titleStyle}>???????????? (?????????)</Text>
            <PieChart
                data={pieArr}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={"percent"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[0, 0]}
                absolute={false}
            />
            <Text style={Style.textStyleMain}>
                <Text style={Style.textStyleOne}>Free Rider: {scoreJsonArr[scoreJsonArr.length - 1]['name']} {'\n'}</Text>
                {'\n'}
                ??? ????????? ?????? {'\n'}
                {
                    scoreJsonArr.map((row, index)=>(
                        (index == 0) && (
                            <Text style={Style.textStyleTwo}>
                                ????Man of the team : {row['name']} {Math.floor(row['value'])}??? {'\n'}
                            </Text>
                        ) || 
                        (index != 0) && (
                            <Text>
                                {index+1}??? : {row['name']} {Math.floor(row['value'])}??? {'\n'}
                            </Text>
                        )
                    ))
                }
                {'\n'}
                ???????????? ????????? ???????????? <Text style={Style.textStyleTwo}>{scoreJsonArr[scoreJsonArr.length - 1]['name']}</Text> ????????? ?????????????????????. {'\n'}
                {
                    (percentJsonArr[percentJsonArr.length - 1]['value'] < (1/(2 * percentJsonArr.length))) && (
                        <Text>
                            ?????? ???????????????. ?????? ??????????????? ??????.
                        </Text>
                    ) || 
                    (percentJsonArr[percentJsonArr.length - 1]['value'] < (1/(1.5 * percentJsonArr.length))) && (
                        <Text>
                            ??? ??????, ??????????????? ?????????????????????. ?????? ?????? ???????????? ?????? ?????? ??? ????????????.
                        </Text>
                    ) || 
                    (
                        <Text>
                            ????????? ???????????? ?????????????????? ?????? ??? ????????? ?????? ??????.
                        </Text>   
                    )
                }
                {'\n'}
                {'\n'}
            </Text>
            <Text style={Style.subTitleStyle}>???????????? - Silence villan</Text>
            <PieChart
                data={pieArr}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={"count"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[0, 0]}
                absolute={false}
            />
            <Text style={Style.textStyleMain}>
                 ??? ???????????? ????????? ????????? ???????????? ?????????????????? ???????????????. ????????????????????? ??????????????? ??????????????????.
                {'\n'}{'\n'}
                {
                    countJsonArr.map((row, index)=>(
                        <Text>
                            {index+1}??? : {row['name']} {Math.floor(row['value'])}??? {'\n'}
                        </Text>
                    ))
                }
            </Text>
            <Text style={Style.subTitleStyle}>?????? ????????? - File uploader</Text>
            <PieChart
                data={pieArr}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={"Fileshare_count"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[0, 0]}
                absolute={false}
            />
            <Text style={Style.textStyleMain}>
                 ??? ???????????? ????????? ????????? ??????????????? ???????????????. ?????? ????????? ?????? ?????? ??????????????? ??????????????????.
                {'\n'}{'\n'}
                {
                    fileshareJsonArr.map((row, index)=>(
                        <Text>
                            {index+1}??? : {row['name']} {Math.floor(row['value'])}??? {'\n'}
                        </Text>
                    ))
                }
            </Text>
            <Text style={Style.subTitleStyle}>???????????? - Sorry bird</Text>
            <PieChart
                data={pieArr}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={"Apology_count"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[0, 0]}
                absolute={false}
            />
            <Text style={Style.textStyleMain}>
                 ??? ???????????? ????????? ????????? ?????? ???????????? ???????????????. ????????? ????????? ???????????????????
                {'\n'}{'\n'}
                {
                    apologyJsonArr.map((row, index)=>(
                        <Text>
                            {index+1}??? : {row['name']} {Math.floor(row['value'])}??? {'\n'}
                        </Text>
                    ))
                }
            </Text>
            <Image style={{
                resizeMode: "contain",
                height: 300,
                width: 200,
            }} source = {require('../image/mainImage.png')}/>
            <Text style={Style.textStyleMain}>
                ??? ????????? ???????????? ???????????? ????????? ????????????????????? ?????? ?????? ????????? ??????  ??? ????????????.{'\n'}
                ???????????? ????????????. ????{'\n'}
                <Text style={Style.textStyleThree}>
                    The above result is an analysis table based on Kakaotalk data, so it may be different from the actual experience.{'\n'}
                    Please watch it for fun. ????{'\n'}
                </Text>
            </Text>
            
            <TouchableOpacity
                style={Style.buttonStyle}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Home')}>
                <Text style={Style.buttonTextStyle}>????????????</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const Style = StyleSheet.create({
    titleStyle:{
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    subTitleStyle:{
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    textStyleMain:{
        color: 'black',
        fontSize: 15,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    textStyleOne:{
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    textStyleTwo:{
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textStyleThree:{
        color: 'black',
        fontSize: 12,
    },
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        width: 120,
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
});

export default ResultScreen;