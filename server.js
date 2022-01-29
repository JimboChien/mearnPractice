const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

const FoodModel = require("./models/Food");
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://marine:jimbo851130@balancedb.a46kv.mongodb.net/food?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;

  const food = new FoodModel({
    foodName: foodName,
    daysSinceIAte: days,
  });

  try {
    await food.save();
    res.send("inserted data!");
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.put("/update", async (req, res) => {
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;

  try {
    await FoodModel.findById(id, (err, updateFood) => {
      updateFood.foodName = newFoodName;
      updateFood.save();
      res.send("update!");
    }).clone();
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await FoodModel.findByIdAndRemove(id).exec();
  res.send("delete!");
});

// Server production assests
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join("client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port} ...`);
});
