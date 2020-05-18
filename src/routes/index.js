const { Router } = require('express');
const router = Router();

router.get('/', (req, res) =>{
    const data = {
      'name':'Alex',
      'website': 'Alex.com'
    };
    res.json(data);
});

module.exports = router;