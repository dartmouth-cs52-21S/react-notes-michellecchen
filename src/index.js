import $ from 'jquery';
import './style.scss';

function counter() {
  let num = 0;
  setInterval(() => {
    num += 1;
    $('#main').html(`You've been on this page for ${num} seconds. Please do something more worthwhile with your time.`);
  }, 1000);
}

counter();
