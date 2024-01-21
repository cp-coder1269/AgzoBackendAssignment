const express = require("express");
const bodyParser = require('body-parser');
const CalculatorList = require('./calculatorList');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const calculatorList = new CalculatorList();

app.post('/api/init', (req, res) => {
  const { operator, num1, num2 } = req.body;
  try {
    const result = calculatorList.init(operator, num1, num2);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/operation', (req, res) => {
  const { operator, num , id} = req.body;
  try {
    const result = calculatorList.performOperation(operator, num, id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/undo', (req, res) => {
  const { id } = req.body;
  try {
    const result = calculatorList.undo(id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/reset', (req, res) => {
  const { id } = req.query;
  try {
    const result = calculatorList.reset(id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.listen(PORT, function() {
    console.log(`server is running at PORT ${PORT}`);
});