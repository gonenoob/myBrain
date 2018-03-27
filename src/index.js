/**
 * 入口
 */
import 'normalize.css/normalize.css'
import './index.less'

import brain from 'brain.js'
import $ from 'jquery'

import trainingData from './trainingData'

let trainedNet;

function encode(arg) {
  return arg.split('').map(x => (x.charCodeAt(0) / 256));
}

function processTrainingData(data) {
  return data.map(d => {
    return {
      input: encode(d.input),
      output: d.output
    }
  })
}

function train(data) {
  let net = new brain.NeuralNetwork();
  net.train(processTrainingData(data));
  trainedNet = net.toFunction();
}

function execute(input) {
  let results = trainedNet(encode(input));
  let trans = getMaxValueKey(results)

  return "I'm " + Math.floor(trans.v * 100) + "% sure that tweet was written by " + trans.k
}

function getMaxValueKey(obj={}) {
  let reverseObj = {}
  Object.keys(obj).map(k => {
    reverseObj[obj[k]] = k
  })

  let max = Math.max(...Object.keys(reverseObj))

  return {
    k: reverseObj[max],
    v: max
  }
}

train(trainingData);
console.log(execute("Paste your tweet here"));

$('body').append(execute("Paste your tweet here"))