import Post from './Post';
import WebpackLogoPng from './assets/webpack-logo.png'
import './styles/styles.css';
import json from "./assets/json.json"

const post = new Post("Post title", WebpackLogoPng);
console.log("Post to string: ", post.toString());
console.log("JSON: ", json);