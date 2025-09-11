import chai from 'chai';
import chaiDom from 'chai-dom';
import './chai.types';
import chaiPlugin from './chaiPlugin';

chai.use(chaiDom);
chai.use(chaiPlugin);
