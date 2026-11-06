// read-sessions.cjs
async function main() {
    const {PuttyProfileSource} = await import('@jalsoedesign/putty-core');

    const source = await PuttyProfileSource.fromFile(process.argv[2] ?? './sessions.reg');

    const profiles = source.list();
    const selected = source.get('Demo');

    if (!selected) {
        throw new Error('The demo profile is missing');
    }

    console.log('Profiles: ' + profiles.length);
    console.log('Selected: ' + selected.path);

    for (const connection of selected.connections) {
        console.log(connection.id + ': ' + connection.protocol + ' ' + connection.endpoint.host + ':' + connection.endpoint.port);
    }

    console.log('Host matches: ' + source.search('127.0.0.1', {fields: 'all'}).length);
    console.log('Metadata only: no server connection.');
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
