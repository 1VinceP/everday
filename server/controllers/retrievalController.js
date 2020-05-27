module.exports = (req, res) => {
   const { dataset } = req.params;
   const { search, id } = req.query;

   let dataList;
   if (dataset === 'ships') {
      dataList = require('../data/ships.json');
   } else if (dataset === 'materials') {
      dataList = require('../data/materials.json');
   } else {
      res.sendStatus(400);
      return;
   }

   if (id) {
      const index = dataList.findIndex(item => item.id == id);
      if (index >= 0) dataList = dataList[index];
      else dataList = [];
   } else if (search) {
      dataList = dataList.filter(item => item.name.includes(search));
   }

   res.status(200).send(dataList);
};