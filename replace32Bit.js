function replace32Bit(str){
  let newStr = ''
  function is32Bit(c) {
    return c.codePointAt(0) > 0xffff
  }
  for (let ch of str){
    if (!is32Bit(ch)) {
      newStr += ch
    } else {
      newStr += '□'
    }
  }
  return newStr
}
