
module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  const cmdOptions = { maxBuffer: 100 * 1024 * 1024 };

  shipit.initConfig({
    default: {
      workspace: '/tmp/node-boilerplate',
      deployTo: '/home/godong/node-boilerplate',
      repositoryUrl: 'https://github.com/godong9/node-boilerplate.git',
      ignores: ['.git', 'node_modules'],
      rsync: ['--del'],
      keepReleases: 5,
      shallowClone: true
    },
    godong: {
      servers: 'godong@godong9.com',
      branch: 'master'
    }
  });

  shipit.task('env', function () {
    let buildCommand = [
      'env'
    ];

    return shipit.remote(makeCommandStr(buildCommand), cmdOptions);
  });

  shipit.task('pwd', function () {
    return shipit.remote('pwd');
  });

  shipit.blTask('build', function () {
    let buildCommand = [
      'cd ' + shipit.config.deployTo + '/current',
      // package 설치
      'npm install',
      // package 빌드
      'gulp build'
    ];

    return shipit.remote(makeCommandStr(buildCommand), cmdOptions);
  });

  shipit.blTask('start', function () {
    let buildCommand = [
      'cd ' + shipit.config.deployTo + '/current',
      'NODE_ENV="production" pm2 startOrRestart --env production process.json'
    ];

    return shipit.remote(makeCommandStr(buildCommand), cmdOptions);
  });

  shipit.blTask('deploy-server', ['deploy', 'build', 'start'], function() {

  });

  /**
   * Array를 remote command용 문자열로 변경 한다.
   *
   * @param {Array} cmds bash command array
   * @returns {string} "cmd[0] && cmd[1] && cmd[2]" 형식의 stirng
   */
  function makeCommandStr(cmds){
    let cmdStr = "";
    let i;
    for (i = 0; i < cmds.length-1; i++) {
      let cmd = cmds[i];
      cmdStr += cmd + " && ";
    }
    cmdStr += cmds[cmds.length-1];
    return cmdStr;
  }
};