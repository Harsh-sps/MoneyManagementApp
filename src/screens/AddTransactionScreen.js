import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TopHeader} from './Transaction';
import CommonTextInput from '../components/CommonTextField';

const AmountComponent = () => {
  return (
    <View style={styles.amountView}>
      <Text style={styles.amountTitle}>How much?</Text>
      <Text style={styles.amount}>₹ 980000</Text>
    </View>
  );
};

const TagWithBackground = ({title, style}) => {
  return (
    <TouchableOpacity style={style}>
      <Text style={styles.tagText}>{title}</Text>
    </TouchableOpacity>
  );
};

const AddTransactionInfo = () => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [pickDate, setPickDate] = useState('');
  return (
    <View style={styles.transactionInfoView}>
      <CommonTextInput
        placeholderText="Category"
        styles={styles.textField}
        data={category}
        onChangeData={setCategory}
      />
      <CommonTextInput
        placeholderText="Description"
        styles={styles.textField}
        data={description}
        onChangeData={setDescription}
      />

      <View style={styles.tagParentView}>
        <TagWithBackground
          title={'Income'}
          style={[styles.tagView, styles.incomeBg]}
        />
        <TagWithBackground
          title={'Expenses'}
          style={[styles.tagView, styles.expensesBg]}
        />
      </View>

      <CommonTextInput
        placeholderText="Pick your date"
        styles={styles.textField}
        data={pickDate}
        onChangeData={setPickDate}
      />
    </View>
  );
};

const ContinueButton = () => {
  return (
    <TouchableOpacity style={styles.buttonView} activeOpacity={0.8}>
      <Text style={styles.buttonText}>Continue</Text>
    </TouchableOpacity>
  );
};

const AddTransactionScreen = ({route, navigation}) => {
  return (
    <ScrollView>
      <View style={styles.parentView}>
        <TopHeader navigation={navigation} title={'Add Transaction'} />
        <AmountComponent />
        <AddTransactionInfo />
        <ContinueButton />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  parentView: {
    backgroundColor: '#FFF6E5',
    flex: 1,
  },
  amountView: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  amountTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0A0000',
    opacity: 0.6,
  },
  amount: {
    fontWeight: '600',
    fontSize: 40,
    color: '#0F0000',
    marginTop: 20,
  },
  transactionInfoView: {
    backgroundColor: 'white',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    marginTop: 30,
    paddingBottom: 30,
  },
  textField: {
    borderRadius: 16,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 30,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    color: 'black',
    height: 57,
  },
  tagView: {
    borderRadius: 10,
  },
  incomeBg: {
    backgroundColor: '#00A86B',
    marginEnd: 5,
  },
  expensesBg: {
    backgroundColor: '#FD3C4A',
    marginStart: 5,
  },
  tagText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  tagParentView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonView: {
    height: 56,
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#7F3DFF',
    marginHorizontal: 10,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FCFCFC',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AddTransactionScreen;
