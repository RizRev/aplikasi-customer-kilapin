import React, {useEffect, useState} from 'react';
import {BackHandler, Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {BackIcon} from '../../assets';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Gap} from '../../components'
import {CheckBox} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationActions} from '@actions';
import RadioForm from 'react-native-simple-radio-button';


const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Order = ({navigation,route}) => {
    const [tempTotal, setTempTotal] = useState(false);
    const codeRedux = useSelector(state => state.application.code)
    const voucherDiscount = useSelector(state => state.application.discount)
    console.log(voucherDiscount)
    const maxDiscount = useSelector(state => state.application.max_discount)
    const minTrans = useSelector(state => state.application.min_trans)
    console.log("codeRedux",codeRedux,voucherDiscount)
    let new_time = (useSelector(state => state.application.time))
    const userId = useSelector(state => state.auth.login.userId);
    const {t} = useTranslation();
    const [addressInput, setAddressInput] = useState('');
    const [selectedAddress, setSelectedAddress] = useState(null);
    const dispatch = useDispatch();
    const booking_type = useSelector(state => state.application.orderType)
    const description = useSelector(state => state.application.address);
    const postal_code = useSelector(state => state.application.postalcode);
    const voucherlist = useSelector(state => state.application.voucher);
    const orderType = useSelector(state => state.application.orderType);
    const lng = useSelector(state => state.application.lng);
    const lat = useSelector(state => state.application.lat);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAddOns, setIsOpenAddOns] = useState(false);
    const [isGraniteChecked, setGraniteChecked] = useState(false);
    const [isMarbleChecked, setMarbleChecked] = useState(false)
    const [isInsuranceChecked, setInsuranceChecked] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [voucherData, setVoucherData] = useState([]);
    const currentTimeUTC = new Date();

    // Menyesuaikan dengan perbedaan zona waktu GMT+7 (420 menit)
    // const gmtOffsetInMinutes = 420;
    const currentTimeGMTPlus7 = new Date
    // (currentTimeUTC.getTime() + gmtOffsetInMinutes * 60000);
    console.log("current time gmt +7",currentTimeGMTPlus7)
    
    // Mendapatkan jam, menit, dan detik dari waktu GMT+7
    const hours1 = currentTimeGMTPlus7.getHours();
    const minutes1 = currentTimeGMTPlus7.getMinutes();
    const seconds = currentTimeGMTPlus7.getSeconds();
    // Mendapatkan hari dalam bahasa Inggris (0: Minggu, 1: Senin, dst.)
    const dayOfWeek = currentTimeGMTPlus7.getDay();
    
    // Mendapatkan tanggal bulan (1-31)
    const dateOfMonth = currentTimeGMTPlus7.getDate();
    
    // Mendapatkan bulan dalam bahasa Inggris (0: Januari, 1: Februari, dst.)
    const month1 = currentTimeGMTPlus7.getMonth();
    
    // Mendapatkan tahun (misal: 2023)
    const year = currentTimeGMTPlus7.getFullYear();
    
        const [item_name, setSelectedPackage] = useState('');
        const [time, setSelectedTime] = useState(`${dateOfMonth}-${month1}-2023 ${hours1}:${minutes1}`);
        const [type, setSelectedType] = useState('');
    const [selectedDate, setSelectedDate] = useState(`${dateOfMonth}`);
    const [selectedMonth, setSelectedMonth] = useState(`${month1}`);
    const [selectedHour, setSelectedHour] = useState(`${hours1}`);
    const [selectedMinute, setSelectedMinute] = useState(`${minutes1}`);

    const date = Array.from({ length: 31 }, (_, index) => (index + 1).toString().padStart(2, '0'));
    const month = Array.from({ length: 12 }, (_, index) => (index + 1).toString().padStart(2, '0'));
    const hours = Array.from({ length: 25 }, (_, index) => index.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, index) => index.toString().padStart(2, '0'));

    const [discoutPrice,setDiscountPrice] = useState(0)
    const [totalHarga,setTotalHarga] = useState(0)

    const handleDateChange = (date) => {
        setSelectedDate(date);
        handleTimeChange(`${date}-${selectedMonth}-2023 ${selectedHour}:${selectedMinute}`);
        console.log('time change',time)
        console.log("Boedi Dancok : ",date);
    };

    const handleMonthChange = (month) => {
        setSelectedMonth(month);
        handleTimeChange(`${selectedDate}-${month}-2023 ${selectedHour}:${selectedMinute}`);
        console.log(selectedMonth)
    };

    const handleHourChange = (hour) => {
        setSelectedHour(hour);
        handleTimeChange(`${selectedDate}-${selectedMonth}-2023 ${hour}:${selectedMinute}`);
        console.log(selectedHour)
    };

    const handleMinuteChange = (minute) => {
        setSelectedMinute(minute);
        handleTimeChange(`${selectedDate}-${selectedMonth}-2023 ${selectedHour}:${minute}`);
        console.log(selectedMinute);
    };

    const getSelectedAddOns = () => {
      const selectedAddOns = [];
      if (isGraniteChecked) {
        selectedAddOns.push('Lantai Granite');
      }
      if (isMarbleChecked) {
        selectedAddOns.push('Lantai Marble');
      }
      if (isInsuranceChecked) {
        selectedAddOns.push('Asuransi');
      }
      return selectedAddOns;
    };
    
    const selectedAddOns = getSelectedAddOns();

    const filterVoucherByZone = (voucherlist, description) => {
        const parsedDescription = description.toLowerCase(); // Convert the description to lowercase for case-insensitive comparison

        // Filter the voucherlist based on the zone property
        const filteredVouchers = voucherlist.filter((voucher) => {
            const zone = voucher.zone.toLowerCase(); // Convert the zone to lowercase for case-insensitive comparison
            return parsedDescription.includes(zone);
        });

        return filteredVouchers;
    };

    const filteredVouchers = filterVoucherByZone(voucherlist, description);
    console.log("Filtered Vouchers: ", filteredVouchers);


    useEffect(() => {
        const backAction = () => {
            navigation.navigate('Maps');
            dispatch(ApplicationActions.onclearCodeVoucher());
            dispatch(ApplicationActions.onclearVoucher())
            // setSelectedPackage('');
            // setDiscountPrice(0);
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [navigation]);

    const [data, setMemberData] = useState('');
    const [address, setAddress] = useState('')
    const [notes, setNotes] = useState('')
    const [voucher, setVoucher] = useState('')
    const [voucherErase, setVoucherErase] = useState(false)
    // const [service, setService] = useState('Urgent')


    const handleVoucherPress = () => {
        console.log("ini handle press", voucherDiscount)
        if (codeRedux) {
            setTempTotal(true);
            Alert.alert(
                'Voucher Code',
                `Your voucher code: ${codeRedux}`,
                [
                  {
                    text: 'Select Again', // First button with the 'Select Again' label
                    onPress:() => {
                        navigation.navigate('Voucher',{page: 'Order',price:harga});
                        dispatch(ApplicationActions.onclearCodeVoucher());
                        dispatch(ApplicationActions.onclearVoucher())
                      // Handle the action when the user selects 'Select Again'
                      // For example, open a modal or navigate to a voucher selection screen
                    },
                  },
                  {
                    text: 'Erase Voucher',
                    onPress:() => {
                        setVoucherErase(true)
                      // Handle the action when the user selects 'Erase Voucher'
                        dispatch(ApplicationActions.onclearCodeVoucher());
                        dispatch(ApplicationActions.onclearVoucher())
                        
                    },
                    style: 'destructive',
                  },
                ],
                { cancelable: false } // Prevent the alert from being dismissed by tapping outside
              );
            
            const size = item_name
            dispatch(ApplicationActions.onsizeOrder(size))
            dispatch(ApplicationActions.ontimeOrder(time))
            // 
        } else {
            setTempTotal(false);
            navigation.navigate('Voucher',{page: 'Order',price:harga});
        }
        
    };
  
    const handleSelectVoucher = (value) => {
      const selected = filteredVouchers.find((voucher) => voucher.id === value);
      setSelectedVoucher(selected);
      setIsOpen(false);
    };

    const handleInputChange = (text) => {
        // Handle the text input change here
        // For example, you can dispatch an action to update the state
        // Or use the text directly in your component logic
        console.log('Input Value:', text);
    };

    useEffect(() => {
        console.log('time',time)
        console.log("ini postal code",postal_code)
        console.log('option dispatch',booking_type)
        const fetchMemberData = async () => {
            try {
                console.log("menjalankan get data user")
                const id = await AsyncStorage.getItem('id')
                const link = `https://customer.kilapin.com/users/${id}`
                const response = await fetch(link);
                const dataMember = await response.json()

                setMemberData(dataMember.data)
                const vouchersWithId = dataMember.data.vouchers.map((voucher, index) => ({
                    ...voucher,
                    id: index + 1, // Adding 1 to avoid 'id' starting from 0 if needed
                  }));
          
                  const parsedDescription = description.toLowerCase(); // Convert the description to lowercase for case-insensitive comparison
          
                  // Filter the voucherlist based on the zone property
                  const filteredVouchers = vouchersWithId.filter((voucher) => {
                      const zone = voucher.zone.toLowerCase(); // Convert the zone to lowercase for case-insensitive comparison
                      return parsedDescription.includes(zone);
                  });
                  console.log('voucher lokasi',filteredVouchers)
          
                  const currentDate = new Date();
                  const validVouchers = filteredVouchers.filter((voucher) => {
                    const validFrom = new Date(voucher.validFrom);
                    const validUntil = new Date(voucher.validUntil);
                    return currentDate >= validFrom && currentDate <= validUntil;
                  });
            
                  // Filter vouchers based on type
                  const allVouchers = validVouchers;
                  const urgentVouchers = validVouchers.filter((voucher) => voucher.type === 'Urgent'|| voucher.type === 'All');
                  const bookingVouchers = validVouchers.filter((voucher) => voucher.type === 'Booking'|| voucher.type === 'All');
            
                  console.log("Voucher Urgent : ",urgentVouchers);
                //   if (page==='Profile') {
                //     setVoucherData(vouchersWithId);
                //   } else {
                    if(booking_type==='URGENT CLEANER') {
                        dispatch(ApplicationActions.onAddListVoucher(urgentVouchers));
                    }  else {
                        dispatch(ApplicationActions.onAddListVoucher(bookingVouchers));
                    }
                //   }
                if (response.ok) {
                    console.log("data diri sudah ready", dataMember)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchMemberData()
    }, [])

    const fetchData = async () => {
        try {
            if (isGraniteChecked && isMarbleChecked) {
                setOption('Granite and Marmer')
                const floor = 'Granit and Marmer'
                dispatch(ApplicationActions.onaddon(floor));
            } else if (isGraniteChecked) {
                setOption('Granite')
                const floor = 'Granit'
                dispatch(ApplicationActions.onaddon(floor));
            } else if (isMarbleChecked) {
                setOption('Marmer')
                const floor = 'Marmer'
                dispatch(ApplicationActions.onaddon(floor));
            } else {
                setOption('Nothing')
                const floor = 'Nothing'
                dispatch(ApplicationActions.onaddon(floor));
            }
            setInsuranceChecked(false)
            setTotalHarga(0)
            setHarga(0)
            const response = await fetch('https://customer.kilapin.com/service/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: item_name,
                    option,
                }),
            });

            const data = await response.json();
            // Proses data response sesuai kebutuhan, misalnya:
            const hasil_search = JSON.stringify(data);
            console.log('ini hasil search', hasil_search)
            if (data.data && data.data.length > 0) {
                const totalharga = parseInt(data.data[0].price) 
                temp_harga = totalHarga;
                // * (voucherDiscount !== null ? voucherDiscount/100:1);
                setItemId(data.data[0]._id);
                console.log('harga search',totalharga)
                setHarga(totalharga);
            }
            // else {
            //   console.error('No data or empty data array in the API response.');
            //   // Handle the error or show a message to the user
            // }
        } catch (error) {
            // Handle error jika ada
            console.error('Error fetching data:', error);
        }
    };

    const handlePackageChange = (itemValue) => {
        fetchData();
        setSelectedPackage(itemValue);
        // dispatch(ApplicationActions.onclearCodeVoucher());
    }

    const handleTimeChange = (itemValue) => {
        setSelectedTime(itemValue);
    }

    const handleTypeChange = (itemValue) => {
        setSelectedType(itemValue);
    }
    const [option, setOption] = useState('Nothing')


    const [harga, setHarga] = useState(0)
    const [itemId, setItemId] = useState('')
    let temp_harga;
   
    useEffect(() => {
        fetchData();
        // Definisikan fungsi untuk melakukan fetch ke API
        // Panggil fungsi fetchData setiap kali item_name atau option berubah
    }, [item_name, option, isGraniteChecked, isMarbleChecked]); // Tambahkan item_name dan option sebagai dependensi
    useEffect(()=>{
        console.log('ini voucher trigger diskon', voucherDiscount)
        const hargaSementara = harga
        if (voucherDiscount) {
            console.log("masuk voucher discount")
            if (hargaSementara<minTrans) {
                setTotalHarga(hargaSementara)
            } else {
                const potongan = hargaSementara*(voucherDiscount/100)
                console.log('ini potongan',potongan)
                let hargaAkhir
                let diskon
                if (potongan > maxDiscount) {
                    hargaAkhir = hargaSementara - maxDiscount
                    diskon = maxDiscount
                    // setHarga(hargaAkhir)
                    console.log('ini harga akhir',hargaAkhir)
                } else {
                    hargaAkhir = hargaSementara - potongan
                    diskon = potongan
                    console.log('ini harga akhir',hargaAkhir)
                }
                setTotalHarga(hargaAkhir)
                setDiscountPrice(diskon)
            }
        }else{
            console.log("ini masuk kosong")
            setTotalHarga(hargaSementara)
            setDiscountPrice(0)
        }
    },[harga, voucherErase, voucherDiscount])

    const [nilai, setNilai] = useState(0)
    const handleOrder = async () => {
        try {
            dispatch(ApplicationActions.onsizeOrder(item_name))
            if (booking_type === 'BOOKING CLEANER') {
                var service = 'Booking'
            } else {
                var service = 'Urgent'
            }
            console.log(time)
            let itemName = item_name;
            var name = data.name
            var phone = data.phone
            var email = data.email
            var customer_id = await AsyncStorage.getItem('id')
            var latitude= parseFloat(lat);
            var longitude= parseFloat(lng);
            console.log("NAME : ",name);
            if (name) {
                console.log(option)
                console.log("menjalankan order")
                console.log("data order", {
                    name,
                    phone,
                    email,
                    customer_id,
                    item_name,
                    type,
                    addressInput,
                    postal_code,
                    latitude,
                    longitude
                  
                })
                // console.log("BUDI VOUCER : ",codeRedux);
                const response = await fetch('https://customer.kilapin.com/order/input', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            customer_id,
                            email,
                            phone,
                            name,
                            address: description,
                            postal_code,
                            booking_type: service,
                            service_id: itemId,
                            gross_amount: totalHarga,
                            category: 'General Cleaning',
                            notes,
                            voucher: codeRedux,
                            insurance: isInsuranceChecked,
                            time,
                            latitude,
                            longitude,
                            initial_price:harga,
                            total_price:totalHarga,
                            total_discount:discoutPrice
                            
                        }),
                    }
                );

                const data = await response.json();
                console.log('lewating input order', data)
                if (data.success===false) {
                    // Please Add Alert Here said that voucher has been claimed!
                    Alert.alert('Voucher Claimed', 'The voucher has already been claimed. Please try another one.');
                } else {
                    const data_order_id = await data.data.order_id
                    const data_url_order = await data.message


                    if (data) {
                        dispatch(ApplicationActions.onclearOrder());
                        dispatch(ApplicationActions.onAddOrder(data.data));
                        // dispatch(ApplicationActions.onclearVoucher());
                        console.log("sudah oke", data_order_id)
                        await AsyncStorage.setItem('order_id', data_order_id.toString())
                        await AsyncStorage.setItem('url', data_url_order)
                        await AsyncStorage.setItem('gross_amount', harga.toString())
                        // await AsyncStorage.setItem('address', address_code.toString())
                        await AsyncStorage.setItem('service', itemId.toString())
                        // console.log("data order", data_order_id)
                        navigation.navigate('PaymentGateway',{granit: isGraniteChecked,marble: isMarbleChecked,discount: discoutPrice});
                    } else {
                        console.log("belum oke")
                    }
                }
            } else {
                console.log("belum ada data member")
            }

        } catch (error) {
            console.error(error);
        }
    };
    const handleInsurance = (itemValue) => {
        console.log('insurance on off',itemValue)
        let insrtancePrice
        if (itemValue) {
            insrtancePrice = totalHarga + 5000
           
            setTotalHarga(insrtancePrice)            
        } else {
            insrtancePrice = totalHarga - 5000
           
            setTotalHarga(insrtancePrice)            
        }
        setInsuranceChecked(itemValue);
    }

    console.log("Temp Total : ",tempTotal);
    // console.log("Temp Test : ",test);

    return (
        <View style={styles.container}>
            <View style={styles.mainheader}>
                <View style={styles.header}>
                    <TouchableOpacity 
                    onPress={() => navigation.goBack()}>
                        <BackIcon/>
                    </TouchableOpacity>
                </View>
                <View style={styles.headertitle}>
                    <Text style={styles.title}>Order</Text>
                </View>
            </View>
            <Gap height={10}/>
            <View height='1%' width='100%' flexGrow={1} style={{
                marginBottom: wp("1%"),
                backgroundColor: '#fff',
                paddingBottom: '5%',
                paddingTop: '-15%',
                marginTop: '-3%'
            }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                    contentContainerStyle={{
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                    }}>

                    <View style={{marginTop: '-2%'}}>
                        <Text style={styles.label}>{t('complete_address')}</Text>
                        <Gap height={10}/>
                        <TextInput
                            style={styles.inputtext}
                            value={description}
                            editable={false}
                        />
                        {booking_type === 'BOOKING CLEANER' ? 
                        <View>
                        <Text style={styles.label}>Date</Text>
                        <Gap height={10}/>
                        <View
                        style={{
                            flexDirection:'row',
                            justifyContent:'space-evenly',
                            alignContent:'center',
                            alignItems:'center',
                            // borderWidth: 1.5,
                            // borderColor: '#565656',
                            // borderRadius: 30,
                        }}
                        >
                        <Picker
                            itemStyle={{justifyContent: 'center',backgroundColor:'yellow'}}
                            style={{width:'25%'}}
                            selectedValue={selectedDate}
                            onValueChange={(date) => handleDateChange(date)}
                            >
                            {date.map((date) => (
                                <Picker.Item style={{ color: '#888', fontSize: 8}} key={date} label={date} value={date} />
                            ))}
                            </Picker>
                            <Text style={{fontSize:25}}>/</Text>
                            <Picker
                            style={{width:'25%'}}
                            itemStyle={{justifyContent: 'center'}}
                            selectedValue={selectedMonth}
                            onValueChange={(month) => handleMonthChange(month)}
                            >
                            {month.map((month) => (
                                <Picker.Item style={{ color: '#888', fontSize: 8}} key={month} label={month} value={month} />
                            ))}
                        </Picker>
                        </View>
                        <Gap height={10}/>
                        <Text style={styles.label}>Time</Text>
                        <Gap height={10}/>
                        <View
                        style={{
                            flexDirection:'row',
                            justifyContent:'space-evenly',
                            alignContent:'center',
                            alignItems:'center',
                            // borderWidth: 1.5,
                            // borderColor: '#565656',
                            // borderRadius: 30,
                        }}
                        >
                        <Picker
                            itemStyle={{justifyContent: 'center',backgroundColor:'yellow'}}
                            style={{width:'25%'}}
                            selectedValue={selectedHour}
                            onValueChange={(hour) => handleHourChange(hour)}
                            >
                            {hours.map((hour) => (
                                <Picker.Item style={{ color: '#888', fontSize: 8}} key={hour} label={hour} value={hour} />
                            ))}
                            </Picker>
                            <Text style={{fontSize:25}}>:</Text>
                            <Picker
                            style={{width:'25%'}}
                            itemStyle={{justifyContent: 'center'}}
                            selectedValue={selectedMinute}
                            onValueChange={(minute) => handleMinuteChange(minute)}
                            >
                            {minutes.map((minute) => (
                                <Picker.Item style={{ color: '#888', fontSize: 8}} key={minute} label={minute} value={minute} />
                            ))}
                        </Picker>
                        </View>
                        </View> 
                        : <View></View>}
                    </View>
                    <View style={{justifyContent: 'center', marginTop: hp('0.5%')}}>
                        <View style={{marginLeft: '1%', marginRight: '1%'}}>
                            <Text style={{
                                marginTop: hp('1%'),
                                fontFamily: 'Ubuntum',
                                fontSize: 15
                            }}>{t('residence_size')}</Text>
                            <View style={{
                                height: hp('6%'),
                                borderWidth: 1.5,
                                borderColor: '#565656',
                                borderRadius: 30,
                                padding: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 10
                            }}>
                                <Picker
                                    style={{
                                        height: hp('5%'),
                                        flex: 1,
                                        paddingVertical: 5,
                                        paddingHorizontal: wp('43.5%')
                                    }}
                                    itemStyle={{justifyContent: 'flex-start'}}
                                    selectedValue={item_name}
                                    onValueChange={handlePackageChange}>
                                    <Picker.Item label={t('choose_residence_size')} value="" enabled={false}
                                                 style={{color: '#888', fontSize: 12}}/>
                                    <Picker.Item label="Apartment Size 15 - 35m2" value="15 - 35 m2"
                                                 style={{color: '#333', fontSize: 12}}/>
                                    <Picker.Item label="Apartment Size 36 - 70m2" value="36 - 70 m2"
                                                 style={{color: '#333', fontSize: 12}}/>
                                    <Picker.Item label="Apartment Size 71 - 135m2" value="71 - 135 m2"
                                                 style={{color: '#333', fontSize: 12}}/>
                                    <Picker.Item label="Apartment Size 136 - 200m2" value="136 - 200 m2"
                                                 style={{color: '#333', fontSize: 12}}/>
                                    <Picker.Item label="Apartment Size 201 - 250m2" value="201 - 250 m2"
                                                 style={{color: '#333', fontSize: 12}}/>
                                    <Picker.Item label="Apartment Size 251 - 300m2" value="251 - 300 m2"
                                                 style={{color: '#333', fontSize: 12}}/>
                                    <Picker.Item label="Apartment Size 301 - 400m2" value="301 - 400 m2"
                                                 style={{color: '#333', fontSize: 12}}/>
                                    <Picker.Item label="Apartment Size 401 - 500m2" value="401 - 500 m2"
                                                 style={{color: '#333', fontSize: 12}}/>
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <View style={[{justifyContent: 'center', alignItems: 'center'}]}>
                        <View>
                            <Text style={styles.label}>{t('note')}</Text>
                            <Gap height={10}/>
                            <TextInput onChangeText={(text) => setNotes(text)} style={styles.inputtext}
                                       placeholder={t('note')}/>
                        </View>
                        {/* Voucher */}
                        <View style={{ marginTop: '6%', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                          <Text style={{ fontFamily: 'Ubuntu', fontSize: 18, marginBottom: '0.1%' }}>Voucher</Text>
                          <View>
                            <TouchableOpacity onPress={handleVoucherPress} style={styles.inputtext2} disabled={harga===0}>
                                {
                                    codeRedux?
                                    <Text>{codeRedux}</Text>
                                    :<Text>{isOpen ? 'Close' : 'Choose'}</Text>}
                            </TouchableOpacity>
                            {/*  */}
                          </View>
                        </View>
                        {/* Voucher */}
                    </View>
                    {isOpenAddOns && (
                        <View style={{position:'absolute',top:0,bottom:0,left:0,right:0}}>
                            <TouchableOpacity
                            onPress={() => setIsOpenAddOns(false)}
                            style={{ flex: 1 }}
                            ></TouchableOpacity>
                        </View>
                    )}
                    {/* Add Ons */}
                    <View
                        style={{marginTop: '6%', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                        <Text style={{fontFamily: 'Ubuntu', fontSize: 18, marginBottom: '0.1%'}}>Add-ons</Text>
                        <View>
                            <TouchableOpacity onPress={() => setIsOpenAddOns((prevIsOpen) => !prevIsOpen)} disabled={harga===0} style={styles.inputtext2}>
                            <Text>
                              {selectedAddOns.length > 0
                                ? selectedAddOns.join(', ')
                                : isOpenAddOns
                                ? 'Close'
                                : 'Choose'}
                            </Text>
                            </TouchableOpacity>
                            {isOpenAddOns && (
                                <View style={{
                                    marginTop: '-10.5%',
                                    borderWidth: 1.5,
                                    borderTopLeftRadius: 21,
                                    borderTopRightRadius: 22,
                                    borderBottomLeftRadius: 24,
                                    borderBottomRightRadius: 24
                                }}>
                                    <TouchableOpacity onPress={() => setIsOpenAddOns((prevIsOpen) => !prevIsOpen)}
                                                      style={styles.inputtext3}>
                                    </TouchableOpacity>
                                    <View style={{
                                        borderColor: '#565656',
                                        borderTopLeftRadius: 21,
                                        borderTopRightRadius: 22,
                                        borderBottomLeftRadius: 20,
                                        borderBottomRightRadius: 20
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: '-1%'
                                        }}>
                                            <Text style={{fontFamily: 'Ubuntum'}}>Asuransi</Text>
                                            <View style={{marginHorizontal: '31%'}}></View>
                                            <View style={{marginRight: '-5.5%'}}>
                                                <CheckBox checked={isInsuranceChecked}
                                                          onPress={() => handleInsurance(!isInsuranceChecked)}/>
                                            </View>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: '-5%'
                                        }}>
                                            <Text style={{fontFamily: 'Ubuntum'}}>Lantai Marble</Text>
                                            <View style={{marginHorizontal: '26%'}}></View>
                                            <View style={{marginRight: '-5.4%'}}>
                                                <CheckBox checked={isMarbleChecked}
                                                          onPress={() => setMarbleChecked(!isMarbleChecked)}/>
                                            </View>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: '-5%'
                                        }}>
                                            <Text style={{fontFamily: 'Ubuntum'}}>Lantai Granite</Text>
                                            <View style={{marginHorizontal: '25.5%'}}></View>
                                            <View style={{marginRight: '-5.3%'}}>
                                                <CheckBox checked={isGraniteChecked}
                                                          onPress={() => setGraniteChecked(!isGraniteChecked)}/>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                    <Text style={{
                        fontFamily: 'Ubuntu',
                        fontSize: 18,
                        marginTop: '7%',
                        marginBottom: '3%'
                    }}>{t('price_summary')}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between',width: wp('90%')}}>
                        <View style={{alignItems: 'flex-start'}}>
                            <Text style={{fontFamily: 'Ubuntum'}}>{t('price_total')}</Text>
                        </View>
                        <View style={{marginHorizontal: '24.35%'}}></View>
                        <Text style={{ fontFamily: 'Ubuntum' }}>
                            {tempTotal ? `Rp. ${totalHarga}` : `Rp. ${totalHarga ? totalHarga : harga}`}
                        </Text>
                        {/* <Text style={{ fontFamily: 'Ubuntum' }}> */}
                        {/* {tempTotal
                            ? `Rp. ${totalHarga ? totalHarga : harga}`
                            : `Rp. ${totalHarga}`}
                        </Text> */}

                    </View>
                    <View style={{marginVertical: '1%'}}></View>
                    {isInsuranceChecked ?
                        <View style={{flexDirection: 'row', justifyContent: 'space-between',width: wp('90%')}}>
                            <Text style={{fontFamily: 'Ubuntum', marginTop: '2%'}}>Asuransi</Text>
                            {/* <View style={{marginHorizontal: '28.6%'}}></View> */}
                            <Text style={{fontFamily: 'Ubuntum', marginTop: '2%'}}>Rp. 5.000</Text>
                        </View> : <View style={{flexDirection: 'row', justifyContent: 'space-between',width: wp('90%')}}>
                            <Text style={{fontFamily: 'Ubuntum', marginTop: '2%'}}>Asuransi</Text>
                            {/* <View style={{marginHorizontal: '36.25%'}}></View> */}
                            <Text style={{fontFamily: 'Ubuntum', marginTop: '2%'}}>-</Text>
                        </View>}
                    {isMarbleChecked ?
                        <View style={{flexDirection: 'row', justifyContent: 'space-between',width: wp('90%')}}>
                            <Text style={{fontFamily: 'Ubuntum', marginTop: '2%'}}>Add-ons Marble</Text>
                            {/* <View style={{marginHorizontal: '22%'}}></View> */}
                            <Text style={{fontFamily: 'Ubuntum', marginTop: '2%'}}>Rp. 8.000</Text>
                        </View> : <View style={{flexDirection: 'row'}}>
                        </View>}
                    {isGraniteChecked ?
                        <View style={{flexDirection: 'row',justifyContent:'space-between',width: wp('90%')}}>
                            <Text style={{fontFamily: 'Ubuntum', marginTop: '2%'}}>Add-ons Granite</Text>
                            {/* <View style={{marginHorizontal: '20.6%'}}></View> */}
                            <Text style={{fontFamily: 'Ubuntum', marginTop: '2%'}}>Rp. 10.000</Text>
                        </View> : <View style={{flexDirection: 'row'}}>
                        </View>}
                    <View style={{marginVertical: '1%'}}></View>
                    <View style={{flexDirection: 'row',justifyContent:'space-between',width: wp('90%')}}>
                        <Text style={{fontFamily: 'Ubuntum'}}>Diskon</Text>
                        <View style={{marginHorizontal: '20%'}}></View>
                        <Text style={{fontFamily: 'Ubuntum'}}>Rp. {discoutPrice?discoutPrice:'0'}</Text>
                    </View>
                </ScrollView>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    {/* <View style={styles.pricetotal}>
                        <Text style={{color: '#fff', fontFamily: 'Ubuntu'}}>
                            Total:{' '}
                            Rp. {totalHarga}
                        </Text>
                    </View> */}
                    
                    <TouchableOpacity style={styles.confirmButton} onPress={handleOrder}>
                        <Text style={styles.confirmButtonText}>CONFIRM</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        justifyContent: 'center',
    },
    mainheader: {
        flexDirection: 'row',
        marginTop: hp('1%'),
        marginBottom: hp('1%'),
    },
    headertitle: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    title: {
        fontFamily: 'Ubuntu',
        fontSize: 24,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginLeft: wp('25%')
    },
    label: {
        fontFamily: 'Ubuntum',
        fontSize: 15,
        marginTop: 16,
        marginBottom: 2,
    },
    confirmButton: {
        backgroundColor: '#DA7DE1',
        height: 51,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 32,
        justifyContent: 'center',
        textAlign: 'center',
        width: wp('44%')
    },
    pricetotal: {
        backgroundColor: '#DA7DE1',
        height: 51,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 32,
        justifyContent: 'center',
        textAlign: 'center',
        width: wp('44%')
    },
    confirmButtonText: {
        color: '#ffffff',
        fontFamily: 'Ubuntu',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    map: {
        flex: 1,
        marginBottom: hp('-11.5%')
    },
    inputview: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    inputtext: {
        borderWidth: 1.5,
        borderColor: '#565656',
        height: 41,
        borderRadius: 30,
        width: wp('92%'),
        padding: 15,
        fontFamily: 'Ubuntur',
        fontSize: 12
    },
    inputtext2: {
        borderWidth: 1.5,
        borderColor: '#565656',
        height: 41,
        borderRadius: 30,
        width: wp('92%'),
        fontFamily: 'Ubuntur',
        justifyContent: 'center',
        alignItems: 'flex-start',
        fontSize: 12,
        marginTop: '4%',
        paddingLeft: '3%',
    },
    inputtext4: {
        borderWidth: 1.5,
        borderColor: '#565656',
        height: 41,
        borderRadius: 30,
        width: wp('92%'),
        fontFamily: 'Ubuntur',
        justifyContent: 'center',
        alignItems: 'flex-start',
        fontSize: 12,
        marginTop: '4%',
        paddingLeft: '3%',
    },
    inputtext3: {
        // borderWidth: 1.5,
        borderColor: '#565656',
        height: 41,
        borderTopLeftRadius: 21,
        borderTopRightRadius: 22,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        width: wp('92%'),
        fontFamily: 'Ubuntur',
        justifyContent: 'center',
        alignItems: 'flex-start',
        fontSize: 12,
        marginLeft: '-0.5%',
        marginTop: '-0.5%'
    },
});

export default Order;