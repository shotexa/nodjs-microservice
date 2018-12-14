
var _send = function (res, err, data, status) {
  if (res.finished) return
  else if (!err) return res.status(status || 200).send(data)

  console.log(err)
  res.status(status || 500).send(err)
}



module.exports = {
  send: _send
}

