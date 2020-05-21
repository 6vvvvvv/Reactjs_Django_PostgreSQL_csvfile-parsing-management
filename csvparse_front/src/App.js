import React, { Component } from "react";
import "./App.css";
import * as Papa from "papaparse";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donnee: [],
      date: [],
      description: [],
      total: [],
      temp: "",
      isshow: false,
    };
  }

  // test backend preloading
  // componentDidMount() {
  //   this.frombackend();
  // }

  // frombackend = () => {
  //   axios
  //     .get("http://localhost:8000/csvtable/tableserializer/")
  //     .then((res) => {
  //       console.log(res);
  //       this.setState({ temp: res.data[0].description });
  //     })
  //     .catch((err) => console.log(err));
  // };

  //https://stackoverflow.com/questions/31045716/react-this-setstate-is-not-a-function
  //The callback is made in a different context. You need to bind to this in order to have access inside the callback:
  onChangeParse = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
      //log test
      console.log("content in the file:", e.target.result);

      let data = e.target.result;
      Papa.parse(data, {
        // defaut header=false means result returns as a dict
        // header: true,
        complete: (results) => {
          //log test
          console.log("Finished:", results.data);

          let lg = results.data.length;
          //log test
          console.log("the length of data:", lg);

          //********************************* i->[0,lg)
          for (let i = 0; i < lg; i++) {
            this.state.date.push(results.data[i][0]);
            this.state.description.push(results.data[i][1]);
            this.state.total.push(results.data[i][2]);
          }

          this.setState({
            donnee: results.data,
            isshow: true,
          });
        },
      });
    };

    reader.readAsText(file);

    //log test
    console.log("now the date list:", this.state.date);
    console.log("now the descrition list:", this.state.description);
    console.log("now the total list:", this.state.total);
    console.log("now the temp string:", this.state.temp);
  };

  // onDelete = (id) => {
  //   //frontview delete
  //   this.setState((prevState) => ({
  //     donnee: prevState.donnee.filter((el) => {
  //       return el[2] !== id[2];
  //     }),
  //   }));

  //   //database delete
  //   console.log(this.state.donnee);
  //   //************************* */
  //   const delfrombackdata = {
  //     date: id[0],
  //     description: id[1],
  //     total: id[2],
  //   };

  //   const API_DEL = "http://localhost:8000/csvtable/api/delfromdb/";
  //   axios
  //     .delete(API_DEL, delfrombackdata, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       alert(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //       alert(err.response.data);
  //     });
  // };

  onClickSavetobackend = (id) => {
    // e.preventDefault();
    //log test
    console.log("click to save one");
    const API_URL = "http://localhost:8000/csvtable/api/savetodb/";

    const onetobackdata = {
      date: id[0],
      description: id[1],
      total: id[2],
    };

    console.log(onetobackdata);
    axios
      .post(API_URL, onetobackdata, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data);
      });
  };

  onClickSaveAlltobackend = (e) => {
    e.preventDefault();
    //log test
    console.log("click to save all");
    const API_URL = "http://localhost:8000/csvtable/api/savetodb/";

    //log test
    console.log("now the state is:", this.state.date);
    console.log(typeof this.state.date);

    const date = this.state.date;
    const description = this.state.description;
    const total = this.state.total;
    const len = this.state.date.length;

    for (let i = 1; i < len; i++) {
      let alltobackdata = {
        date: date[i],
        description: description[i],
        total: total[i],
      };

      axios
        .post(API_URL, alltobackdata, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response);
          alert(err.response.data);
        });
    }
  };

  render() {
    const titleTemp = this.state.donnee.slice(0, 1);
    const title = titleTemp.map((item, id) => {
      return (
        <thead>
          <tr>
            <th>Id</th>
            <th key={id}>{item[0]}</th>
            <th key={id}>{item[1]}</th>
            <th key={id}>{item[2]}</th>
          </tr>
        </thead>
      );
    });

    const bodyTemp = this.state.donnee.slice(1);
    const body = bodyTemp.map((item, id) => {
      return (
        <tbody>
          <tr key={id}>
            <td>{id}</td>
            <td>{item[0]}</td>
            <td>{item[1]}</td>
            <td>{item[2]}</td>

            <button
              className="button"
              onClick={() => this.onClickSavetobackend(item)}
            >
              Save
            </button>
          </tr>
        </tbody>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            {" "}
            <input
              type="file"
              accept=".csv"
              id="file"
              className="inputfile"
              onChange={this.onChangeParse}
            ></input>
          </div>
        </div>

        {/* test backend preloading */}
        {/* <p>{this.state.temp}</p> */}

        <div>
          {this.state.isshow ? (
            <button
              className="saveallbutton"
              type="submit"
              onClick={this.onClickSaveAlltobackend}
            >
              Save All
            </button>
          ) : null}
        </div>

        <div className="col s12">
          <table>
            {title}
            {body}
          </table>
        </div>
      </div>
    );
  }
}

export default App;
