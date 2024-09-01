import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Dropdown} from 'react-native-element-dropdown';
import Snackbar from 'react-native-snackbar';
import CommonTextInput from '../components/CommonTextField';
import {EXPENSES, INCOME} from '../constants/Categories';
import {initDatabase, insertTransaction} from '../database/Database';
import {TopHeader} from './Transaction';
import {combineIncomeAndExpenses} from '../constants/IncomeAndExpenses';
import {useDispatch, useSelector} from 'react-redux';

const AmountComponent = ({totalAmount}) => {
  return (
    <View style={styles.amountView}>
      <Text style={styles.amountTitle}>How much?</Text>
      <Text style={styles.amount}>₹ {totalAmount}</Text>
    </View>
  );
};

const TagWithBackground = ({title, style, onPress}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={styles.tagText}>{title}</Text>
    </TouchableOpacity>
  );
};

const AddTransactionInfo = ({navigation, totalAmount}) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [tag, setTag] = useState('income');
  const incomeAndExpenses = tag === 'expenses' ? EXPENSES : INCOME;
  const [category, setCategory] = useState(null);
  const [open, setOpen] = useState(false);

  const clearData = () => {
    setAmount('');
    setDescription('');
    setDate(new Date());
    setTag('income');
    setCategory(null);
    setOpen(false);
  };

  const handleAddTransaction = async () => {
    if (amount && tag === 'expenses' && amount > totalAmount) {
      Snackbar.show({
        text: 'Oops! You do not have enough amount for this transaction.',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (description && tag && category && date && amount) {
      const color = category.categoriesColor;
      const finalCategory = category.categories;
      const transaction = {
        finalCategory,
        color,
        tag,
        date,
        description,
        amount,
      };
      await initDatabase();
      await insertTransaction(transaction);
      Snackbar.show({
        text: 'Transaction has been added.',
        duration: Snackbar.LENGTH_SHORT,
      });
      clearData();
    } else {
      Snackbar.show({
        text: 'Please fill all the necessary information.',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  return (
    <View>
      <View style={styles.transactionInfoView}>
        <DropdownComponent
          data={incomeAndExpenses}
          value={category}
          setValue={setCategory}
        />

        <CommonTextInput
          placeholderText="Description"
          styles={styles.textField}
          data={description}
          onChangeData={setDescription}
        />

        <CommonTextInput
          placeholderText="Amount"
          styles={styles.textField}
          data={amount}
          onChangeData={setAmount}
          keyboardType="number-pad"
        />

        <View style={styles.tagParentView}>
          <TagWithBackground
            title={'Income'}
            style={[
              styles.tagView,
              styles.incomeBg,
              tag === 'income' ? styles.selectedTag : null,
            ]}
            onPress={() => {
              setTag('income');
            }}
          />
          <TagWithBackground
            title={'Expenses'}
            style={[
              styles.tagView,
              styles.expensesBg,
              tag === 'expenses' ? styles.selectedTag : null,
            ]}
            onPress={() => {
              setTag('expenses');
            }}
          />
        </View>

        <CommonTextInput
          placeholderText="Pick your date"
          styles={styles.textField}
          data={date.toLocaleString()}
          onChangeData={setDate}
          readOnly={true}
          onPress={() => setOpen(true)}
        />
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>

      <ContinueButton onPress={handleAddTransaction} />
    </View>
  );
};

const ContinueButton = ({onPress}) => {
  return (
    <TouchableOpacity
      style={styles.buttonView}
      activeOpacity={0.8}
      onPress={onPress}>
      <Text style={styles.buttonText}>Continue</Text>
    </TouchableOpacity>
  );
};

const DropdownComponent = ({data, value, setValue}) => {
  return (
    <Dropdown
      style={[styles.textField]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="categories"
      valueField="id"
      placeholder={'Category'}
      searchPlaceholder="Search "
      value={value}
      onChange={setValue}
    />
  );
};

const AddTransactionScreen = ({route, navigation}) => {
  const transactions = useSelector(state => state.transactions);
  const {totalIncome, totalExpenses} = combineIncomeAndExpenses(transactions);
  const totalAmount = totalIncome - totalExpenses;
  return (
    <ScrollView>
      <View style={styles.parentView}>
        <TopHeader navigation={navigation} title={'Add Transaction'} />
        <AmountComponent totalAmount={totalAmount} />
        <AddTransactionInfo navigation={navigation} totalAmount={totalAmount} />
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
  selectedTag: {
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagView: {
    borderRadius: 10,
  },
  incomeBg: {
    backgroundColor: '#00A86B',
    marginEnd: 5,
    height: 35,
  },
  expensesBg: {
    backgroundColor: '#FD3C4A',
    marginStart: 5,
    height: 35,
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
    alignItems: 'center',
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
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#91919F',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: 'black',
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  inputSearchStyle: {
    height: 50,
    fontSize: 16,
  },
});

export default AddTransactionScreen;
