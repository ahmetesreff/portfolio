// JSON.parse'ın hata mesajı tarayıcıya göre değişiyor ve Chrome çoğu durumda konum vermiyor.
// Bu küçük doğrulayıcı ilk sözdizimi hatasının karakter indeksini bulur (geçerliyse -1).
const NUMBER = /-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/y

export const jsonErrorIndex = (s) => {
  let i = 0
  const fail = () => { throw i }
  const ws = () => { while (i < s.length && ' \t\n\r'.includes(s[i])) i++ }
  const literal = (word) => { if (s.startsWith(word, i)) i += word.length; else fail() }
  const string = () => {
    i++
    while (i < s.length) {
      const c = s[i]
      if (c === '"') { i++; return }
      if (c === '\\') {
        i++
        if (s[i] === 'u') {
          if (!/^[0-9a-fA-F]{4}$/.test(s.slice(i + 1, i + 5))) fail()
          i += 5
        } else if ('"\\/bfnrt'.includes(s[i]) && i < s.length) i++
        else fail()
      } else if (c < ' ') fail()
      else i++
    }
    fail()
  }
  const number = () => {
    NUMBER.lastIndex = i
    const m = NUMBER.exec(s)
    if (!m) fail()
    i += m[0].length
  }
  const value = () => {
    ws()
    const c = s[i]
    if (c === '{') {
      i++; ws()
      if (s[i] === '}') { i++; return }
      for (;;) {
        ws()
        if (s[i] !== '"') fail()
        string(); ws()
        if (s[i] !== ':') fail()
        i++; value(); ws()
        if (s[i] === ',') { i++; continue }
        if (s[i] === '}') { i++; return }
        fail()
      }
    }
    if (c === '[') {
      i++; ws()
      if (s[i] === ']') { i++; return }
      for (;;) {
        value(); ws()
        if (s[i] === ',') { i++; continue }
        if (s[i] === ']') { i++; return }
        fail()
      }
    }
    if (c === '"') return string()
    if (c === 't') return literal('true')
    if (c === 'f') return literal('false')
    if (c === 'n') return literal('null')
    if (c === '-' || (c >= '0' && c <= '9')) return number()
    fail()
  }
  try {
    value(); ws()
    if (i < s.length) fail()
    return -1
  } catch (pos) {
    return typeof pos === 'number' ? pos : -1   // ör. çok derin iç içe yapı: konum bilinmiyor
  }
}

export const lineColumn = (s, index) => {
  const before = s.slice(0, index)
  return { line: before.split('\n').length, col: index - before.lastIndexOf('\n') }
}
