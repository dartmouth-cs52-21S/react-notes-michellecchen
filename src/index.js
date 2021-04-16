import $ from 'jquery';
import './style.scss';

function counter() {
    let num = 0;
    setInterval(function() {
        num++;
        $('#main').html(`You've been on this page for ${num} seconds. Please do something more worthwhile with your time.`);
    }, 1000);
}

counter();