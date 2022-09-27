
const router = require('./express').express.Router();
require('dotenv').config();
const controllers = require('./controlles/index');
const userController = controllers.user;
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
let CostModel = require('./models/cost');


router.post('/', jsonParser, async(req, res) => {
    const bodyContent = req.body;
    userController.addUser(bodyContent, res);
});

router.get('/costs/', async(req, res) => {
    await userController.getCosts(req, res);
});

router.get('/report', async(req, res) => {
    await userController.getUsersExpensesReportByMonth(req, res);
});

router.get('/:id', async(req, res) => {
    try {
        res.status(200);
        return res.send(await userController.getUserById(req, res, null));
    } catch (err) {
      res.status(500);
      res.send(err);
    }
});

router.get('/', async(req, res) => {
    return res.send(await userController.getUsers(req, res));
});

router.post('/:id/costs', jsonParser, async(req, res) => {
    try {
        req.body.user_id = req.params.id;
        const costModel = new CostModel(req.body);
        console.log(costModel);
        let cost = await userController.addCost(costModel);
        console.log('saved cost');
        let user = await userController.getUserById(req.params.id, res, null);
        console.log('find user ', user);
        user.costs.push(cost._id);
        await user.save();
        console.log('saved user cost');
        res.status(201);
        return res.send(cost);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
});

exports.router = router;
