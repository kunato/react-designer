import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import {Rect, Vector, Text} from '../src/objects';
import classes from './App.module'

import MondrianExample from './components/Mondrian';
import MalevichExample from './components/Malevich';
import SwissStyleExample from './components/SwissStyle';
import MockupDesignerExample from './components/MockupDesigner';
import TshirtDesignerExample from './components/TshirtDesigner';


export default class App extends Component {
  render() {
    return (<div><MalevichExample /></div>
    );
  }
}
