import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import {orderPayment} from '../../../actions/order';
import './productOrder.css';

class ProductOrder extends Component{
  constructor(){
    super();
    this.state={
      payment:{}
    }
  }
  componentWillReceiveProps = (nextProps) => {
    if(this.props.data){
      return <Redirect to={this.props.data.redirect} />
    }
  };
  handlePay(event, id){
    event.preventDefault();
    const {orderPay} = this.props;
    const data={
      id:id
    };
    orderPay(data);
  }
  
  render(){
    console.log(this.props,'propsprops')    
    if(this.props.data){
      return window.location=this.props.data.redirect;
    }
    const {order,visible,user,product,transportCost,bonus} = this.props;
    const visibility = visible?'visible':'hidden';
    return(
        <div id="myModal" className="order-modal" style={{visibility:visibility}} onClick={this.props.clicked}>
          <div className='container'>
          <div className="order-modal-content">
            <span className="close" onClick={this.props.clicked}>&times;</span>
            <h4 style={
              {
                textAlign: 'center',
                color: 'rgb(105, 102, 102)'
              }
            }>RICA Ordre d'achat</h4>
            <hr/>
            <p><strong>Noms: </strong>{user.firstName} {user.firstName}</p>
            <p><strong>Email: </strong>{user.email}</p>
            <p><strong>Produit: </strong>{product.name}</p>
            <p><strong>Quantité: </strong>{order.ordered_quantity}</p>
            <p><strong>Prix: </strong>{product.price}/unit</p>
            <p><strong>Coût de transport: </strong>{transportCost}</p>
            <p><strong>Prix ​​total: </strong>{order.amount} {order.currency}</p>
            <hr/>
          {bonus?<p>Vous recevrez un bonus de <strong>{bonus}</strong></p>:null}
            <p><strong>N.B: </strong>si vous ne payez pas dans les {product.due_time} heures la commande sera annulée</p>
            <div className='button-div'>
              <button 
              className='btn btn-secondary'
              onClick={(event)=>{this.handlePay(event,order.id)}}>
                PAYEZ
              </button>
            </div>
            <div className='button-div'>
              <button 
              className='btn btn-danger'
              onClick={this.props.clicked}>
                PLUS TARD
              </button>
            </div>
          </div>
          </div>
        </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    loading:state.payment.loading,
    paymentErrors:state.payment.orderErrors,
    data:state.payment.data,
    message:state.payment.message
  }
}
export default connect(mapStateToProps,{orderPay:orderPayment})(withRouter(ProductOrder));