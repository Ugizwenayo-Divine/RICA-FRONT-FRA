import React,{Component} from 'react';
import Image from 'react-image-resizer';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import advertisement from '../../../../actions/landing/advertisement';
import AdvertsSkeleton from './externalAdvertSkeleton';
import './externalAdvertisement.css';

const {
    externalAdvertisement,
} = advertisement;
class ExternaAdvertisement extends Component {
  constructor(){
    super();
    this.state={
      advertisementIndex:0,
    }
  }
  componentDidMount(){
    const {externalAdvertisement, advertisements} = this.props;
    if(advertisements.length === 0){
      externalAdvertisement();
    }
  }
  handleNext = () => {
    const {advertisements} = this.props;
    if(this.state.advertisementIndex === advertisements.length-1)
    {
      this.setState({advertisementIndex:0});
    }
    else{
      this.setState({advertisementIndex:this.state.advertisementIndex+1});
    }
  }
  handlePrevious = () => {
    const {advertisements} = this.props;
    if(this.state.advertisementIndex === 0)
    {
      this.setState({advertisementIndex:advertisements.length-1});
    }
    else{
      this.setState({advertisementIndex:this.state.advertisementIndex-1});
    }
  }
  render(){
    const {advertisements,loading} = this.props;
    const spanColor = loading?'#f0f0f0e7':'grey';
    const style = {
      image: {
        marginLeft:'auto',
        marginRight:'auto'
      },
    };
    return (
      <div className='all-externalAdverts'>
        <h3 style={{color:spanColor}}>Publicité</h3>
        <span className='previous' style={{color:spanColor}} onClick={this.handlePrevious}><FontAwesomeIcon icon={faChevronCircleLeft}/></span>
        {!loading&&advertisements.length!==0?
        <div className='one-externalAdverts'>
          <h4>{advertisements[this.state.advertisementIndex].title}</h4>
          <div style={{fontWeight:'500'}}>{advertisements[this.state.advertisementIndex].description}</div>
          <div className='image-externalAdverts'>
          <Image
            src={`${advertisements[this.state.advertisementIndex].image}`}
            width={120}
            height={120}
            style={style.image}
          />
                </div>
        </div> :<AdvertsSkeleton/>}
        <span className='next' style={{color:spanColor}} onClick={this.handleNext}><FontAwesomeIcon icon={faChevronCircleRight}/></span>
      </div>
    );

  }
}
const mapStateToProps = (state) => {
  return {
    loading:state.externalAdvertisement.loading,
    advertisementErrors: state.externalAdvertisement.advertisementErrors,
    message:state.externalAdvertisement.message,
    advertisements:state.externalAdvertisement.advertisements
  }
};
export default connect(mapStateToProps,{externalAdvertisement})(ExternaAdvertisement);