
const { base64decode } = require('nodejs-base64');

module.exports = async (req, res) => {

  let msg = false

  if(req.params.msg && req.params.msg.length){
    msg = base64decode(req.params.msg)
  }

  res.render('error', {  page_title: 'Error', msg });
}