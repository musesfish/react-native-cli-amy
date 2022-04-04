const isPhoneNumber = phoneNumber => {
  const reg = /^1[3456789]\d{9}$/
  return reg.test(phoneNumber)
}

const isPassWord = passWord => {
  const reg = /^[a-zA-Z0-9]{6,18}$/
  return reg.test(passWord)
}

const isNumber = val => {
  const regPos = /^\d+(\.\d+)?$/ // 非负浮点数
  const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ // 负浮点数
  if (regPos.test(val) || regNeg.test(val)) {
    return true
  } else {
    return false
  }
}

const dataVerify = (data, type) => {
  let newData
  if (data === null || data === undefined) {
    if (type === 'array') {
      newData = []
    } else if (type === 'object') {
      newData = ''
    }
    return newData
  } else {
    return data
  }
}

const randomString = (length, chars) => {
  let result = ''
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

const getDateStr = AddDayCount => {
  const date = new Date()
  date.setDate(date.getDate() + AddDayCount) // 获取AddDayCount天后的日期
  const year = date.getFullYear()
  const mon = date.getMonth() // 获取当前月份的日期
  const day = date.getDate()
  const result = {
    year,
    mon,
    day,
  }
  return result
}

export default {
  getDateStr,
  isNumber,
  isPhoneNumber,
  randomString,
  dataVerify,
  isPassWord,
}
