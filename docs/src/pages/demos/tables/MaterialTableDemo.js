/* eslint-disable no-unused-vars */

import React, { Component } from "react";
import MaterialTable from "material-table";

export default class MaterialTableDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { title: "Name", field: "name" },
        { title: "Surname", field: "surname" },
        { title: "Birth Year", field: "birthYear", type: "numeric" },
        {
          title: "Birth Place",
          field: "birthCity",
          lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
        }
      ],
      data: [
        { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
        {
          name: "Zerya Betül",
          surname: "Baran",
          birthYear: 2017,
          birthCity: 34
        }
      ]
    };
  }

  render() {
    return (
      <MaterialTable
        title="Editable Example"
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const data = this.state.data;
                data.push(newData);
                this.setState({ data }, () => resolve());
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const data = this.state.data;
                const index = data.indexOf(oldData);
                data[index] = newData;
                this.setState({ data }, () => resolve());
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                let data = this.state.data;
                const index = data.indexOf(oldData);
                data.splice(index, 1);
                this.setState({ data }, () => resolve());
              }, 600);
            })
        }}
      />
    );
  }
}
