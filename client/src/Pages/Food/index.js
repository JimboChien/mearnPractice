import React, { Component } from "react";
import Axios from "axios";

export class Food extends Component {
  state = {
    foodName: "",
    newFoodName: "",
    days: 0,
    foodList: [],
  };

  componentDidMount() {
    this.getFood();
  }

  addToList = () => {
    Axios.post("/insert", {
      foodName: this.state.foodName,
      days: this.state.days,
    }).then(() => {
      this.getFood();
    });
  };

  getFood = () => {
    Axios.get("/read").then((response) => {
      this.setState({ foodList: response.data });
    });
  };

  updateFood = (id) => {
    Axios.put("/update", {
      id: id,
      newFoodName: this.state.newFoodName,
    }).then(() => {
      this.getFood();
    });
  };

  deleteFood = (id) => {
    Axios.delete(`/delete/${id}`).then(() => {
      this.getFood();
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Test</h1>
        <label>Food Name:</label>
        <input
          type="text"
          onChange={(event) => {
            this.setState({ foodName: event.target.value });
          }}
        />
        <label>Days Since You Ait it:</label>
        <input
          type="number"
          onChange={(event) => {
            this.setState({ days: event.target.value });
          }}
        />
        <button onClick={() => this.addToList()}>Add</button>

        <h1>Food List</h1>

        {this.state.foodList.map((val) => {
          return (
            <div
              style={{ border: "2px solid", width: "500px", margin: "20px" }}
            >
              <h1>{val.foodName}</h1>
              <h1>{val.daysSinceIAte}</h1>
              <input
                type="text"
                placeholder="New Food Name..."
                onChange={(event) => {
                  this.setState({
                    newFoodName: event.target.value,
                  });
                }}
              />
              <button onClick={() => this.updateFood(val._id)}>Update</button>
              <button onClick={() => this.deleteFood(val._id)}>Delete</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Food;
