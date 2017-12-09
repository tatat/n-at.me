const path = require('path')
const { spawn } = require('child_process')
const NodeSSH = require('node-ssh')

const HOSTNAME = 'n-at.me'
const SOURCE_DIR = path.join(__dirname, '../', 'dist')
const DEPLOY_TO = '/srv/apps/n-at.me'

const build = () => {
  return new Promise((resolve, reject) => {
    const cp = spawn('npm', ['run', 'build'], { stdio: 'inherit' })
    cp.on('error', error => reject(error))
    cp.on('close', () => resolve())
  })
}

const deploy = () => {
  const ssh = new NodeSSH()
  const releasesDir = `${ DEPLOY_TO }/releases`
  const currentDir = `${ DEPLOY_TO }/current`
  const timestamp = String(Math.round(Date.now() / 1000))
  const currentReleaseDir = `${ releasesDir }/${ timestamp }`

  return ssh.connect({
    host: HOSTNAME,
    username: process.env['USER'],
    agent: process.env['SSH_AUTH_SOCK']
  }).then(() => {
    return ssh.exec('mkdir', ['-p', `${ releasesDir }`])
  }).then(() => {
    const succeeded = []
    const failed = []

    console.log('uploading...')

    return ssh.putDirectory(SOURCE_DIR, `${ currentReleaseDir }/public`, {
      recursive: true,
      concurrency: 1,
      tick: (localPath, remotePath, error) => {
        if (error) {
          failed.push(localPath)
          console.log(`failed: ${ localPath }`)
        } else {
          succeeded.push(localPath)
          console.log(`succeeded: ${ localPath }`)
        }
      }
    }).then(status => {
      if (!status)
        throw new Error(`Failed to transfer directory: ${ failed.join(', ') }`)
    })
  }).then(() => {
    return ssh.execCommand(`for n in $(find "${ releasesDir }" -type d -maxdepth 1 -mindepth 1 | sort | head -n -5); do rm -rf "$n"; done`)
  }).then(() => {
    return ssh.exec('ln', ['-snf', currentReleaseDir, currentDir])
  }).then(() => {
    ssh.dispose()
    console.log('done')
  }).catch(error => {
    ssh.dispose()
    throw error
  })
}

build().then(() => deploy())
  .catch(error => console.error(error))