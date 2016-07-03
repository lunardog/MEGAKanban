module.export = {
  natural: function() {
    let rnd = 0
    for (let i=0; i<5; i++) {rnd += Math.random()*2 - 1 }
    return rnd / 5
  }
}
