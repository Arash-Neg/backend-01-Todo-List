const TaskModel = require('../models/taskModel');

async function getTasks(req, res) {
  try {
    const Tasks = await TaskModel.findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(Tasks));
    res.end();
  } catch (error) {
    console.log(error);
  }
}

async function getTaskById(req, res) {
  try {
    const id = req.url.split('/')[3];
    const task = await TaskModel.findById(id);

    if (!task) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.write(
        JSON.stringify({
          message: 'Product not found',
          param: req.url.split('/')[3],
        })
      );
      res.end();
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(task));
    res.end();
  } catch (error) {
    console.log(error);
  }
}

async function create(req, res) {
  try {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      //adds the id to the product recieved from the request and saves it in product
      const task = { ...JSON.parse(body) };

      //save the product inside the json file
      const result = await TaskModel.create(task);

      //display the product
      //201 status code is write
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(result));
      res.end();
    });
  } catch (error) {
    console.log(error);
  }
}

async function update(req, res) {
  try {
    let body = '';

    //gets the route param - ID
    const id = req.url.split('/')[3];

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      //parse the data
      const parsedBody = { ...JSON.parse(body) };
      //find the product based on id
      const task = await TaskModel.findById(id);

      if (!task) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.write(
          JSON.stringify({
            message: 'Product not found',
          })
        );
        res.end();
      } else {
        //update the product in JSON file
        const result = await TaskModel.update(id, parsedBody);

        //update the view
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(result));
        res.end();
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function remove(req, res) {
  try {
    const id = req.url.split('/')[3];
    const task = await TaskModel.findById(id);

    if (!task) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.write(
        JSON.stringify({
          message: 'Product not found',
        })
      );
      res.end();
    }

    const result = await TaskModel.deleteById(id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(result));
    res.end();
  } catch (error) {
    console.log(error);
  }
}

const controllers = {
  getTasks,
  getTaskById,
  create,
  update,
  remove,
};

module.exports = controllers;
