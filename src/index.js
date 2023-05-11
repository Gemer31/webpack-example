import Post from '@models/Post';
import './styles/styles.css';
import "./styles/less.less";
import "./styles/scss.scss";
import json from './assets/json';
import xml from './assets/data.xml';
import * as $ from 'jquery';

const post = new Post('Post title');

$('pre').addClass("code").html(post.toString());

console.log('Post to string: ', post.toString());
console.log('JSON: ', json);
console.log('XML: ', xml);
