import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import { TextInput, Alert, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import dateFormat from 'dateformat';
import { PdfCode } from './PdfCode';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

export default function Dashboard(props) {

    const [name, setName] = useState('');
    const [Address, setAddress] = useState('');
    const [Mobile_No, setMobile] = useState();
    const [Product, setProduct] = useState();
    const [Quantity, setQuantity] = useState();
    const now = new Date();
    const [Invoice, setInvoice] = useState(dateFormat(now, "ddmmyyhhMss"));
    const [Total, setTotal] = useState();
    const [ReceivedBalance, setReceived] = useState();
    const [PaymentType, setPaymentType] = useState('Credit');
    const [RemainingBalance, setRemaining] = useState();
    const [selectedPrinter, setSelectedPrinter] = useState('');

    const printToPdf = async() => {
        let html = PdfCode(name, Address, Mobile_No, Quantity,
            Invoice, Product, Total, ReceivedBalance, 
            PaymentType, RemainingBalance); 

            try {
                const {uri} = await Print.
                printToFileAsync({html});
                console.log("File saved to ", uri);
               await shareAsync(uri, {UTI: '.pdf', 
            mimeType: 'application/pdf'});
                setName('');
                setAddress('');
                setInvoice(now, "ddmmyyhhMss");
                setMobile('');
                setQuantity('');
                setReceived('');
                setTotal('');
            }catch (error){
                Alert.alert("Something went wrong...");
            }
    }
    
    return (
     <ScrollView>
        <View style = {styles.container}>

        <View style = {styles.input}>
        <Text>Name</Text>
        <TextInput style = {styles.textinput}
         placeholder='Full Name'
         onChange={(text) => setName(text)}
        ></TextInput>
        </View>
        <View style = {styles.input}>
        <Text>Address</Text>
        <TextInput style = {styles.textinput}
         onChange={(text) => setAddress(text)}
        placeholder='Address'></TextInput>
        </View>
        <View style = {styles.input}>
        <Text>Mobile No.</Text>
        <TextInput style = {styles.textinput}
         onChange={(text) => setMobile(text)}
         placeholder='Mobile No.'
         keyboardType='numeric'></TextInput>
        </View>
        <View style = {styles.input}>
            <Text>Product</Text>
           <View style = {styles.picker}>
           <Picker 
            selectedValue={Product}
            onValueChange = {(item, index) => setProduct(item)}
            style = {styles.pickercontainer}
            >
                <Picker.Item label='Car' value = 'car' />
                <Picker.Item label='Wifi' value = 'wifi' />
                <Picker.Item label = 'Vegetables' value = 'vegetables' />
            </Picker>
           </View>
        </View>
        <View style = {styles.input}>
        <Text>Quantity</Text>
        <TextInput style = {styles.textinput}
         onChange={(text) => setQuantity(text)}
         placeholder='Quantity'
         keyboardType='numeric'></TextInput>
        </View>
        <View style = {styles.input}>
        <Text>Total</Text>
        <TextInput style = {styles.textinput}
        onChange={(text) => setTotal(text)}
        placeholder='Total Amount' keyboardType='numeric'></TextInput>
        </View>
        <View style = {styles.input}>
        <Text>Invoice No.</Text>
        <TextInput style = {styles.textinput}
        onChange={(text) => setInvoice(text)}
        placeholder='Invoice No.' keyboardType='numeric'></TextInput>
        </View>
        <View style = {styles.input}>
        <Text>Received</Text>
        <TextInput style = {styles.textinput}
        onChange={(text) => setReceived(text)}
        placeholder='Received Balance' keyboardType='numeric'></TextInput>
        </View>
        
        <View style = {styles.input}>
            <Text>Payment Type</Text>
           <View style = {styles.picker}>
           <Picker 
            selectedValue={PaymentType}
            onValueChange = {(item, index) => setPaymentType(item)}
            style = {styles.pickercontainer}
            >
                <Picker.Item label='Credit' value = 'credit' />
                <Picker.Item label='Cash' value = 'cash' />
                <Picker.Item label = 'Other' value = 'other' />
            </Picker>
           </View>
        </View>
        <View style = {styles.input}>
        <Text>Remaning</Text>
        <TextInput style = {styles.textinput}
        onChange={(text) => setRemaining(text)}
        placeholder='Remaining Amount $' keyboardType='numeric'></TextInput>
        </View>
       <View style = {styles.invoicegeneratorbutton}>
       <Button title='Generate Invoice'
            style = {styles.textinput}
            onPress={printToPdf} />
       </View>

        </View>
       
     </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginBottom: 20,
      
      
    },
    input: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
    },
    textinput: {
        marginTop: 4,
        height:40,
        borderColor:"#000",
        borderWidth:1,
        borderRadius: 4,
        padding:4,
        marginBottom: 6,
    },
    picker: {
        marginTop: 10,
        borderWidth:1,
        borderRadius: 4,
        height: 50,
        borderColor: '#000',
    },
    invoicegeneratorbutton: {
        marginTop: 10,
        height:40,
        marginLeft: 30,
        marginRight:30,
        marginBottom: 15,
    }
  });