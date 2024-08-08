const {PythonShell} = require('python-shell');

async function getIntents() {
  return await require('../components/intent/intent.middleware').getIntents(null);
}

function greetings() {
  return "hi";
}

function farewell() {
  return "bye";
}

function play_failure_phrase() {
  return "1";
}

module.exports.nlu = async () => {
  const intents = await getIntents();

  const options = {
    args: ['поки курама', JSON.stringify(intents)]
  };

  PythonShell.run('./src/scripts/nlu.py', options, (err, results) => {
    if (err) console.log(err);
    console.log('finished');

    console.log('results: %j', results);
  });
};
