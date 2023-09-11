import $ from 'jquery';
//import _ from 'underscore';
import Container_1 from './components/Container_1.js';

$(function(){
  
  $('.container_1').each(function(){
    new Container_1(this);
  });
  
  $('.container_3').each(function(){
    new Container_1(this);
  });
  
});
