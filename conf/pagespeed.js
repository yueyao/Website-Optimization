/**
 * Created by hebo on 2017/6/21.
 */

/* eslint-disable */

process.stdin.resume();
process.stdin.setEncoding('utf8');

var ngrok = require('ngrok');
var psi = require('psi');

log('\nStarting ngrok tunnel');

startTunnel(runPsi);

function runPsi(url) {
  log('\nStarting PageSpeed Insights');
  psi.output(url, function(err) {
    process.exit(0);
  });
}

function startTunnel(cb) {
  ngrok.connect(3006, function (err, url) {
    if (err) {
      log('ERROR\n' + err);
      process.exit(0);
    }
    log('\nServing tunnel from: ' + url);
    cb(url);
  });
}

function log(string) {
  process.stdout.write(string);
}
