import { addDays } from 'date-fns'
// import { Platform } from 'react-native'

// const getPlatformDate = (date: Date) => {
//   if(Platform.OS === 'ios') {
//     return addDays(date, 1)
//   } else {
//     return addDays(date, 1)
//   }
// }

const getPlatformDate = (date: Date) => addDays(date, 1)

export default getPlatformDate;
