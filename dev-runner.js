import concurrently from 'concurrently';

const { result } = concurrently([
    { command: 'npm run dev', name: 'frontend', prefixColor: 'blue' },
    { command: 'node src/server/index.js', name: 'backend', prefixColor: 'green' }
], {
    prefix: 'name',
    killOthers: ['failure', 'success'],
});

result.then(() => {
    console.log('Processes closed');
}, (err) => {
    console.error('Processes excited with error', err);
});
