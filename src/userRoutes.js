
const router = require('./express').express.Router()
require('dotenv').config()
const controllers = require('./controlles/index')
const userController = controllers.user
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var CostModel = require('./models/cost')


router.post('/', jsonParser, async function (req, res) {
  const bodyContent = req.body;
  userController.addUser(bodyContent, res)
});

router.get('/costs/', async function (req, res) {
  await userController.getCosts(req, res)
})

router.get('/report', async function (req, res) {
  await userController.getUsersExpensesReportByMonth(req,res)
})

router.get('/:id', async function (req, res) {
  try {
    res.status(200)
    return res.send(await userController.getUserById(req, res, null))
  } catch (err) {
  }
});

router.get('/', async function (req, res) { return res.send(await userController.getUsers(req, res)) })

router.post('/:id/costs', jsonParser, async function (req, res) {
  try {
    req.body.user_id = req.params.id;
    const costModel = new CostModel(req.body);
    console.log(costModel)
    var cost = await userController.addCost(costModel)
    console.log('saved cost')
    var user = await userController.getUserById(req.params.id, res, null)
    console.log('find user ', user)
    user.costs.push(cost._id)
    await user.save()
    console.log('saved user cost')
    res.status(201)
    return res.send(cost)
  }
  catch (err) {
    res.status(500)
    res.send(err)
  }
});

exports.router = router;
