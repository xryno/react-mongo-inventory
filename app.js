require('dotenv').config({ path: './config.env'});

const express = require("express");
const cors = require('cors');
const dbo = require('./server/db/conn');
// const { config } = require('dotenv');
const app = express();
const PORT = process.env.PORT || 3000
const ObjectId = require('mongodb').ObjectId
// const { Item } = require("./models/item")

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Global error handling
// app.use(function (err, _req, res) {
//   console.error(err.stack);
//   res.sendStatus(500)
// });



dbo.connectToServer(function (err) {
    if (err) {
      console.error(err);
      process.exit();
    }
})


//Allow CORS requests




app.get('/allitems', async function (_req, res) {
    const dbConnect = dbo.getDb();
  
    dbConnect
      .collection('product_list')
      .find({})
      // .limit(50)
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send('Error fetching listings!');
        } else {
      
          res.json(result);
        }
      });
  });



  app.get("/item/:id", async(req, res) => {

    const dbConnect = dbo.getDb();

    dbConnect
    .collection('product_list')
    .findOne({_id: new ObjectId (req.params.id)},
    function (err, result) {
      if (err) {
        res.status(400).send('Item not found');
      } else {
        console.log(result)
        res.json(result);
      }
    
  })

})

app.post("/", async (req, res) => {

    const { title, price, description, category, imageurl} = req.body

    const dbConnect = dbo.getDb();

    dbConnect
    .collection('product_list')
    .insertOne(req.body)

    res.sendStatus(200)
})


app.put("/", async (req, res) => {
  console.log(typeof req.body.id)
  console.log(req.body.id)

  const dbConnect = dbo.getDb();

 await dbConnect
  .collection('product_list')
  .updateOne({_id: new ObjectId (req.body.id)}, 
  {$set: req.body},

  res.sendStatus(200)
  )

    })

    app.delete("/:id", async (req, res) => {

  const dbConnect = dbo.getDb();

  await dbConnect
   .collection('product_list')
   .deleteOne({_id: new ObjectId (req.params.id)},
   
 
   res.sendStatus(200)
   )
})

//get all items


// app.get("/allitems", async(req, res) =>{

//     const allitems = await Item.findAll();
    
//     res.send(allitems)
// })

//get one item by ID

// app.get("/item/:id", async(req, res) => {

//     const item = await Item.findOne({
//         where: {
//             id: req.params.id
//         }
//     })
//     res.send(item)
// })

// app.post("/", async (req, res) => {

//     const { title, price, description, category, imageurl} = req.body

//     const item = await Item.create({

//             title: title,
//             price: price,
//             description: description,
//             category: category,
//             image: imageurl

//     })

//     res.sendStatus(200)


// })

// app.delete("/:id", async (req, res) => {
//     const item = await Item.destroy ({
//         where: {
//             id: req.params.id
//         }
//     })

// })







app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}.`)
})
