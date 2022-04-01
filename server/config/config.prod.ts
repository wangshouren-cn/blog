import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ["http://121.4.95.151","http://121.4.95.151:9000"], //[]中放放出的白名单，*代表所有
  };
  return config;
};
