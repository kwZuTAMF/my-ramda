const $curryN = (n, f, xs = []) => (...ys) => {
  for (
    var i = 0, j = 0, k = n, x = xs.length, y = ys.length, a = [];
    i < x || j < y;
    i++
  ) {
    _ === (a[i] = i < x && (xs[i] !== _ || j >= y) ? xs[i] : ys[j++]) || k--
  }
  return k > 0 ? $arity(k, $curryN(n, f, a)) : f(...a)
}

export default $curryN
