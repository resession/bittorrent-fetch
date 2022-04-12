const tape = require('tape')
const FormData = require('form-data')
const fs = require('fs')
const makeFetch = require('./index')

// tape('Get a torrent', async (test) => {
//     const fetch = makeFetch()
//     const getTorrent = await fetch('bt://5CA4F065CC01D026112D4DED520D3E46D0F1CD65/')
//     test.equal(await getTorrent.text(), '["/If She Knew by Blake Pierce.epub","/free audiobook version.txt"]', 'Got the torrent')
// })

tape('Put a torrent', async (test) => {
    const fetch = makeFetch()
    const form = new FormData()
    form.append('my_field', 'my value');
    form.append('my_file', fs.createReadStream('./test/1649109058340.png'));
    form.on('readable', async () => {
        const getTorrent = await fetch('bt://testtorrent', {method: 'PUT', headers: {'X-Update': 'false', ...form.getHeaders()}, body: form})
        console.log(await getTorrent.text())
    })
    // test.equal(await getTorrent.text(), '["/If She Knew by Blake Pierce.epub","/free audiobook version.txt"]', 'Got the torrent')
})