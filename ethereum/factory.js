import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xcEF1c3d7859cB7E5593E5fd022731c6ede849375'
);


export default instance;

// 0xB07Ff2bB7a4905FCCB65305F8F877fE5F0b44d8b