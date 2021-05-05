import React, { Component } from 'react';

class Table extends Component{

   
    renderTableHeader() {
        return <>
            <th>Product Name</th>
            <th>Warranty</th>
            <th>Price</th>
            <th>Action</th>
        </>
    }
    renderTableData() {
        return props.map(product => {
            const { name, warranty, price } = product; //destructuring
            return (
                <tr key={id}>
                    <td>{name}</td>
                    <td>{warranty}</td>
                    <td>{price}</td>
                    <td>{
                        <> <a href=""><i className="fa fa-pencil-square" style={{ color: 'green' }} aria-hidden="true"></i></a>
                            <a href=""><i className="fa fa-trash" style={{ color: 'red' }} aria-hidden="true"></i></a> </>
                    }</td>
                </tr>
            )
        })
    }
    render(){
    return (
        <div>
            <h1 id='title'>React Dynamic Table</h1>
            <table id='students'>
               <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
    );
    }
}


export default ManageProducts;